import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService} from '../fetch-api-data.service';
@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})
export class GenreCardComponent implements OnInit {

  //genre of the current movie
  genre: any = this.data.name;

  constructor(
    public fetchApiData: FetchApiDataService,

    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
    }
  ) { }

  ngOnInit(): void {
    this.getGenreDescription(this.genre);
  }

  //get genre data on current movie
  getGenreDescription(currentGenre: string): void {
    this.fetchApiData.getGenre(currentGenre).subscribe((resp: any) => {
      this.genre = resp;
      return this.genre;
    });
  }
}