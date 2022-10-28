import {Credentials} from "../../data/Credentials";
import {DocumentData} from "./Basics";

export interface UserDataDTO{
  firstName: string,
  lastName: string,
}

export interface User extends UserDataDTO, DocumentData{

}

export interface UserCreationData extends Credentials, UserDataDTO {
}
