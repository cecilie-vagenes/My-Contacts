import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/interfaces';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input()
  isAuth = false;

  @Input()
  isConfigOk = false;

  @Input()
  user: User = {} as User;

  @Output()
  isLogin = new EventEmitter<boolean>();

  login(isLogin: boolean) {
    this.isLogin.emit(isLogin);
  }

}
