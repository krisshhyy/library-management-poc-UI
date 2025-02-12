import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ApiService } from './shared/services/api.service';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SharedModule, AuthModule, BooksModule, UsersModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    let status = this.apiService.isLoggedIn() ?'loggedIn' : 'loggedOff';
    this.apiService.userStatus.next(status);
  }
  title = 'frontend';

  constructor (private apiService : ApiService){}
}
