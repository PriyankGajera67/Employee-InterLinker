import { Component, OnInit } from '@angular/core';
import { CompanyService, UserService, ConnectionsService } from 'src/app/_services';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss']
})
export class CompanyHomeComponent implements OnInit {

  constructor(private companyService: CompanyService, private connectionsService: ConnectionsService, private userService: UserService) { }
  currentUserId: "";
  role: string;
  currentUser: any;
  verificationRequests = [];
  employeeList = [];
  comments: string;
  count: number;
  ngOnInit() {
    this.count = 0;
    this.userService.getCurrentUser().subscribe(res => {
      console.log("fsafasdf", res);
      this.currentUser = res.data;
    });
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.role = JSON.parse(localStorage.getItem('currentUser')).role;
   // if (this.role === "COMPANY") {
      this.companyService.getVerificationRequest(this.currentUserId).subscribe(res => {
        this.setVerificationRequest(res);
      });
   // } else {
      this.companyService.getVerifiedUsers(this.currentUserId).subscribe(res => {
        this.setEmployeeList(res);
      });
   // }
  }

  setVerificationRequest(res) {
    let verificationRequestList = []
    res.data.forEach(element => {
      verificationRequestList.push(element);
    });
    this.verificationRequests = verificationRequestList;
  }

  setEmployeeList(res) {
    let employees = []
    res.data.forEach(element => {
      employees.push(element);
    });
    this.employeeList = employees;
  }

  addConnection(id:string){
    let requestConnection:any = [];
    this.employeeList.find(e =>{
      if(e._id == id){
        requestConnection = e;
      }
    })
    this.connectionsService.makeConnection(this.currentUserId,requestConnection._id,requestConnection.name,requestConnection.employee,requestConnection.position);
  }
  onVerifyUser(email) {
    this.userService.verifyCompany(email).subscribe(data => {
      this.companyService.getVerificationRequest(this.currentUserId).subscribe(res => {
        this.setVerificationRequest(res);
      });
    })
  }

  receiveComment($event) {
    this.comments = $event;
    this.count = this.comments.length;
    console.log(this.comments.length);
  }

  recieveCount($event) {
    this.comments = $event;
    this.count = this.comments.length;
  }

}
