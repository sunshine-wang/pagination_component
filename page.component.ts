import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { pageInfo } from './pageInfo';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less']
})


export class PageComponent implements OnInit {

  @Input() nums: number;
  @Output() pageClick = new EventEmitter<pageInfo>();

  constructor() { }

  public pageSize: number = 10;
  public pageStart: number = 0;
  public pageList: any[] = [];
  private pageNum: number;
  public showstart: number = 1;
  public showend: number = 10;
  public currentIndex: number = 1;
  private showPageMumber: number;
  private maxPage: number = 10;
  ngOnInit() {
    this.getPageList();
  }

  changePageSize() {
    this.pageNum = Math.ceil(this.nums / this.pageSize);
    this.currentIndex = this.currentIndex > this.pageNum ? this.pageNum : this.currentIndex;
    this.getPageFromTo();
    this.getPageList();
    const page = new pageInfo(this.showstart, this.showend);
    this.pageClick.emit(page);
  }

  changePage(index) {
    this.pageStart = (index - 1) * this.pageSize;
    this.currentIndex = index;
    this.getPageFromTo();
    const page = new pageInfo(this.showstart, this.showend);
    this.pageClick.emit(page);
  }

  prevPage() {
    if (this.currentIndex == 1) {
      return;
    } else if (this.pageNum > this.maxPage) {
      this.getPageList('prev');
      this.changePage(this.currentIndex - 1);
    } else {
      this.changePage(this.currentIndex - 1);
    }
  }

  nextPage() {
    if (this.currentIndex >= this.pageNum) {
      return;
    } else if (this.currentIndex >= this.showPageMumber) {
      this.getPageList('next');
      this.changePage(this.currentIndex + 1);
    } else {
      this.changePage(this.currentIndex + 1);
    }
  }

  getPageFromTo() {
    this.showstart = (this.currentIndex - 1) * this.pageSize + 1;
    this.showend = this.currentIndex * this.pageSize > this.nums ? this.nums : this.currentIndex * this.pageSize;
  }

  getPageList(status?) {
    this.pageList = [];
    this.pageNum = Math.ceil(this.nums / this.pageSize);
    this.showPageMumber = this.pageNum;
    if (this.pageNum > this.maxPage) {
      this.showPageMumber = this.maxPage;
    }
    let startList = 1;
    if (this.currentIndex >= this.maxPage && status == 'next') {
      startList = this.currentIndex - this.maxPage + 2;
    } else if (this.currentIndex > this.maxPage && status == 'prev') {
      startList = this.currentIndex - this.maxPage;
    }
    this.currentIndex - this.maxPage
    for (let i = startList; i <= this.showPageMumber + startList -1; i++) {
      this.pageList.push(i);
    }
    if (this.pageNum > this.maxPage) {
      this.pageList.splice(2,0,'...');
    }
  }

}
