<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="E-mail" v-model="email"/></p>
    <p><input type="password" placeholder="Password" v-model="password"/></p>
    <p><button @click="register">Register</button></p>
</template>

<script setup>
    import { ref } from 'vue';
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { useRouter } from 'vue-router';
    const email = ref("");
    const password = ref("");

    const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("Successfully registered");
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        });
    };

    const signInWithGoogle = () => {

    }
</script>