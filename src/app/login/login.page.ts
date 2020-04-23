import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserprofileService} from '../userprofile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  Firstname: any;
  Lastname: any;

  constructor(private userprofile: UserprofileService, private router: Router) { }

  ngOnInit() {
  }

  async createprofile() {
    await this.userprofile.setFirstName(this.Firstname);
    await this.userprofile.setLastName((this.Lastname));
    this.router.navigateByUrl('/home');
  }

}
