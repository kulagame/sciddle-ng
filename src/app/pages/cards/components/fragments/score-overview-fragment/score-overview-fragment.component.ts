import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Stack} from '../../../../../core/entity/model/stack/stack.model';

/**
 * Display score overview fragment
 */
@Component({
  selector: 'app-score-overview-fragment',
  templateUrl: './score-overview-fragment.component.html',
  styleUrls: ['./score-overview-fragment.component.scss'],
})
export class ScoreOverviewFragmentComponent {

  /** Stack */
  @Input() public stack: Stack;
  /** Event emitter score overview click */
  @Output() public scoreOverviewClickedEmitter = new EventEmitter<any>();

  //
  // Actions
  //

  /**
   * Handles click on score overview
   */
  public onDisplayScoreOverviewClicked() {
    this.scoreOverviewClickedEmitter.emit();
  }
}
