import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Stack} from '../../../../../core/entity/model/stack/stack.model';

/**
 * Display game evaluation fragment
 */
@Component({
  selector: 'app-game-evaluation-fragment',
  templateUrl: './game-evaluation-fragment.component.html',
  styleUrls: ['./game-evaluation-fragment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameEvaluationFragmentComponent {

  /** Stack */
  @Input() stack: Stack;
  /** Array of winning teams */
  @Input() winningTeams = [];
  /** Event emitter indicating menu items being clicked */
  @Output() menuItemEventEmitter = new EventEmitter<string>();

  //
  // Actions
  //

  /**
   * Handles click on menu items
   * @param menuItem menu item that has been clicked
   */
  onMenuItemClicked(menuItem: string) {
    this.menuItemEventEmitter.emit(menuItem);
  }
}
