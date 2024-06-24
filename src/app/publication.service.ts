import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private http: HttpClient) { }
  getPublications(){
    return this.http.get('http:localhost:8000/publication/list');
  }
  getPublication(id: number){
    return axios.get(`http:localhost:8000/publications/${id}`);
  }
  editPublication(id: number){
    return axios.put(`http:localhost:8000/publications/edit/${id}`);

  }
  createPublication(id: number){
    return axios.post(`http:localhost:8000/publications/edit/${id}`);

  }
  deletePublication(id: number){
    return axios.delete(`http:localhost:8000/publication/delete/${id}`);

  }
}
