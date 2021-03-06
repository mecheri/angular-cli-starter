import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { User } from './../../models/user';

import { NotifierService } from 'angular-notifier';
import { UserService } from './../../services/user.service';
import { ResourcesService } from '../../../../../core/services/resources.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {
  rsc: any;

  @Input('data') user: User;
  @Input() display: boolean;
  @Output() onAction = new EventEmitter<boolean>();

  /**
   *Creates an instance of UserDeleteComponent.
   * @param {UserService} userService
   * @param {ResourcesService} rscService
   * @param {NotifierService} notifier
   * @memberof UserDeleteComponent
   */
  constructor(
    private userService: UserService,
    private rscService: ResourcesService,
    private notifier: NotifierService
  ) { }

  ngOnInit() {
    this.loadResources();
  }

  loadResources() {
    this.rsc = this.rscService.rsc.pages.register;
  }

  cancel() {
    this.onAction.emit(false);
  }

  delete() {
    this.userService.deleteUser(this.user.id)
      .subscribe(
        () => {
          this.onAction.emit(true);
          this.notifier.notify('success', 'Operation successfully done !');
        }
      );
  }
}
