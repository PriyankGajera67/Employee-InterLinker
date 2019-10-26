import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/_services';

export interface PeriodicElement {
  avatar: string;
  date: string;
  email: string;
  //fullTime: boolean;
  //gender: string;
  name: string;
  numbersOfEmployees: number;
  //partTime: boolean;
  verified: boolean;
  webSite: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  isLoading = false;
  totalCompanies = 0;
  totalUSers = 0;
  totalVerifiedUsers = 0;
  totalVerifiedCompanies = 0;

  displayedColumns: string[] = ["avatar", "date", "email", "name", "numbersOfEmployees", "webSite", "verified"];

  // displayedColumns: string[] = ["avatar",
  // "date", "email", "fullTime", "gender",
  // "name",
  // "numbersOfEmployees",
  // "partTime",
  // "verified",
  // "webSite"];
  public companyData: PeriodicElement[] = [
    {
      avatar: "",
      date: "",
      email: "",
      name: "",
      numbersOfEmployees: 0,
      verified: false,
      webSite: ""
    }
  ];
  dataSource = [];

  title = 'app';

  constructor(private http: HttpClient, private userService: UserService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.isLoading = true;
    this.userService.getAll().subscribe(data => {
      this.setDataCompany(data);
    })
    this.isLoading = false;
  }


  setDataCompany(data: any) {
    let dataVarCompanies = [];
    let dataVarUsers = [];
    this.totalVerifiedCompanies = 0;
    this.totalVerifiedUsers = 0;
    data.data.forEach(element => {
      if(element.role === "COMPANY"){
        if(element.verified){
          this.totalVerifiedCompanies += 1;
        }
        dataVarCompanies.push({
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
        dataVarUsers.push({
          avatar: element.avatar,
          date: element.date,
          email: element.email,
          fullTime: element.fullTime,
          gender: element.gender,
          name: element.name,
          numbersOfEmployees: element.numbersOfEmployees,
          partTime: element.partTime,
          verified: element.verified,
          webSite: element.webSite
        });
      }
    
    });
    this.totalCompanies = dataVarCompanies.length;
    this.totalUSers = dataVarUsers.length;
    this.dataSource = dataVarCompanies;
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
