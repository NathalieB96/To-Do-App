<template>
  
  <nav class="row col-xs-12">
    <!-- <router-link class="navbar-item blue" to="/">Home</router-link>
    <router-link class="navbar-item" to="/todo">To-do</router-link>
    <router-link class="navbar-item" to="/signin">Login</router-link>
    <router-link class="navbar-item" to="/register">Register</router-link> -->
    <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
  </nav>
  <router-view/>

</template>

<script setup>


/*
  imports
*/

import { ref, onMounted } from 'vue'; //login + todo
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";  //login
import { collection, onSnapshot, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '@/firebase';
import { useRouter } from 'vue-router'; //imports router

const router = useRouter()

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


<style lang="scss">
   @import "src/assets/styles/master.scss";
</style>

