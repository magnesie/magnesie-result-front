import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotogrametryResult } from './photogrametry-result';
import { PhotogrametryResultService } from './photogrametry-result.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private photogrametryResultService: PhotogrametryResultService) { }

  title: string = "Photogrametry result viewer";
  results: PhotogrametryResult[];

  ngOnInit() {
    this.getResults();
  }

  getResults() {
    this.photogrametryResultService.getResults().subscribe({
      next: value => this.results = value,
      error: err => console.error(err),
    })
  }
}
