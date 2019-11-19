import { Component, OnInit, ViewChild } from '@angular/core';
import { ConnectionsService } from 'src/app/_services';
import { MatTableDataSource, MatPaginator } from '@angular/material';

export interface ConnectionElement {
  avatar: string;
  name: string;
  position: string;
  view:string;
  action: string;
  bio:string;
}

@Component({
  selector: 'app-connection-approved-list',
  templateUrl: './connection-approved-list.component.html',
  styleUrls: ['./connection-approved-list.component.scss']
})
export class ConnectionApprovedListComponent implements OnInit {

  constructor(private connectionsService:ConnectionsService) { }
  myConnections:any;
  currentUserId:any;
  employeeList:ConnectionElement[] = [];

  displayedColumns: string[] = ["avatar", "name", "position","view","action"];
  dataSource:any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.connectionsService.getMyConnectionRequestsApproved(this.currentUserId).subscribe(res =>{
      this.setConnections(res);
    })
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setConnections(res){
    this.employeeList = [];
    this.myConnections = res.data;
    res.data.forEach(element => {
      this.employeeList.push({
        avatar: element.avatar,
        name: element.senderName,
        position: element.senderPosition,
        view:element.userId,
        action: element._id,
        bio:element.bio,
      });
    });
    this.dataSource = new MatTableDataSource (this.employeeList);
    this.dataSource.paginator = this.paginator;
    console.log("fasdfasdfa",this.dataSource);
  }

  removeConnection(id){
    this.connectionsService.removeConnection(id).subscribe(res =>{
      this.connectionsService.getMyConnectionRequestsApproved(this.currentUserId).subscribe(res =>{
        this.setConnections(res);
      })
    })
  }

}
