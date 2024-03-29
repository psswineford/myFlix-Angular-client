
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  @Input() newData = { Username: '', Email: '', Birthday: '' };

  userData: any = {
    Username: this.data.username,
    Email: this.data.email,
    Birthday: this.data.birthday
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserEditComponent>,
    public snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      username: string;
      email: string;
      birthday: Date;
    }
  ) { }

  ngOnInit(): void {
  }

/**
 * Send Updated user data to the API
 */

  editUser(): void {
    //prevent sending an empty field (that would erase the previous data and replace it with null)
    if (this.newData.Username  && this.newData.Email && this.newData.Birthday) {
      this.fetchApiData.editUser(this.data.username, this.newData).subscribe((resp: any) => {
        this.dialogRef.close();
        window.location.reload();
        localStorage.setItem('user', JSON.stringify(resp));
        this.snackbar.open('Data successfully updated', 'OK', { duration: 2000 })
      });
      //alert when submitting an empty field
    } else {
      this.snackbar.open('Plase fill all the fields', 'OK', { duration: 2000 })
    }
  }

}