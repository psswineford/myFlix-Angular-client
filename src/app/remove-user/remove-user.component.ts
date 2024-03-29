import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.scss']
})
export class RemoveUserComponent implements OnInit {


  UserFromStorage: any = localStorage.getItem('user');
  currentUser: any = (JSON.parse(this.UserFromStorage));
  username: string = this.currentUser.Username;

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<RemoveUserComponent>,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

   /**
 * Form for deleting a user
 * Send @deleteUser data to the API
 */

  removeUser(): void {
    this.fetchApiData.deleteUser(this.username!).subscribe((response) => {
      console.log('response', response);
      console.log('removing user:', this.username);
      this.snackbar.open('Your account has been removed', 'Bye', { duration: 2000 });
      this.dialogRef.close();
      localStorage.clear();
      this.router.navigate(['welcome'])
    });
  }
}