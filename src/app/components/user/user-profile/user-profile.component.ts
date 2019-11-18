import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/_services/company.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserService,private companyService:CompanyService,private formBuilder: FormBuilder) { }
  isCompany = false;
  currentUser : any;
  userDetailForm: FormGroup;
  companyDetailForm: FormGroup;
  submitted = false;
  inProgress = false;
  companies= [];
  ngOnInit() {
    this.inProgress = true;
    this.isCompany = JSON.parse(localStorage.getItem('currentUser')).role === 'COMPANY'?true:false;
    this.userService.getCurrentUser().subscribe(res =>{
      this.SET_USER_DATA(res);
    });
    this.companyService.getAllCompanies().subscribe(res =>{
      this.SET_COMPANIES_DATA(res);
    });
    
    this.userDetailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      dob:['', Validators.required],
      name:['', Validators.required],
      address:[''],
      postalCode:[''],
      country:[''],
      city:[''],
      joiningDate:[''],
      bio:[''],
      gender:[''],
      employer:[''],
      contactNumber:['', Validators.required],
      fullTime:[''],
      position:['']
  });

    this.companyDetailForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        dob:['', Validators.required],
        name:['', Validators.required],
        address:[''],
        postalCode:[''],
        country:[''],
        city:[''],
        webSite:[''],
        bio:[''],
        contactNumber:['', Validators.required],
    });
  }

    // convenience getter for easy access to form fields
    get f() { return this.userDetailForm.controls; }
    get c() { return this.companyDetailForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.inProgress = true;
  
        // stop here if form is invalid
        if(this.isCompany){
          if (this.companyDetailForm.invalid) {
            return;
          }
        } else {
          if (this.userDetailForm.invalid) {
            return;
          }
        }

  
        // display form values on success
        console.log(this.userDetailForm.value, null, 4);
        if(this.isCompany){
          this.userService.updateUser(this.companyDetailForm.value).subscribe(res =>{
            this.userService.getCurrentUser().subscribe(res =>{
              this.SET_USER_DATA(res);
            });
          });
        } else {
          this.userService.updateUser(this.userDetailForm.value).subscribe(res =>{
            this.userService.getCurrentUser().subscribe(res =>{
              this.SET_USER_DATA(res);
            });
          });
        }
      
    }
  
    onReset() {
        this.submitted = false;
        this.userDetailForm.reset();
    }

    SET_USER_DATA(res){
      console.log(res);
      this.currentUser = res.data;
      if(this.isCompany){
        this.companyDetailForm.get('name').setValue(res.data.name);
        this.companyDetailForm.get('email').setValue(res.data.email);
        if(res.data.dob != undefined){
          this.companyDetailForm.get('dob').setValue(res.data.dob);
        }
        if(res.data.address != undefined){
          this.companyDetailForm.get('address').setValue(res.data.address);
        }
        if(res.data.postalCode != undefined){
          this.companyDetailForm.get('postalCode').setValue(res.data.postalCode);
        }
        if(res.data.country != undefined){
          this.companyDetailForm.get('country').setValue(res.data.country);
        }
        if(res.data.city != undefined){
          this.companyDetailForm.get('city').setValue(res.data.city);
        }
        if(res.data.contactNumber != undefined){
          this.companyDetailForm.get('contactNumber').setValue(res.data.contactNumber);
        }
        if(res.data.bio != undefined){
          this.companyDetailForm.get('bio').setValue(res.data.bio);
        }
        if(res.data.webSite != undefined){
          this.companyDetailForm.get('webSite').setValue(res.data.webSite);
        }
      } else {
        this.userDetailForm.get('name').setValue(res.data.name);
        this.userDetailForm.get('email').setValue(res.data.email);
        if(res.data.dob != undefined){
          this.userDetailForm.get('dob').setValue(res.data.dob);
        }
        if(res.data.address != undefined){
          this.userDetailForm.get('address').setValue(res.data.address);
        }
        if(res.data.postalCode != undefined){
          this.userDetailForm.get('postalCode').setValue(res.data.postalCode);
        }
        if(res.data.country != undefined){
          this.userDetailForm.get('country').setValue(res.data.country);
        }
        if(res.data.city != undefined){
          this.userDetailForm.get('city').setValue(res.data.city);
        }
        if(res.data.joiningDate != undefined){
          this.userDetailForm.get('joiningDate').setValue(res.data.joiningDate);
        }
        if(res.data.gender != undefined){
          this.userDetailForm.get('gender').setValue(res.data.gender);
        }
        if(res.data.bio != undefined){
          this.companyDetailForm.get('bio').setValue(res.data.bio);
        }
        if(res.data.employer != undefined){
          this.userDetailForm.get('employer').setValue(res.data.employer);
        }
        if(res.data.contactNumber != undefined){
          this.userDetailForm.get('contactNumber').setValue(res.data.contactNumber);
        }
        if(res.data.fullTime != undefined){
          this.userDetailForm.get('fullTime').setValue(res.data.fullTime);
        }
        if(res.data.position != undefined){
          this.userDetailForm.get('position').setValue(res.data.position);
        }
      }

      this.inProgress = false;
    }

    SET_COMPANIES_DATA(res){
      let companiesList = [];
      res.data.forEach(element => {
        companiesList.push({"name":element.name,"value":element._id});
      });

      this.companies = companiesList;
      console.log(this.companies)
    }


}
