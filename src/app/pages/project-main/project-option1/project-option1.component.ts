import { Component, OnInit } from '@angular/core';
import {CommunicationServiceService} from '../../../service/communication_service/communication-service.service';


interface TableDetails {
  userName: string;
  id: number;
  mobileNo: number;
  bookId: any;
  bookName: any;
}

@Component({
  selector: 'app-project-option1',
  templateUrl: './project-option1.component.html',
  styleUrls: ['./project-option1.component.scss']
})
export class ProjectOption1Component implements OnInit {
  titleData = [{title: 'Table.Position_1_Title'}, {title: 'Table.Position_2_Title'}, {title: 'Table.Position_3_Title'}, {title: 'Table.Position_4_Title'}, {title: 'Table.Position_5_Title'}];
  tableData: any;
  duplicate = [];
  constructor(private service: CommunicationServiceService) {
  }

  ngOnInit() {
    this.getDetails();
  }
  async getDetails() {
    // Based on the user/admin show only related data's
    const userData = localStorage.getItem('details');
    const {id} = JSON.parse(userData);
    if (id === 1) {
      this.tableData = await this.service.getObjects('users/', '');
    } else {
      const s = await this.service.getObjects('users/', id);
      this.duplicate.push(s);
      this.tableData = this.duplicate;
    }
  }
}
