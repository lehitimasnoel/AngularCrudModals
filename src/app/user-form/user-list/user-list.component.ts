import { Component, OnInit } from '@angular/core';

import { UserModel } from '../user-model';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.services';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;
  userId: string = '';
  closeResult: string = '';
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private confirmationDialogService: ConfirmationDialogService

  ) {}

  ngOnInit(): void {
    this.getUserList();
    this.route.params.subscribe(
      data => {this.userId = data.id;}
    );
    this.userService.userListChanged.subscribe(
      (list: UserModel[]) => {
        this.users = list;
      }
    )
  }

  getUserList() {
    this.userService.getUsersLists().subscribe(
      data => {
        console.log(data);
        this.userService.getSubUserList(data);
      }
    );
  }


  editUserList(userObj:UserModel) {
    this.userService.userListSelected.emit(userObj);
  }

  deleteUserList(id:number) {
    console.log(id);
    this.userService.deleteUserList(id).subscribe(
      (id1: number) => {
        console.log(id);
        alert('Successfully Deleted User with id '+id)
        this.userService.deleteList(id);
      }
    )
  }

  public openConfirmationDialog(id:number) {
    this.confirmationDialogService.confirm('Confirmation', 'Do you really want to delete this user?')
    .then(
      (confirmed) =>
      {
        if(confirmed){
          this.deleteUserList(id);
        }
        console.log('User confirmed:', confirmed);
      }
    )
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

}
