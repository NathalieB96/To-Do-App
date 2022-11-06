import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'



import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKTwdEQYkeSzNsSGN-EMoZG9ghiGS1zFA",
  authDomain: "to-do-app-53bd6.firebaseapp.com",
  projectId: "to-do-app-53bd6",
  storageBucket: "to-do-app-53bd6.appspot.com",
  messagingSenderId: "172241751342",
  appId: "1:172241751342:web:4413cdbbf2c473d74b3ebf"
};

// Initialize Firebase

initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);

app.mount('#app')

// createApp(App).mount('#app');