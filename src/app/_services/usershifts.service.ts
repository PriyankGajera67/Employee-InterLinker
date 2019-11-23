import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsershiftsService {
    constructor(private http: HttpClient) { }
    addShift(userId: string,data: string) {
        console.log("inside");
        return this.http.post<any>(`${environment.apiUrl}/usershifts/addShift`, { userId,data});
    }


    getUserShift(userId: string) {
        console.log("inside");
        return this.http.post<any>(`${environment.apiUrl}/usershifts/getShift`, { userId});
    }

    removeConnection(userId:string,start: string,end:string) {
        console.log("inside");
        return this.http.post<any>(`${environment.apiUrl}/usershifts/removeShift`, { userId,start,end});
    }

    

    
}