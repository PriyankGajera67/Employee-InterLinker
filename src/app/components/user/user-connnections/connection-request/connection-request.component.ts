import { Component, OnInit } from '@angular/core';
import { ConnectionsService } from 'src/app/_services';

@Component({
  selector: 'app-connection-request',
  templateUrl: './connection-request.component.html',
  styleUrls: ['./connection-request.component.scss']
})
export class ConnectionRequestComponent implements OnInit {

  constructor(private connectionsService:ConnectionsService) { }
  myConnections:any;
  currentUserId:any;
  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.connectionsService.getMyConnectionRequests(this.currentUserId).subscribe(res =>{
      this.setConnections(res);
    })
  }

  setConnections(res){
    let connections = [];
    res.data.forEach(element => {
      connections.push(element);
    });
    this.myConnections = connections;
  }


  acceptRequest(id){
    this.connectionsService.acceptRequest(id).subscribe(res =>{
      this.connectionsService.getMyConnectionRequests(this.currentUserId).subscribe(res =>{
        this.setConnections(res);
      })
    })
  }

  removeRequest(id){
    this.connectionsService.removeConnection(id).subscribe(res =>{
      this.connectionsService.getMyConnectionRequests(this.currentUserId).subscribe(res =>{
        this.setConnections(res);
      })
    })
  }
}
