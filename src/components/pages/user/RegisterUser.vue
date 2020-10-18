<template>
    <div style="margin-top:5%" id="bodyRegister">
        <div class="container">
            <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="logo-app"><img class="app-header-logo" src="/images/defaults/larger.png" @click="handleHome"/></div><br/>
                    <div class="signup-form bg-white">
                        <form @submit.prevent="signUpSubmit">
                            <h2>{{$t('sign_up')}}</h2>
                            <p class="hint-text">{{$t('create_msg')}}</p>
                            
                            <div class="form-group">
                                <div class="row">
                                    <div class="col">
                                        <input type="text" class="form-control" name="first_name"
                                               placeholder="First Name" required="required" v-model="form.name">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" name="last_name" placeholder="Last Name"
                                               required="required" v-model="form.last_name">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control" name="email" placeholder="Email"
                                       required="required" v-model="form.email">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" name="password" placeholder="Password"
                                       required="required" v-model="form.password">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" name="confirm_password"
                                       placeholder="Confirm Password" required="required" v-model="form.password2">
                            </div>
                            <div class="form-group">
                                <label class="form-check-label">
                                    <input type="checkbox" required="required">
                                    I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a>
                                </label>
                            </div>
                            <div class="alert alert-danger alert-dismissible fade show" role="alert"
                                v-if="errorStatus">
                                {{errorMessage}}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-lg btn-block">
                                    <span v-if="!authLoading" @click="signUpSubmit">Sign up </span>
                                    <div class="text-center text-white" v-if="authLoading">
                                        <span class="spinner-border spinner-border-sm" role="status"
                                            aria-hidden="true">

                                        </span>
                                            Loading...
                                    </div>
                                </button>
                            </div>

                        </form>
                        
                        <div class="text-center">{{$t('already_have_account')}}
                            <router-link :to="{name: 'login-page'}">{{$t('sign_in')}}</router-link>
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
                            <i class="fab fa-google"></i> {{$t('sign_in_with_google')}}
                        </g-signin-button>
                        <fb-signin-button
                            class="btn btn-lg btn-github  btn-block text-uppercase"
                            :params="fbSignInParams"
                            @success="onSignInSuccess"
                            @error="onSignInError">
                            <i class="fab fa-facebook"></i> {{$t('sign_in_with_facebook')}}
                        </fb-signin-button>
                    </div>
                </div>
            </div>
        </div>
        <social-media-confirm :visible.sync="showModal" :user="socialUser"></social-media-confirm>
    </div>


</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Register",

        data() {
            return {
                form:{
                    name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    password2: '',
                    type: 1,
                },
                fbSignInParams: {
                    scope: 'email',
                    return_scopes: true
                },
                googleSignInParams: {
                    client_id: '562139948414-sgs3p6c198oc9o4c65mse9l17c6t524h.apps.googleusercontent.com'
                },
                authLoading: false,
                errorStatus: false,
                errorMessage: '',
                showModal: false,
                socialUser: {
                    email: '',
                    name: ''
                }
            }
        },
        methods: {
            ...mapActions('user', {
                addUser: 'createUser',
            }),
            redirectUser(){
                this.$router.push({path: '/'});
            },

            onSignInSuccess (response) {
                const _this = this;

                FB.api('/me?fields=email,name', dude => {
                    let payload = {
                        'name': dude.name,
                        'email': dude.email
                    };
                    _this.handleSocial(payload);
                })

            },
            onSignInError (error) {
                console.log('OH NOES', error)
            },
            ongSignInSuccess (googleUser) {
                // `googleUser` is the GoogleUser object that represents the just-signed-in user.
                // See https://developers.google.com/identity/sign-in/web/reference#users
                const profile = googleUser.getBasicProfile() // etc etc
                let payload = {
                    'name': profile['Ad'],
                    'email': profile['Wt']
                };
                this.handleSocial(payload);
            },
            ongSignInError (error) {
                // `error` contains any error occurred.
                console.log('OH NOES', error)
            },
            createSocialUser(data){
                let payload = {
                    name: data.name,
                    last_name: data.last_name,
                    email: data.email,
                    password: data.name,
                    type: 1,
                }

                this.addUser(payload)
                .then((r) => {
                    if(r != "error"){
                        this.$router.push({path: '/login'});
                    }else{
                        this.authLoading = false;
                        this.errorStatus = true;
                        this.errorMessage = "Cannot Create User."
                    }
                })
            },
            signUpSubmit(){
                this.authLoading = true;
                if(this.verifyPassword()){
                    this.addUser(this.form)
                    .then((r) => {
                        if(r != "error"){
                            this.$router.push({path: '/login'});
                        }else{
                            this.authLoading = false;
                            this.errorStatus = true;
                            this.errorMessage = "Cannot Create User."
                        }
                    })
                } else{
                    this.authLoading = false;
                    this.errorStatus = true;
                    this.errorMessage = "The password does not conform."
                }
                
            },
            handleHome(){
                this.$router.push({
                name: "products-list",
                params: {}
                });
            },
            verifyPassword(){
                return this.form.password == this.form.password2 ? true : false;
            },
            handleSocial(user){
                this.socialUser = {
                    'name': user.name,
                    'email': user.email
                };
                this.showModal = true
            }
        },
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
    .logo-app {
      text-align: center;
      align-content: center;
    }
    .error-login{
      color: red;
    }
</style>
