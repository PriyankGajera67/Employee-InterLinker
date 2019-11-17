import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, CompanyService, ConnectionsService } from 'src/app/_services';

@Component({
  selector: 'app-connection-profile',
  templateUrl: './connection-profile.component.html',
  styleUrls: ['./connection-profile.component.scss']
})
export class ConnectionProfileComponent implements OnInit {
  userId:any;
  connectionUser:any;
  connectionEmployer:any;
  requestId:any;
  constructor(  private router: Router,private route: ActivatedRoute,private userService:UserService,private companyService:CompanyService,private connectionsService: ConnectionsService) { }

  ngOnInit() {
    this.route.params.subscribe(param =>{
      this.userId = param.id;
      if(param.requestId){
        this.requestId = param.requestId;
      }
    });
    this.userService.getUser(this.userId).subscribe(res =>{
      this.connectionUser = res.data;
      this.companyService.getCompanyById(this.connectionUser.employer).subscribe(res =>{
        this.connectionEmployer = res.data;
      })
    });

  }


  
  acceptRequest(id){
    this.connectionsService.acceptRequest(id).subscribe(res =>{
      this.router.navigate(['/']);
    })
  }

}
