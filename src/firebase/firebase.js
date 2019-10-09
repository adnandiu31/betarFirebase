import * as firebase from 'firebase';
import Rebase from "re-base";
import { devConfig } from './config';

const app = firebase.initializeApp(devConfig);
const base = Rebase.createClass(app.database());
const auth = app.auth();
const storage = firebase.storage()
const db = firebase.database()

export {
  auth,
  base, 
  storage,
  db,
  app
}