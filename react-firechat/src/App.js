import React, {useState, useEffect} from 'react';
import './App.css';
//Components

import Button from '/components/Button';

//Firebase deps
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyCQAAfOdkZ9EcTQ0oKYJvHvoFBLk9YXRQw",
    authDomain: "realtimechat-936ed.firebaseapp.com",
    projectId: "realtimechat-936ed",
    storageBucket: "realtimechat-936ed.appspot.com",
    messagingSenderId: "770502114727",
    appId: "1:770502114727:web:7e32c318b0e517b300ca82",
    measurementId: "G-TESMMD5D4R"
});

const auth = firebase.auth();
const db = firebase.firestore();


function App() {
    const [user,setUser] = useState(() => auth.currentUser);
    const [initializing, setInitializing] = useState(true);
    useEffect (() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            if (initializing){
                setInitializing(false);
            }
        })
        //Cleanup Subscription
        return unsubscribe;
    }, [])
    const signInWithGoogle = async () => {
        //Retrieve Google provider object
        const provider = new firebase.autho.GoogleAuthProvider();
        //Set Language to the default browser preference
        auth.useDeviceLanguage();
        try {
            await auth.signInWIthPopup(provider);
        }catch(error){
            console.log(error);
        }
    };

    const signOut = async() => {
        try {
            await firebase.auth().signOut();
        } catch(error){
            console.log(error.message);
        }
    };

    if(initializing) return "Loading...";
  return (
    <div>
        {user ? (
            <>
                <Button onClick = {signOut}>Sign out</Button>
                <Channel user={user} db={db} />
            </>

        ) : (
            <Button onClick={signInWithGoogle}>Sign in with Google</Button>

        )}
    }
    </div>
  );
}

export default App;
