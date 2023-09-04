import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonMonitorService {
  filePath: any[]=[];

  constructor(private http: HttpClient) { }

  getMonitorData(fileNames: string[]): Observable<any[]> {
    const requests = fileNames.map(fileName => {
      const filePath = `assets/JSONmonitors/${fileName}.json`;
      const storedData = localStorage.getItem(filePath);
      return this.http.get(filePath);

    });

    return forkJoin(requests);
  }

  saveEdidDataLocally(data: any) {
    localStorage.setItem('edidData', JSON.stringify(data));
  }

  searchInResponses(responses: any[], searchTerm: string): any[] {
    // Implement your search logic here
    return responses.filter(response => response.someProperty.includes(searchTerm));
  }
}
