import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {Auth} from "@angular/fire/auth";

describe('AuthService', () => {
  let authMock;
  let service: AuthService;

  beforeEach(() => {
    authMock = {
      currentUser: {
        uid: 'example'
      }
    };
    TestBed.configureTestingModule({
      providers: [
        {provide: Auth, useValue: authMock}
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call signInWithEmailAndPassword when login', async () => {
    let spy = jasmine.createSpy('signInWithEmailAndPassword').and.returnValue(new Promise(() => Promise.resolve()));
    service.signInWithEmailAndPasswordRef = spy;
    service.login({email: '', password: ''}).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it('should call createUserWithEmailAndPassword when signUp', async () => {
    let spy = jasmine.createSpy('createUserWithEmailAndPasswordRef').and.returnValue(new Promise(() => Promise.resolve()));
    service.createUserWithEmailAndPasswordRef = spy;
    service.signUp({email: '', password: ''}).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it('should return the correct uid', async () => {
    expect(service.getUserId()).toBe("example");
  });
});
