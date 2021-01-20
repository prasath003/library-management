import {Component, OnInit} from '@angular/core';
import {CommunicationServiceService} from '../../../service/communication_service/communication-service.service';
import {ComponentServiceService} from '../../../service/component_service/component-service.service';


@Component({
  selector: 'app-project-option',
  templateUrl: './project-option.component.html',
  styleUrls: ['./project-option.component.scss']
})
export class ProjectOptionComponent implements OnInit {
  responseUserData: any;
  responseSearchData: any;
  loading = false;
  bookName: string;
  bookAuthor: string;
  bookCategory: string;
  bookCount: string;
  searchTerm: any;
  bookIdArray = [];
  bookNameArray = [];
  constructor(private service: CommunicationServiceService, private messagefromservice: ComponentServiceService) {
    // this.messagefromservice.currentMessage.subscribe(message => this.otherTheme = message);
  }

  ngOnInit() {
    this.getDetails();
  }


  async lendingBook(select) {
    // this.loading = true;
    const {bookName, bookCount, bookAuthor, bookTechnology, id} = select;
    const body = {bookName, bookCount: (bookCount - 1), bookAuthor, bookTechnology};
    const response = await this.service.putObjects('books/' + id, body);
    this.getDetails();
    this.updateUser(id, bookName);
  }
  async updateUser(bookid, bookname) {
    const details = localStorage.getItem('details');
    // @ts-ignore
    const {userName, mobileNo, bookId, bookName, id} = JSON.parse(details);
    this.bookIdArray = bookId;
    this.bookNameArray = bookName;
    this.bookIdArray.push(bookid);
    this.bookNameArray.push(bookname);
    const userBody = {userName, mobileNo, bookId: this.bookIdArray, bookName: this.bookNameArray, id};
    const responseUser = await this.service.putObjects('users/' + id, userBody );
    // @ts-ignore
    localStorage.setItem('details', JSON.stringify(userBody));
  }
  async getDetails() {
    this.responseUserData = await this.service.getObjects('books/', '');
    this.responseSearchData = this.responseUserData;
  }
  async addBook(bookName, bookAuthor, bookCategory, bookCount) {
    const body = {bookName, bookAuthor, bookCategory, bookCount};
    const response = await this.service.postObjects('books/', body);
    this.bookName = this.bookAuthor = this.bookCategory = this.bookCount = '';
    this.getDetails();
  }
  setFilteredItems(searchTerm) {
    if (searchTerm && searchTerm.trim() !== '') {
      return this.responseUserData = this.responseSearchData.filter(item => (item.bookName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (item.bookAuthor.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
    } else {
      this.responseUserData = this.responseSearchData;
    }
  }
}
