import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhotogrametryResult } from './photogrametry-result';

import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PhotogrametryResultService {

  resultsEnpoint = "http://localhost:7881/results";
  fileEnpoint = "http://localhost:7881/files/results/";

  constructor(private http: HttpClient) { }

  getResults(): Observable<PhotogrametryResult[]> {
    return this.http.get<PhotogrametryResult[]>(this.resultsEnpoint)
      .pipe(
        map(
          array => array.map(
            (
              elem => {
                elem.path = this.fileEnpoint + elem.path;
                console.log(elem);
                return elem;
              }
            )
          )
        )
      )
  }
}
