import { Component, OnInit, ViewChild } from '@angular/core';
import { ConnectionsService, CompanyService } from 'src/app/_services';
import { MatTableDataSource, MatPaginator } from '@angular/material';

export interface EmployeeElement {
  avatar: string;
  name: string;
  position: string;
  view:string;
  action: string;
  bio:string;
}
@Component({
  selector: 'app-company-employee-list',
  templateUrl: './company-employee-list.component.html',
  styleUrls: ['./company-employee-list.component.scss']
})
export class CompanyEmployeeListComponent implements OnInit {

  employeeList;
  currentUserId;
  displayedColumns: string[] = ["avatar", "name", "position","view","action"];
  dataSource:any;
  constructor(private companyService: CompanyService ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.companyService.getEmployees(this.currentUserId).subscribe(res =>{
      this.setEmployee(res);
    })
  }


  setEmployee(res){
    this.employeeList = [];
    res.data.forEach(element => {
      this.employeeList.push({
        avatar: element.avatar,
        name: element.name,
        position: element.position,
        view:element._id,
        action: element._id,
        bio:element.bio,
      });
    });
    console.log('fasdfasd',this.employeeList);
    this.dataSource = new MatTableDataSource (this.employeeList);
    this.dataSource.paginator = this.paginator;  
  }

}
