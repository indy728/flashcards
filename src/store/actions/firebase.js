import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

app.initializeApp(config)

export const firebaseAuth = app.auth()

firebaseAuth.onAuthStateChanged(user => {
    if (user) {
        // console.log(user)
        // firebase.auth().signOut()
        //     .then(() => console.log('signout success'))
        //     .catch(er => console.log(er))
    } else {
        // console.log('no user')
    }
})

export const database = app.database()

export const firebaseRefByArray = (ref, childArray, depth = 0) => {
    if (depth < childArray.length) {
        ref = ref.child(childArray[depth])
        return firebaseRefByArray(ref, childArray, depth + 1)
    } else  {
        return ref
    }
}
