<template>
    <h1>Sign in to your Account</h1>
    <p><input type="text" placeholder="E-mail" v-model="email"/></p>
    <p><input type="password" placeholder="Password" v-model="password"/></p>
    <p v-if="errMsg">{{ errMsg}}</p>
    <p><button @click="register">Sign-In</button></p>
    <p><button @click="signInWithGoogle">Sign In with Google</button></p>
</template>

<script setup>
    import { ref } from 'vue';
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import { useRouter } from 'vue-router'; //imports router
    const email = ref("");
    const password = ref("");
    const errMsg = ref(""); // Error message
    const router = useRouter()

    const register = () => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Successfully signed in");
            router.push('/todo');
        })
    const signInWithGoogle = () => {

    }
</script>
