import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, CompanyService } from 'src/app/_services';

@Component({
  selector: 'app-connection-profile',
  templateUrl: './connection-profile.component.html',
  styleUrls: ['./connection-profile.component.scss']
})
export class ConnectionProfileComponent implements OnInit {
  userId:any;
  connectionUser:any;
  connectionEmployer:any;
  isRequests:false;
  constructor(private route: ActivatedRoute,private userService:UserService,private companyService:CompanyService) { }

  ngOnInit() {
    this.route.params.subscribe(param =>{
      this.userId = param.id;
      this.isRequests = param.isRequests;
    });
    this.userService.getUser(this.userId).subscribe(res =>{
      this.connectionUser = res.data;
      this.companyService.getCompanyById(this.connectionUser.employer).subscribe(res =>{
        this.connectionEmployer = res.data;
      })
    });

  }

}
