import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.post<any[]>(`${environment.apiUrl}/users/all`,{});
    }
    verifyCompany(email:string){
        return this.http.post<any>(`${environment.apiUrl}/users/verify`, { email });
    }
    registerUser(name: string,email: string, password: string, confirmPassword: string) {
        let role = 'REGULAR';
        return this.http.post<any>(`${environment.apiUrl}/users/register`, { name,email,password,confirmPassword,role });
    }
    registerCompany(name: string,email: string, password: string, confirmPassword: string) {
        let role = 'COMPANY';
        return this.http.post<any>(`${environment.apiUrl}/users/register`, { name,email,password,confirmPassword,role });
    }

}