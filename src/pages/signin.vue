<template>
    <h1>Welcome to todly</h1>
    <div class="login row col-xs-10 col-md-6">
        <div class="login__container add-padding--small">
            <h2>Login</h2>
            <input class="login__input" type="text" placeholder="E-mail" v-model="email"/>
            <input class="login__input" type="password" placeholder="Password" v-model="password"/>
            <p class="error-msg" v-if="errMsg">{{ errMsg}}</p>
            <button class="login__button" @click="register">Sign-In</button>
            <p>No account yet? <router-link to="/register">Register</router-link></p>
        </div>
    </div>

    <div class="row">
        <button class="login__google" @click="signInWithGoogle"> 
            <img src="../assets/img/btn_google_signin_light_normal_web.png">
        </button>
    </div>

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
        .catch((error) => {
            console.log(error.code);
            switch (error.code) {
                case "auth/invalid-email":
                    errMsg.value = "Invalid E-mail";
                    break;
                case "auth/user-not-found":
                    errMsg.value = "No account with this E-mail was found";
                    break; 
                case "auth/wrong-password":
                    errMsg.value = "Incorrect password"
                    break; 
                default: 
                    errMsg.value = "Email or password was incorrect";
                    break; 
            }
            // alert(error.message);
        });
    };

    const signInWithGoogle = () => {

    }
</script>

<style lang="scss">
   @import "src/assets/styles/master.scss";

</style>