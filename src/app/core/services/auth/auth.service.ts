import {Injectable} from '@angular/core';
import {Credentials} from "../../../data/Credentials";
import {Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //This references are needed for testing the service
  signInWithEmailAndPasswordRef = signInWithEmailAndPassword;
  createUserWithEmailAndPasswordRef = createUserWithEmailAndPassword;


  constructor(private auth: Auth) {

  }

  /**
   * Signs the user in with given credentials
   * @param credentials The given credentials
   */
  async login(credentials: Credentials) {
    return await this.signInWithEmailAndPasswordRef(
      this.auth,
      credentials.email,
      credentials.password
    );
  }

  /**
   * Creates a new user with the given credentials
   * @param credentials The given credentials
   */
  async signUp(credentials: Credentials) {
    return await this.createUserWithEmailAndPasswordRef(
      this.auth,
      credentials.email,
      credentials.password
    );
  }
}
