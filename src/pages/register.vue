<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="E-mail" v-model="email"/></p>
    <p><input type="password" placeholder="Password" v-model="password"/></p>
    <p><button @click="register">Register</button></p>
    <p><button @click="signInWithGoogle">Sign In with Google</button></p>
</template>

<script setup>
    import { ref } from 'vue';
    import { getAuth, 
        createUserWithEmailAndPassword,
        GoogleAuthProvider,
        signInWithPopup
     } from "firebase/auth";
    import { useRouter } from 'vue-router'; //imports router
    const email = ref("");
    const password = ref("");
    const router = useRouter()

    const register = () => {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Successfully registered");
            router.push('/todo');
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        });
    };

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider) //creaetes google pop up to sign in 
            .then((result) => {
                console.log(result.user);
                router.push("/todo");
            })
        .catch((error) => {

        });
    };
</script>

<style lang="scss">
   @import "src/assets/styles/master.scss";

</style>