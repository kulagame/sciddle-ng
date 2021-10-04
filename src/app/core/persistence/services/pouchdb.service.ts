import {EventEmitter, Injectable, isDevMode} from '@angular/core';
import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
import PouchdbUpsert from 'pouchdb-upsert';
import {environment} from '../../../../environments/environment';
import {LogService} from '../../log/services/log.service';

/**
 * Handles pouchdb operations for entity database
 */
@Injectable({
  providedIn: 'root',
})
export class PouchDBService {

  /** Indicates of PouchDB connection is instantiated */
  private readonly isInstantiated: boolean;
  /** Represents database */
  private database: any;
  /** Listener for database change events */
  private listener: EventEmitter<any> = new EventEmitter();

  /**
   * Constructor
   */
  public constructor() {
    PouchDB.plugin(PouchdbFind);
    PouchDB.plugin(PouchdbUpsert);

    if (!this.isInstantiated) {
      this.database = new PouchDB(environment.DATABASE_ENTITIES);
      this.isInstantiated = true;
    }
  }

  /**
   * Finds documents by a given index and options
   * @param index index used to index documents
   * @param options options to query documents by
   * @returns array of documents
   */
  public find(index: any, options) {
    return this.database.createIndex({
      index,
    }).then(() => {
      return this.database.find(options);
    });
  }

  /**
   * Returns all documents from the DATABASE_ENTITIES
   * @returns array of documents
   */
  public fetch() {
    return this.database.allDocs({include_docs: true});
  }

  /**
   * Compacts the DATABASE_ENTITIES
   */
  public compact() {
    this.database.compact();
  }

  /**
   * Returns a document by a given ID
   * @param id ID of a document to be found
   */
  public get(id: string) {
    return this.database.get(id);
  }

  /**
   * Inserts a document into the DATABASE_ENTITIES
   * @param id ID of the document to be put
   * @param document document to be put
   */
  public put(id: string, document: any) {
    document._id = id;

    return this.database.put(document);
  }

  /**
   * Updates a given document and creates it if it does not exist
   * @param id ID of the document to be updated or created
   * @param document document to be updated or created
   */
  public upsert(id: string, document: any) {
    document._id = id;

    return this.database.upsert(id, () => {
      return document;
    });
  }

  /**
   * Updates an array of documents
   * @param documents documents
   */
  public bulk(documents: any[]) {
    documents.forEach((d) => {
      d._id = d.id;
    });

    return this.database.bulkDocs(documents);
  }

  /**
   * Removes a document by a given ID
   * @param id ID of the document to be removed
   * @param document document to be removed
   */
  public remove(id: string, document: any) {
    return this.database.remove(document._id, document._rev);
  }

  /**
   * Deletes all documents from the DATABASE_ENTITIES
   */
  public clear() {
    this.fetch().then((result) => {
      result.rows.forEach((r) => {
        this.database.remove(r.doc);
      });
    }, (error) => {
      if (isDevMode()) {
        LogService.fatal(error);
      }
    });
  }

  /**
   * Synchronizes local DATABASE_ENTITIES with a remote DATABASE_ENTITIES
   * @param remote remote string
   */
  public sync(remote: string) {
    const remoteDatabase = new PouchDB(remote);
    this.database.sync(remoteDatabase, {
      live: true,
    }).on('change', (change) => {
      this.listener.emit(change);
    }).on('error', (error) => {
      LogService.fatal(JSON.stringify(error));
    });
  }

  /**
   * Synchronizes local DATABASE_ENTITIES with a remote DATABASE_ENTITIES
   * @param remote remote string
   * @param username username used for authentication
   * @param password password used for authentication
   */
  public syncWithUser(remote: string, username: string, password: string) {
    const remoteDatabase = new PouchDB(remote);
    this.database.sync(remoteDatabase, {
      live: true,
      auth: {
        username,
        password,
      },
    }).on('change', (change) => {
      this.listener.emit(change);
    }).on('error', (error) => {
      LogService.fatal(JSON.stringify(error));
    });
  }

  /**
   * Returns this services change listener
   */
  public getChangeListener() {
    return this.listener;
  }
}
