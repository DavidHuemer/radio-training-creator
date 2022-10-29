import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {Firestore} from "@angular/fire/firestore";
import SpyObj = jasmine.SpyObj;
import {User} from "../../data/User";
import {of} from "rxjs";

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

  it('should return the correct user', async () => {
    const returningUser: User = {
      documentId: 'example',
      lastName: 'mustermann',
      firstName: 'max'
    };

    service.docRef = jasmine.createSpy('doc').and.returnValue(Promise.resolve());
    service.docDataRef = jasmine.createSpy('docData').and.returnValue(of(returningUser));

    service.getUserByUserId('example').subscribe(x => {
      expect(x).toEqual(returningUser)
    });
  });
});

