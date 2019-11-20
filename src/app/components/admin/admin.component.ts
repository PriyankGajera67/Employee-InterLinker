import { Component, OnInit, ChangeDetectorRef,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/_services';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  isLoading = false;
  isCompanyView = true;
  totalCompanies = 0;
  totalUSers = 0;
  totalVerifiedUsers = 0;
  totalVerifiedCompanies = 0;
  dataVarCompanies = [];
  dataVarUsers = [];

  displayedColumns: string[] = ["avatar", "date", "email", "name", "numbersOfEmployees", "webSite", "verified"];

  displayedUserColumns: string[] = ["avatar", "date", "email", "name","gender", "Full-time/Part-time", "verified",];

  dataSource = [];
  dataSourceUsers = []

  title = 'app';

  constructor(private http: HttpClient, private userService: UserService, private ref: ChangeDetectorRef) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.isLoading = true;
    this.userService.getAll().subscribe(data => {
      this.setDataCompany(data);
    })
    this.isLoading = false;
    //this.dataSource.paginator = this.paginator;

  }


  applyFilter(filterValue: string) {
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setDataCompany(data: any) {
    this.dataVarCompanies = [];
    this.dataVarUsers = [];
    this.totalVerifiedCompanies = 0;
    this.totalVerifiedUsers = 0;
    data.data.forEach(element => {
      if(element.role === "COMPANY"){
        if(element.verified){
          this.totalVerifiedCompanies += 1;
        }
        this.dataVarCompanies.push({
          avatar: element.avatar,
          date: element.date,
          email: element.email,
          fullTime: element.fullTime,
          gender: element.gender,
          name: element.name,
          partTime: element.partTime,
          verified: element.verified,
          webSite: element.webSite
        });
      } else if(element.role === "REGULAR"){
        if(element.verified){
          this.totalVerifiedUsers += 1;
        }
        this.dataVarUsers.push({
          avatar: element.avatar,
          date: element.date,
          email: element.email,
          fullTime: element.fullTime,
          gender: element.gender,
          name: element.name,
          partTime: element.partTime,
          verified: element.verified,
        });
      }
    
    });
    this.totalCompanies =this. dataVarCompanies.length;
    this.totalUSers = this.dataVarUsers.length;
    this.dataSource = this.dataVarCompanies;
    this.dataSourceUsers = this.dataVarUsers;
    
  }

  onUserView(){
    this.isCompanyView=false;
  }

  onCompanyView(){
    this.isCompanyView=true;
  }

  onVerifyCompany(email){
    this.userService.verifyCompany(email).subscribe(data =>{
      this.userService.getAll().subscribe(data =>{
        this.setDataCompany(data);
      })
    })
  }

  onDeleteCompany(email){
    this.userService.deleteCompany(email).subscribe(data =>{
      this.userService.getAll().subscribe(data =>{
        this.setDataCompany(data);
      })
    })
  }
}
