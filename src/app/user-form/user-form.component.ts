import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.services';
import { UserService } from '../services/user.service';
import { UserModel } from './user-model';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  usersForm: FormGroup;
  editMode = false;
  editedItem: any;
  subUserLists: UserModel[] = [];
  constructor(
    private userService: UserService,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  ngOnInit(){
    this.usersForm= new FormGroup({
      'name': new FormControl(null,Validators.required),
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'phone': new FormControl(null,Validators.required),
    });
    this.onEditingUserList();
  }

  onEditingUserList() {
    this.userService.userListSelected.subscribe(
      (userobj: UserModel) => {
        this.editMode = true;
        this.editedItem = userobj;
        this.usersForm.setValue({
          'name': this.editedItem.name,
          'email': this.editedItem.email,
          'phone': this.editedItem.phone,
        })
      }
    )
  }

  OnSubmit() {
    if(this.usersForm.valid){
      if(!this.editMode){
        this.userService.addUserList(this.usersForm.value).subscribe(
          (response: UserModel) => {
            console.log(response);
            alert('Successfully added');
            this.userService.addList(response);
            this.onClear();
          },
          err => {console.log(err);}
        )
      }else{
        this.userService.updateUserList(this.editedItem.id,this.usersForm.value).subscribe(
          (response: UserModel) => {
            console.log(response);
            alert('Successfully Updated')
            this.userService.updateList(response.id,response);
            this.onClear();
          },
          err => {
            console.log(err);
          }
        )
      }
    }
  }
  onClear() {
    this.usersForm.reset();
    this.editMode = false;
  }

  public openConfirmationDialog() {
    let message = "";
    if(this.editMode){
      message = "Do you really want to update changes?"
    }else{
      message = "Do you really want to save changes?"
    }

    this.confirmationDialogService.confirm('Confirmation', message)
    .then(
      (confirmed) =>
      {
        if(confirmed){
          this.OnSubmit();
        }
        console.log('User confirmed:', confirmed);
      }
    )
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

}
