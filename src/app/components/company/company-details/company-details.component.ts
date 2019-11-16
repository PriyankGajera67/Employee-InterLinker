import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { CompanyService, ConnectionsService } from 'src/app/_services';


export interface ConnectionElement {
  avatar: string;
  name: string;
  position: string;
  action: string;
}

const ELEMENT_DATA: ConnectionElement[] = [
  {avatar: "f", name: 'Hydrogen', position: "fasdfa", action: 'H'}
];

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,private companyService: CompanyService,private connectionsService:ConnectionsService) { }
  companyId:any;
  currentCompany: any;
  currentUserId:any;
  
  employeeList:ConnectionElement[] = [];

  displayedColumns: string[] = ["avatar", "name", "position","action"];
  dataSource:any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.route.params.subscribe(param =>{
      this.companyId = param.id;
    });
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.companyService.getCompanyById(this.companyId).subscribe(res =>{
      this.currentCompany = res.data;
    })
    this.companyService.getVerifiedUsers(this.companyId).subscribe(res => {
      this.setEmployeeList(res);
    });
    console.log("Company Id:", this.companyId);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setEmployeeList(res) {
    this.employeeList = [];
    res.data.forEach(element => {
      this.employeeList.push({
        avatar: element.avatar,
        name: element.name,
        position: element.position,
        action: element._id,
      });
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
    this.connectionsService.makeConnection(this.currentUserId,requestConnection.action,requestConnection.name,this.companyId,requestConnection.position).subscribe(res =>{
      console.log(
        "res",res
      );
    });
  }

}
