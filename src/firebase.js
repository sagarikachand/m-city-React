import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'

const API_KEY = 'AIzaSyAtMmaiZqQpkjg46twjsIwJywJ-PqgDjgM'



const config = {
    apiKey: "AIzaSyAtMmaiZqQpkjg46twjsIwJywJ-PqgDjgM",
    authDomain: "m-city-da667.firebaseapp.com",
    databaseURL: "https://m-city-da667.firebaseio.com",
    projectId: "m-city-da667",
    storageBucket: "m-city-da667.appspot.com",
    messagingSenderId: "40220565918"
  };
  firebase.initializeApp(config);

  const firebaseDB = firebase.database();
  const firebaseMatches =firebaseDB.ref('matches')
  const firebasePromotions =firebaseDB.ref('promotions')
  const firebaseTeams =firebaseDB.ref('teams')
export{
  firebase,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebaseDB
} 