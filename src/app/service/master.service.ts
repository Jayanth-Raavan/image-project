import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { 
    
  }

  apiUrl = "http://localhost:3000/productImages";
  apiById = "http://localhost:3001"
  getAllImages(){
    return this.http.get(this.apiUrl);
  }

  getImageById(id:any){
    return this.http.get(this.apiById+'/'+id);
  }
  UploadImage(data:any){
    return this.http.post(this.apiUrl,data);
  }
  RemoveImage(id:any){
    return this.http.delete(this.apiUrl+'/'+id);
  }
}
