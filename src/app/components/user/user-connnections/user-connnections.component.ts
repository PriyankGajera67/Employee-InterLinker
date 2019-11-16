import { Component, OnInit } from '@angular/core';
import { ConnectionsService } from 'src/app/_services';

@Component({
  selector: 'app-user-connnections',
  templateUrl: './user-connnections.component.html',
  styleUrls: ['./user-connnections.component.scss']
})
export class UserConnnectionsComponent implements OnInit {

  constructor(private connectionsService:ConnectionsService) { }
  myConnections:any;
  currentUserId:any;
  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.connectionsService.getMyConnection(this.currentUserId).subscribe(res =>{
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
}
