<template>
    <h1>Welcome to todly</h1>
    <div class="login row col-xs-10 col-md-6">
        <div class="login__container add-padding--small">
            <h2>Login</h2>
            <input class="login__input" type="text" placeholder="E-mail" v-model="email"/>
            <input class="login__input" type="password" placeholder="Password" v-model="password"/>
            <a class="login__reset" @click="resetPassword">Forgot Password?</a>
            <p>{{ successMsg }}</p>
            <p v-if="errMsg">{{ errMsg }}</p>
            <button class="login__button" @click="signin">Sign-In</button>
            <p>No account yet? <router-link to="/register">Register</router-link></p>
        </div>
    </div>

    <div class="row">
        <button class="login__google-button" @click="signInWithGoogle"> 
            <img src="../assets/img/btn_google_signin_light_normal_web.png" alt="Google Logo">
        </button>
    </div>

    <img class="login-image" src="../assets/img/women.svg" alt="Women with Pencil" >

</template>

<script setup>
    /*
    imports 
    */

    import { ref } from 'vue';
    import { getAuth, 
            signInWithEmailAndPassword, sendPasswordResetEmail, 
            GoogleAuthProvider, signInWithPopup
         } from "firebase/auth";
    import { useRouter } from 'vue-router'; 
    
    const router = useRouter()


    const auth = getAuth()
    const email = ref("");
    const password = ref("");
    

    /*
    Sign in with email
    */
    
    const errMsg = ref(""); // Error message sign in
    
    const signin = () => {
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

    /*
    Sign in with Google
    */

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

    /*
    Reset Password
    */

    const successMsg = ref(""); // variable for success message

    const resetPassword = () => {

        sendPasswordResetEmail(auth, email.value)
        .then((data) => {
            console.log("email send");
            successMsg.value = "We have sent you an email to reset your password!";
        })
        .catch((error) => {
            console.log(error.code);
        });
    }
</script>

<style lang="scss">
   @import "src/assets/styles/master.scss";

</style>