import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { CompanyService, ConnectionsService, UserService } from 'src/app/_services';


export interface ConnectionElement {
  avatar: string;
  name: string;
  position: string;
  action: string;
  bio:string;
}

const ELEMENT_DATA: ConnectionElement[] = [
  {avatar: "f", name: 'Hydrogen', position: "fasdfa", action: 'H',bio:''}
];

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,private companyService: CompanyService,private connectionsService:ConnectionsService,private userService:UserService) { }
  companyId:any;
  currentCompany: any;
  currentUserId:any;
  currentUser:any;
  employeeList:ConnectionElement[] = [];
  myConnection:any;

  displayedColumns: string[] = ["avatar", "name", "position","action"];
  dataSource:any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.route.params.subscribe(param =>{
      this.companyId = param.id;
    });
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.userService.getUser(this.currentUserId).subscribe(res =>{
      this.currentUser = res.data;
    });
    this.companyService.getCompanyById(this.companyId).subscribe(res =>{
      this.currentCompany = res.data;
    })
    
    this.connectionsService.getMyConnection(this.currentUserId).subscribe(res =>{
      this.myConnection = res;
      this.companyService.getVerifiedUsers(this.companyId).subscribe(res => {
        this.setEmployeeList(res);
      });
    })
    
    console.log("Company Id:", this.companyId);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setEmployeeList(res) {
    this.employeeList = [];
    res.data.forEach(element => {
      if(this.myConnection.data.length>0){
        this.myConnection.data.forEach(c => {
          if(c.connectionId != element._id && this.currentUserId != element._id){
            this.employeeList.push({
              avatar: element.avatar,
              name: element.name,
              position: element.position,
              action: element._id,
              bio:element.bio,
            });
          }
        });
      } else {
        if(this.currentUserId != element._id){
          this.employeeList.push({
            avatar: element.avatar,
            name: element.name,
            position: element.position,
            action: element._id,
            bio:element.bio,
          });
        }
      }
  
    });
    this.dataSource = new MatTableDataSource (this.employeeList);
    this.dataSource.paginator = this.paginator;
    console.log("fasdfasdfa",this.dataSource);
  }

  addConnection(id:string){
    console.log("fadsfas",id);
    let requestConnection:any = [];
    this.employeeList.find(e =>{
      if(e.action == id){
        requestConnection = e;
      }
    })
    this.connectionsService.makeConnection(this.currentUserId,requestConnection.action,requestConnection.name,this.companyId,requestConnection.position,requestConnection.bio,this.currentUser.name,this.currentUser.employer,this.currentUser.position,this.currentUser.bio).subscribe(res =>{
      this.connectionsService.getMyConnection(this.currentUserId).subscribe(res =>{
        this.myConnection = res;
        this.companyService.getVerifiedUsers(this.companyId).subscribe(res => {
          this.setEmployeeList(res);
        });
      })
    });
  }

}
