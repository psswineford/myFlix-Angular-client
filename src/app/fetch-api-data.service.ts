import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://patricks-movie-api.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the API call for the user login endpoint 
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get all Movies method
   * Get a movie
   * @returns a movie
   */

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      //map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get single Movie method
   * Get a movie
   * @returns a movie
   */

  getMovie(_id: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + _id, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      //map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get a genre description
   * @returns a genre
   */

  getGenre(genre: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/' + genre, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      //map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get a director description
   * @returns a director
   */

  getDirector(director: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/' + director, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      //map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get user info
   * @returns a user
   */

  getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      //map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Put new user info
   * @returns updated info
   */

  editUser(username: string, userDetails: any): Observable<any> {
    //const username = localStorage.getItem('user')
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      //map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Post a movie to favorites
   * @returns user's favorite movies
   */

  addFavoriteMovies(username: string, movieId: any): Observable<any> {
    //const username = localStorage.getItem('user')
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId, {}, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      //map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Delete a movie from user's favorites
   * @returns updated user's favorites
   */

  deleteMovie(username: string, movieId: any): Observable<any> {
    //const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      //map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Delete a user
   */

  deleteUser(username: string): Observable<any> {
    //const username = localStorage.getItem('user')
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      //map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}
