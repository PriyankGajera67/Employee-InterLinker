import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserService) { }
  isCompany: false;
  currentUser : any;
  ngOnInit() {
    this.userService.getCurrentUser().subscribe(res =>{
      this.currentUser = res;
    })
  }

}
