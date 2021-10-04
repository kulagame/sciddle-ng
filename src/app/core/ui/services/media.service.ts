import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Media} from '../model/media.enum';

/**
 * Handles screen size and breakpoints
 */
@Injectable({
  providedIn: 'root',
})
export class MediaService {

  /** Current medium */
  public media: Media;
  /** Subject publishing medium */
  public mediaSubject = new Subject<Media>();

  /**
   * Constructor
   * @param breakpointObserver breakpoint observer
   */
  constructor(public breakpointObserver: BreakpointObserver) {
    this.initializeSize();
    this.initializeBreakpoints();
  }

  /**
   * Initializes size
   */
  private initializeSize() {
    const innerWidth = window.innerWidth;

    if (innerWidth < 960) {
      this.media = Media.SMALL;
      this.notify();
    } else if (innerWidth >= 960 && innerWidth < 1280) {
      this.media = Media.MEDIUM;
      this.notify();
    } else if (innerWidth > 1280) {
      this.media = Media.LARGE;
      this.notify();
    }
  }

  /**
   * Initializes breakpoints
   */
  private initializeBreakpoints() {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.media = Media.SMALL;
          this.notify();
        }
      });
    this.breakpointObserver
      .observe([Breakpoints.Medium])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.media = Media.MEDIUM;
          this.notify();
        }
      });
    this.breakpointObserver
      .observe([Breakpoints.Large])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.media = Media.LARGE;
          this.notify();
        }
      });
  }

  //
  // Notification
  //

  /**
   * Informs subscribers that something has changed
   */
  private notify() {
    this.mediaSubject.next(this.media);
  }
}
