import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserModel } from '../user-form/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userListSelected = new EventEmitter<UserModel>();
  userListChanged = new EventEmitter<UserModel[]>();
  url: string = "https://jsonplaceholder.typicode.com/";
  private subUserLists: UserModel[] = []
  constructor(private httpClient: HttpClient) {}

  // Load http all list
  getUsersLists(){
    return this.httpClient.get<UserModel[]>(this.url + 'users');
  }

  // Sub List from http to local array
  getSubUserList(subUserList:UserModel[]) {
    this.subUserLists = subUserList;
    this.userListChanged.emit(this.subUserLists);
  }

  //Get Userlist by User ID return index
  getUserListByUserId(userId:number) {
    let lt_users = [];
    let indexID: number;
    if(this.subUserLists.length > 0){
      lt_users = this.subUserLists;
      for (const [index, val] of lt_users.entries()) {
        if(val.id == userId){
          indexID = index;
        }
      }
   }
    return indexID;
  }

  // Add/Create http
  addUserList(userObj: any) {
    return this.httpClient.post(this.url + 'users', userObj);
  }

  //Add UI
  addList(subUserList:UserModel) {
    this.subUserLists.push(subUserList);
    for (const [index, value] of this.subUserLists.entries()) {
      value.id = index+1;
    }
    console.log(this.subUserLists);
    this.userListChanged.emit(this.subUserLists.slice());
  }

  //Update http
  updateUserList(id: any, userObj: any) {
    return this.httpClient.put(this.url + 'users/'+id, userObj);
  }

  //Update UI
  updateList(index: number, subUserList: UserModel) {
    this.subUserLists[this.getUserListByUserId(index)] = subUserList;
    this.userListChanged.emit(this.subUserLists.slice());
  }

  viewUserList(id: any) {
    return this.httpClient.get(this.url + 'users/' + id);
  }

  //Delete http
  deleteUserList(id: number) {
    return this.httpClient.delete(this.url + 'users/' + id);
  }

  //Delete UI
  deleteList(id: number) {
    this.subUserLists.splice(this.getUserListByUserId(id),1);
    this.userListChanged.emit(this.subUserLists.slice());
  }

  setUserValue(id: string) {

  }

  getSubUserLists(userObjLists: any) {
    //const subUserlistadded = userObjLists;
    //return this.subUserLists.push(subUserlistadded);
  }
}
