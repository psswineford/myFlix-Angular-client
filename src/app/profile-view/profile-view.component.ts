import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { RemoveUserComponent } from '../remove-user/remove-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  UserFromStorage: any = localStorage.getItem('user');
  currentUser: any = (JSON.parse(this.UserFromStorage));
  currentUsername: any = this.currentUser.Username;
  currentFavs: any[] = [];
  favsEmpty: boolean = true;
  favMov: any = [];
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getCurrentUser(this.currentUsername);
    this.displayFavorites();
    this.getMovies();
  }

  /**
* Call API and get current user info
* @param currentUser
* @param currentFavs
* @return user data favorites
*/

  getCurrentUser(currentUser: string): void {
    this.fetchApiData.getUser(currentUser).subscribe((resp: any) => {
      this.currentUser = resp;
      this.currentFavs = resp.FavoriteMovies;
      console.log('from current user' + this.currentFavs);
      this.areFavsEmpty();
      // return this.currentUser;
      // return this.currentFavs;
    });
  }

  backToMovies(): void {
    this.router.navigate(['movies']);
  }

  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

  /**
* Call API and edit current user info
* @param username
* @param password
* @param email
* @param birthday
* @return updated user data
*/

  openUserEditDialog(
    username: string,
    password: string,
    email: string,
    birthday: Date
  ): void {
    this.dialog.open(UserEditComponent, {
      data: {
        username,
        password,
        email,
        birthday
      },
      width: '320px'
    });
  }

  /**
* Call API and delete current user
* 
*/

  openRemoveUserDialog(): void {
    this.dialog.open(RemoveUserComponent, {
      width: '320px'
    });
  }

  /**
* @function display current user favorites
* @param currentUser
* @param favorites
* @return filter movies
*/

  displayFavorites(): void {
    const user = localStorage.getItem('user');
    console.log(user);
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favorites = this.currentFavs;
      console.log(this.favorites);
      return this.filterMovies();
    });
  }

  /**
* @function filter movies and select favorites
* @param movies
* @param favorites
* @return favMov
*/


  filterMovies(): void {
    this.movies.forEach((movie: any) => {
      if (this.favorites.includes(movie._id)) {
        this.favMov.push(movie);
      }
    });
    console.log(this.favMov);

    return this.favMov;
  }

  /**
* @function call API to return all movies
*/


  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
  }

  /**
* @function call API to delete favorite movie
*/

  removeFromFavorites(movieId: string): void {
    this.fetchApiData.deleteMovie(this.currentUsername, movieId).subscribe((resp: any) => {
      this.ngOnInit();
      this.snackBar.open('Removed from favorites', 'OK', { duration: 2000 });
    });
    this.ngOnInit();
  }

  //checking whether favs are empty to create a boolean var for conditional rendering of "empty favs" message
  areFavsEmpty(): any {
    if (this.currentFavs.length == 0) {
      this.favsEmpty = true;
    } else {
      this.favsEmpty = false;
    }
    return this.favsEmpty;
  }





}