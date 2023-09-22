import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Crud } from '../crud';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  posts: Crud[] = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];

  constructor(public postService: CrudService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: Crud[]) => {
      this.posts = data;
    })
  }

  deletePost(id) {
    this.postService.delete(id).subscribe(res => {
      this.posts = this.posts.filter(item => item.id !== id);
      this.toastr.success('Crud deleted successfully!');
    })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.postService.getAll().subscribe((data: Crud[]) => {
      this.posts = data;
    })
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.postService.getAll().subscribe((data: Crud[]) => {
      this.posts = data;
    })
  }



}