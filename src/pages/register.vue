<template>
    <h1>Welcome to todly</h1>
    <div class="login row col-xs-10 col-md-6">
        <div class="login__container add-padding--small">
        <h2>Register</h2>
        <input class="login__input" type="text" placeholder="E-mail" v-model="email"/>
        <input class="login__input" type="password" placeholder="Password" v-model="password"/>
        <button class="login__button" @click="register">Register</button>
        <p class="error-msg" v-if="errMsg">{{ errMsg}}</p>
        <p>Already have an account? <router-link to="/signin">Sign In</router-link></p>
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
    import { getAuth, 
        createUserWithEmailAndPassword,
        GoogleAuthProvider,
        signInWithPopup
     } from "firebase/auth";
    import { useRouter } from 'vue-router'; //imports router
    const email = ref("");
    const password = ref("");
    const errMsg = ref(""); 
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
            switch (error.code) {
                case "auth/missing-email":
                    errMsg.value = "Please enter an E-mail";
                    break;
                case "auth/invalid-email":
                    errMsg.value = "Invalid E-mail";
                    break;
                default: 
                    errMsg.value = "E-mail or password is invalid";
                    break; 
            }
            // alert(error.message);
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