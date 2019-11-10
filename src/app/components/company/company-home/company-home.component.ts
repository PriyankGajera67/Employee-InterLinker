import { Component, OnInit } from '@angular/core';
import { CompanyService, UserService } from 'src/app/_services';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss']
})
export class CompanyHomeComponent implements OnInit {

  constructor(private companyService : CompanyService,private userService:UserService) { }
  currentUserId:"";
  verificationRequests=[];
  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.companyService.getVerificationRequest(this.currentUserId).subscribe(res =>{
      this.setVerificationRequest(res);
    });
  }

  setVerificationRequest(res){
    console.log("fasdfas",res);
    let verificationRequestList = []
    res.data.forEach(element => {
      verificationRequestList.push(element);
    });
    this.verificationRequests = verificationRequestList;
  }

  onVerifyUser(email){
    this.userService.verifyCompany(email).subscribe(data =>{
      this.companyService.getVerificationRequest(this.currentUserId).subscribe(res =>{
        this.setVerificationRequest(res);
      });
    })
  }

}
