import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ApiServices1 {

  constructor(private http: HttpClient) {}

  fetchUsers() {
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe(users => {
     return users;
   });

  }
}
