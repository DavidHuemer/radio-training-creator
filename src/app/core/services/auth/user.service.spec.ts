import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {Firestore} from "@angular/fire/firestore";
import SpyObj = jasmine.SpyObj;

describe('UserService', () => {
  let service: UserService;
  let fireStoreSpy: SpyObj<Firestore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Firestore, useValue: fireStoreSpy}
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the document', function () {
    service.collectionRef = jasmine.createSpy('collection').and.returnValue(Promise.resolve());
    service.docRef = jasmine.createSpy('doc').and.returnValue(Promise.resolve());

    let setDocRefSpy = jasmine.createSpy('setDoc').and.returnValue(Promise.resolve());
    service.setDocRef = setDocRefSpy;

    service.createUser('newUser', {
      firstName: 'max',
      lastName: 'mustermann'
    });

    expect(setDocRefSpy).toHaveBeenCalledTimes(1)
  });
});

