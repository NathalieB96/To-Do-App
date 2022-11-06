<template>

  <router-view/>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/todo">To-do</router-link>
    <router-link to="/signin">Login</router-link>
    <router-link to="/register">Register</router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
  </nav>

  

</template>

<script setup>



/*
  imports
*/

import { ref, onMounted } from 'vue'; //login + todo
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";  //login
import { collection, onSnapshot, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '@/firebase';


/*
  logout
*/


const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    }else {
      isLoggedIn.value = false;
    }
  });
});


const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/signin")
  })
};


</script>


<style>
  @import 'bulma/css/bulma.min.css';

  .todo {
    max-width: 400px;
    padding: 20px;
    margin: 0 auto;
  }

  .line-through {
    text-decoration: line-through;
  }
</style>

