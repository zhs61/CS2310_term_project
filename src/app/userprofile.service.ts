import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  firstname: string;
  lastname: string;

  constructor() { }

  setFirstName(firstname) {
    this.firstname = firstname;
  }

  setLastName(lastname) {
    this.lastname = lastname;
  }

  getFirstName() {
    return this.firstname;
  }

  getLastName() {
    return this.lastname;
  }
}
