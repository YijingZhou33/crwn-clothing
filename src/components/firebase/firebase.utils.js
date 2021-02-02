import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCpAM0_0z1n16qOrxSLnb1Gutp-rYnThFM",
  authDomain: "crwn-db-d206a.firebaseapp.com",
  projectId: "crwn-db-d206a",
  storageBucket: "crwn-db-d206a.appspot.com",
  messagingSenderId: "258670796916",
  appId: "1:258670796916:web:307b397f0752a5277b7121",
  measurementId: "G-5M7W1SV97N",
};

/* 
    Take User Auth object and store in the database
    Asynchronous - make API request

    If there's no Auth object, meaning user has signed out.
    If exists, query for the document to see if it has already been added.

    A query is a request that Firestore will return something from the database.

    There're two types of objects:
      1. references
        represents the "current" place in the database that we're querying. 
        
        The queryReference object does not have the actual data of the collection or document. 
        It instead has properties that tell use details about it, or the method to get the Snapshot object
        which gives us the data we are looking for. 

        Whether to save data to the firestore or get data from this location in the database.
        
        firestore.doc('/users/:userId');
          id/path/parent(collection)
        firesotre.collections('/users')  
      
      2. snapshots 
        represents the data

        documentRef.get() --> documentSnapshot object
          props: exists, id, ...
          The documentSnapshot object allows us to check if a document exists
          at this query using the `.exists` prop which return a boolean.

          We can also get the actual props by calling the `.data()` which returns
          a JSON object of the document. 
          
        collectionRef.get() --> querySnapshot object



        If snapshot doesn't exist, create a new userRef using userAuth.
        So the user is in the firestore now. 
    
    Of these objects, they can be either Document or Collection. 

    Firestore will always return us these objects, even if nothing exists at from that query.
    Using this object, we can determine whether or not there's any data there. 
    
    DocumentReference & CollectionReference
      documentRef object (`userRef`) is to perform CRUD methods (create, retrieve, update, delete).
      The documentRef methods are .set(), .get(), .update() and .delete().

      add documents to collections: collectionRef.add({value:prop})

      snapshotObject: documentRef.get(), collectionRef.get()
        documentRef returns a documentSnapshot object
        collectionRef returns a querySnapshot object
*/
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// Always trigger the Google popup whenever we use Google Auth provider for authentication
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
