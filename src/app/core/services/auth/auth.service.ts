import {Injectable} from '@angular/core';
import {Credentials} from "../../../data/Credentials";
import {Auth, signInWithEmailAndPassword} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //This reference is needed for testing the service
  signInWithEmailAndPasswordRef = signInWithEmailAndPassword;

  constructor(private auth: Auth) {

  }

  async login(credentials: Credentials) {
    return await this.signInWithEmailAndPasswordRef(
      this.auth,
      credentials.email,
      credentials.password
    );
  }
}
