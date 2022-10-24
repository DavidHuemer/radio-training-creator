import {collection, doc, Firestore, setDoc} from "@angular/fire/firestore";
import {CollectionReference} from "@angular/fire/firestore";
import {DocumentReference} from "@angular/fire/firestore";

/**
 * Base class for all firestore services
 */
export abstract class BaseFirestoreService {
  collectionRef = collection;
  docRef = doc;
  setDocRef = setDoc;

  protected constructor(private fireStore: Firestore) {
  }

  /**
   * Returns a collection reference by a given part and path segments
   * @param path The given path
   * @param pathSegments The given path segments
   * @protected
   */
  protected getCollection(path: string, ...pathSegments: string[]) {
    return this.collectionRef(this.fireStore, path, ...pathSegments)
  }

  /**
   * Sets a document by a document reference and the new document data
   * @param documentRef The document reference that should be set
   * @param documentData The new document data
   * @protected
   */
  protected async setDocument(documentRef: DocumentReference,
                              documentData: any) {
    return this.setDocRef(documentRef, documentData);
  }

  /**
   * Returns a document reference by a collection reference and an id
   * @param collectionRef The given collection reference
   * @param id The id of the document of which the reference should be returned
   * @protected
   */
  protected getDocumentOfCollectionById(collectionRef: CollectionReference, id: string) {
    return this.docRef(collectionRef, id);
  }
}
