import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class CompanyService {
    constructor(private http: HttpClient) { }
    getAllCompanies(){
        return this.http.post<any>(`${environment.apiUrl}/users/allCompany`,{});
    }

    getCompanyById(id:string){
        return this.http.post<any>(`${environment.apiUrl}/users/getCompanyById`,{id});
    }

    getVerificationRequest(employer:string){
        return this.http.post<any>(`${environment.apiUrl}/users/getVerificationRequests`,{employer});
    }

    getEmployees(employer:string){
        return this.http.post<any>(`${environment.apiUrl}/users/getEmployees`,{employer});
    }
    
    getVerifiedUsers(employer:string){
        return this.http.post<any>(`${environment.apiUrl}/users/getVerifiedUsers`,{employer});
    }

}