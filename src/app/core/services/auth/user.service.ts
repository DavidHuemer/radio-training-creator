import {Injectable} from '@angular/core';
import {UserDataDTO} from "../../data/User";
import {Firestore} from "@angular/fire/firestore";
import {BaseFirestoreService} from "../basics/BaseFirestoreService";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseFirestoreService {

  constructor(fireStore: Firestore) {
    super(fireStore);
  }

  async createUser(userId: string, userData: UserDataDTO) {
    const usersRef = this.getCollection('users');
    const userRef = this.getDocumentOfCollectionById(usersRef, userId);

    let newUserData: UserDataDTO = {
      firstName: userData.firstName,
      lastName: userData.lastName
    };

    return this.setDocument(userRef, newUserData);
  }
}
