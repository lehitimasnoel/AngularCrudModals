import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  userDetails: any;
  userId: string = '';
  constructor(
    private userService: UserService,
    private route: ActivatedRoute

  ){}

  ngOnInit(): void {
    this.route.params.subscribe(
      data => {this.userId = data.id;}
    );

    this.userService.viewUserList(this.userId).subscribe(
      data => {this.userDetails = data;}
    );
  }

}
