import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService, UserService, ConnectionsService } from 'src/app/_services';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface ConnectionElement {
  avatar: string;
  name: string;
  position: string;
  email:string;
  action: string;
}

const ELEMENT_DATA: ConnectionElement[] = [
  {avatar: "f", name: 'Hydrogen',email:"", position: "fasdfa", action: 'H'}
];

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
  employeeList = [];
  comments: string;
  count: number;
  verificationRequests:ConnectionElement[] = [];

  displayedColumns: string[] = ["avatar", "name","email", "position","action"];
  dataSource:any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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

  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  setVerificationRequest(res) {
    this.verificationRequests = [];
    res.data.forEach(element => {
      this.verificationRequests.push({
        avatar: element.avatar,
        name: element.name,
        email:element.email,
        position: element.position,
        action: element._id,
      });
    });

    this.dataSource = new MatTableDataSource (this.verificationRequests);
    this.dataSource.paginator = this.paginator;
  }

  setEmployeeList(res) {
    let employees = []
    res.data.forEach(element => {
      employees.push(element);
    });
    this.employeeList = employees;
  }

  // addConnection(id:string){
  //   let requestConnection:any = [];
  //   this.employeeList.find(e =>{
  //     if(e._id == id){
  //       requestConnection = e;
  //     }
  //   })
  //   this.connectionsService.makeConnection(this.currentUserId,requestConnection._id,requestConnection.name,requestConnection.employee,requestConnection.position);
  // }
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
