import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html', styleUrls: ['./app.component.scss'] })
export class AppComponent implements OnInit  {
    currentUser: User;
    isRegular=false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit(){
        if(JSON.parse(localStorage.getItem("currentUser")).role === 'REGULAR'){
            this.isRegular = true;
        }
    }
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}