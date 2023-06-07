import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  data: any;
  uploadedData: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchData();
  }

  uploadData() {
    this.http.post<any>('http://localhost:3003/data', { data: this.data }).subscribe(
      (response: any) => {
        console.log('Upload response:', response);
        this.fetchData(); // Call fetchData() after successful upload
      },
      (error: any) => {
        console.error('Upload error:', error);
      }
    );
  }
  
  
  fetchData() {
    this.http.get('http://localhost:3000/productImages').subscribe(
      (data: any) => {
        console.log('Fetched data:', data);
        this.uploadedData = data;
        console.log(data)
      },
      (error: any) => {
        console.error('Fetch error:', error);
      }
    );
  }
}
