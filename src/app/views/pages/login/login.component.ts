import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError = false;
  loading = false;
  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) { }
  async login() {
    this.loading = true;
    this.loginError = false;
    this.httpClient
      .post(`${environment.serverUrl}/login`, { username: this.username, password: this.password })
      .subscribe(
        (data: any) => {
          this.loading = false;
          console.log('success', data);
          if (data.success === 'Authenticated!') {
            this.authService.isLoggedIn = true;
            this.router.navigateByUrl('/dashboard');
          }
        },
        error => {
          this.loading = false;
          this.loginError = true;
          console.log('oops', error);
        }
      );




  }
}
