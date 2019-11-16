import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConnectionsService {
    constructor(private http: HttpClient) { }
    makeConnection(userId: string,connectionId: string, name: string, employer: string,position:string) {
        let role = 'REGULAR';
        console.log("inside");
        return this.http.post<any>(`${environment.apiUrl}/connections/addConnection`, { userId,connectionId,name,employer,position});
    }


    getMyConnection(userId: string) {
        console.log("inside");
        return this.http.post<any>(`${environment.apiUrl}/connections/getMyConnnections`, { userId});
    }

    
}