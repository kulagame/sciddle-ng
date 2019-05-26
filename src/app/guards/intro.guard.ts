import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {GamesService} from '../core/entity/services/game/games.service';
import {STACK_PERSISTENCE_POUCHDB} from '../core/entity/entity.module';
import {StacksPersistenceService} from '../core/entity/services/stack/persistence/stacks-persistence.interface';
import {Stack} from '../core/entity/model/stack/stack.model';

/**
 * Checks if it is necessary to show game page
 */
@Injectable({
  providedIn: 'root',
})
export class GameGuard implements CanActivate {

  /**
   * Constructor
   * @param gamesService games service
   * @param stacksPersistenceService stacks persistence service
   * @param router router
   */
  constructor(private gamesService: GamesService,
              @Inject(STACK_PERSISTENCE_POUCHDB) private stacksPersistenceService: StacksPersistenceService,
              private router: Router) {
  }

  /**
   * Checks if the guarded route can be activated
   * @param next activated toute
   * @param state router state
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {

      this.stacksPersistenceService.stackSubject.subscribe((value) => {
        if (value != null) {
          const stack = value as Stack;

          if (this.gamesService.existsGame(stack)) {
            this.router.navigate([`/cards/${stack.id}`]).then(() => {
            });
            resolve(false);
          } else {
            resolve(true);
          }
        }
      });

      this.stacksPersistenceService.findStackByID('0');
    });
  }
}
