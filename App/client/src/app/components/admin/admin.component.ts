import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  title = 'app';

  rowDataClicked : any;
  columnDefs = [
    { headerName: 'Make', field: 'make',sortable: true,filter:true },
    { headerName: 'Model', field: 'model',sortable: true,filter:true },
    { headerName: 'Price', field: 'price',sortable: true,filter:true },
    { headerName: 'Price', field: 'price',cellRenderer: '<button>test</button>' },
  ];

  rowData : any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
  }

  onRowPublishBtnClick(e) {    
    this.rowDataClicked = e.rowData;
  }

  getLabel(rowData)
  {    
    console.log(rowData);
    if(rowData && rowData.hasIndicator)
      return 'Republish';
      else return 'Publish';
  }

}
