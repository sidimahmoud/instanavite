<template>
    <div style="margin-top:5%" id="bodyRegister">
        <div class="container">
            <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="signup-form bg-white">
                        <form @submit.prevent="register">
                            <h2>Register</h2>
                            <p class="hint-text">Create your account. It's free and only takes a minute.</p>
                            <div class="alert alert-danger alert-dismissible fade show" role="alert"
                                 v-if="errorMessage">
                                {{errorMessage}}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col">
                                        <input type="text" class="form-control" name="first_name"
                                               placeholder="First Name" required="required" v-model="first_name">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" name="last_name" placeholder="Last Name"
                                               required="required" v-model="last_name">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control" name="email" placeholder="Email"
                                       required="required" v-model="email">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" name="password" placeholder="Password"
                                       required="required" v-model="password1">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" name="confirm_password"
                                       placeholder="Confirm Password" required="required" v-model="password2">
                            </div>
                            <div class="form-group">
                                <label class="form-check-label">
                                    <input type="checkbox" required="required">
                                    I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a>
                                </label>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-lg btn-block">
                                    <span @click="signUpSubmit">Sign up </span>
                                    <div class="text-center text-white" v-if="authLoading">
                                        <span class="spinner-border spinner-border-sm" role="status"
                                            aria-hidden="true">

                                        </span>
                                            Loading...
                                    </div>
                                </button>
                            </div>

                        </form>
                        <div class="text-center">Already have an account?
                            <router-link :to="{name: 'Login'}">Sign in</router-link>
                        </div>
                        <h2>Or</h2>
                        <!-- <button class="btn btn-lg btn-google btn-block text-uppercase" @click="loginGoogle('google')">
                            <i class="fab fa-google"></i> Continue with Google
                        </button>
                        <button class="btn btn-lg btn-github  btn-block text-uppercase" @click="loginGoogle('facebook')">
                            <i class="fab fa-facebook"></i> Continue with Facebook
                        </button> -->
                        <g-signin-button
                            class="btn btn-lg btn-google btn-block text-uppercase"
                            :params="googleSignInParams"
                            @success="ongSignInSuccess"
                            @error="ongSignInError">
                            <i class="fab fa-google"></i> Sign in with Google
                        </g-signin-button>
                        <fb-signin-button
                            class="btn btn-lg btn-github  btn-block text-uppercase"
                            :params="fbSignInParams"
                            @success="onSignInSuccess"
                            @error="onSignInError">
                            <i class="fab fa-facebook"></i> Sign in with Facebook
                        </fb-signin-button>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Register",

        data() {
            return {
                first_name: '',
                last_name: '',
                email: '',
                password1: '',
                password2: '',
                errorMessage: '',
                fbSignInParams: {
                scope: 'email,user_likes',
                    return_scopes: true
                },
                googleSignInParams: {
                    client_id: '562139948414-sgs3p6c198oc9o4c65mse9l17c6t524h.apps.googleusercontent.com'
                },
                authLoading: false
            }
        },
        methods: {

            register() {
                if (this.password1 !== this.password2) {
                    this.errorMessage = "Password confirmation doesn't match Password";
                    return
                }
                this.$store.dispatch('register', {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    password: this.password1,
                })
                    .then(res => {
                        console.log(res)
                        this.$router.push({name: 'Email'})
                        // (res.data.user.roles[0].name === "teacher") ? this.$router.push({name: 'TeacherProfile'}) : this.$router.push({name: 'StudentProfile'});
                    })
                    .catch(err => {
                        console.log(err.response.data.errors[Object.keys(err.response.data.errors)[0][0]]);
                        this.errorMessage = err.response.data.errors[Object.keys(err.response.data.errors)[0]]
                    })
            },
            redirectUser(){
                this.$router.push({path: '/'});
            },

            onSignInSuccess (response) {
                FB.api('/me', dude => {
                console.log(dude);
                console.log(`Good to see you, ${dude.name}.`)
                this.redirectUser();
                })
            },
            onSignInError (error) {
                console.log('OH NOES', error)
            },
            ongSignInSuccess (googleUser) {
                // `googleUser` is the GoogleUser object that represents the just-signed-in user.
                // See https://developers.google.com/identity/sign-in/web/reference#users
                const profile = googleUser.getBasicProfile() // etc etc
                console.log(profile);
                this.redirectUser(); 
            },
            ongSignInError (error) {
                // `error` contains any error occurred.
                console.log('OH NOES', error)
            },
            signUpSubmit(){
                this.authLoading = true;
                this.redirectUser(); 
            }
        },
        computed: mapGetters(["authLoading"])
    }
</script>

<style scoped>
    .signup-form {
        margin: 0 auto;
        padding: 30px 0;
    }

    .signup-form h2 {
        color: #636363;
        margin: 0 0 15px;
        position: relative;
        text-align: center;
    }

    .signup-form h2:before, .signup-form h2:after {
        content: "";
        height: 2px;
        width: 30%;
        background: #d4d4d4;
        position: absolute;
        top: 50%;
        z-index: 2;
    }

    .signup-form h2:before {
        left: 0;
    }

    .signup-form h2:after {
        right: 0;
    }

    .signup-form .hint-text {
        color: #999;
        margin-bottom: 30px;
        text-align: center;
    }

    .signup-form {
        color: #999;
        border-radius: 3px;
        margin-bottom: 15px;
        background: #ffffff;
        box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
        padding: 30px;
    }

    .signup-form .form-group {
        margin-bottom: 20px;
    }

    .signup-form input[type="checkbox"] {
        margin-top: 3px;
    }

    .signup-form .btn {
        font-size: 16px;
        font-weight: bold;
        min-width: 140px;
        outline: none !important;
    }

    .signup-form .row div:first-child {
        padding-right: 10px;
    }

    .signup-form .row div:last-child {
        padding-left: 10px;
    }

    .signup-form a:hover {
        text-decoration: none;
    }


    .signup-form form a:hover {
        text-decoration: underline;
    }

    .btn-google {
        color: white;
        background-color: #ea4335
    }

    .btn-github {
        color: white;
        background: #4267B2;
    }

    .btn-github a {
        color: white;
    }

    .btn-google a {
        color: white;
    }
    .fb-signin-button {
      /* This is where you control how the button looks. Be creative! */
      display: inline-block;
      padding: 4px 8px;
      border-radius: 3px;
      background-color: #4267b2;
      color: #fff;
    }
</style>
