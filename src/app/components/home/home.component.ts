import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private companyService:CompanyService) { }
  companyList:any = [];
  ngOnInit() {
    this.companyService.getAllCompanies().subscribe(res =>{
      this.setCompanies(res);
    })
  }

  setCompanies(res){
    let companies = []
    res.data.forEach(element => {
      companies.push(element);
    });
    this.companyList = companies;
    console.log("fasdfasd",this.companyList);
  }

}
