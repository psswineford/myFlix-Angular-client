import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service'
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { DescriptionCardComponent } from '../description-card/description-card.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
  movies: any[] = [];
  currentUser: any = localStorage.getItem('user');
  user: any= JSON.parse(this.currentUser)
  currentUserName: any=this.user.Username;

  favoriteMovies: any[] = [];
  


  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,  
    public router: Router,
    public snackBar: MatSnackBar,
    ) { }

ngOnInit(): void {
  this.getMovies();
}



getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  
  openGenreCard(
    name: string,
    description: string
  ): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        name,
        description,
      },
      width: '500px'
    });
  }

  openDirectorCard(
    name: string,
    bio: string,
    birth: Date,
    death: Date
  ): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        name,
        bio,
        birth,
        death
      },
      width: '500px'
    });
  }

  openDescriptionCard(
    title: string,
    description: string,
  ): void {
    this.dialog.open(DescriptionCardComponent, {
      data: {
        title,
        description
      },
      width: '500px'
    });
  }
  openProfile(): void {
    this.router.navigate(['profile']);
  }

  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

  addToFavs(movieId: string, title: string): void {
    this.fetchApiData
      .addFavoriteMovies(this.currentUserName, movieId)
      .subscribe((res: any) => {
        this.snackBar.open(
          `${title} has been added to your favorite movies! ✔️`,
          'Cool',
          {
            duration: 2000,
          }
        );
        this.ngOnInit();
      });
    return this.getUserFavs();
  }

  getUserFavs(): any {
    this.fetchApiData.getUser(this.currentUserName).subscribe((res: any) => {
      this.favoriteMovies = res.Favorites;
      return this.favoriteMovies;
    });
  }

  

}

