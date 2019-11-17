import { Component, OnInit } from '@angular/core';
import { ConnectionsService } from 'src/app/_services';

@Component({
  selector: 'app-connection-approved-list',
  templateUrl: './connection-approved-list.component.html',
  styleUrls: ['./connection-approved-list.component.scss']
})
export class ConnectionApprovedListComponent implements OnInit {

  constructor(private connectionsService:ConnectionsService) { }
  myConnections:any;
  currentUserId:any;
  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.connectionsService.getMyConnectionRequestsApproved(this.currentUserId).subscribe(res =>{
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

  removeConnection(id){
    this.connectionsService.removeConnection(id).subscribe(res =>{
      console.log(res);
    })
  }

}
