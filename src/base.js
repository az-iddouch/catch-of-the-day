import Rebase from 're-base';
import firebase from 'firebase';


// const base = Rebase.createClass({
//   apiKey: "AIzaSyCHWYg7etPDIuZcQn3w4BWoU-MeGhFp5Ro",
//   authDomain: "catch-of-the-day-jax-az.firebaseapp.com",
//   databaseURL: "https://catch-of-the-day-jax-az.firebaseio.com",
// });


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCHWYg7etPDIuZcQn3w4BWoU-MeGhFp5Ro",
  authDomain: "catch-of-the-day-jax-az.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-jax-az.firebaseio.com",
  projectId: "catch-of-the-day-jax-az"
});

export { firebaseApp }

const db = firebase.database(firebaseApp);
const base = Rebase.createClass(db);

export default base;

