import {collection, doc, docData, Firestore, setDoc} from "@angular/fire/firestore";
import {CollectionReference} from "@angular/fire/firestore";
import {DocumentReference} from "@angular/fire/firestore";
import {map} from "rxjs";

/**
 * Base class for all firestore services
 */
export abstract class BaseFirestoreService {
  collectionRef = collection;
  docRef = doc;
  setDocRef = setDoc;
  docDataRef = docData;

  public static readonly DOCUMENT_ID_PROPERTY_NAME = 'documentId';

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

  /**
   * Returns a document data as a type by a given path
   * @param path The path to the document
   * @param pathSegments Optional path segments
   * @protected
   */
  protected getDocumentDataAndParse<T>(path: string, ...pathSegments: string[]) {
    return this.getDocumentData(path).pipe(
      map((projectData) => ({...projectData as T}))
    )
  }

  /**
   * Returns a document data by a given path
   * @param path The path to the document
   * @param pathSegments Optional path segments
   * @protected
   */
  protected getDocumentData(path: string, ...pathSegments: string[]) {
    return this.docDataRef(this.getDocument(path, ...pathSegments), {idField: BaseFirestoreService.DOCUMENT_ID_PROPERTY_NAME});
  }

  /**
   * Returns a document reference by a given path
   * @param path The path to the document
   * @param pathSegments Optional path segments
   * @protected
   */
  protected getDocument(path: string, ...pathSegments: string[]) {
    return this.docRef(this.fireStore, path, ...pathSegments);
  }
}
