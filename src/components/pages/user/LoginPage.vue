<!--<template>
  <div class="login-view">
    <div class="wrap-login p-t-30 p-b-50">
      <img src="/images/defaults/logo.png"/>
      <el-form class="login-form" id="login_form" :model="form" ref="login_form" :rules="rules"
              @keyup.enter.native="handleFormSubmit">

        
        <el-form-item label="Email"
                      class="el-form-item label-short"
                      prop="email">
          <el-input id="login_email"
                    v-model="form.email"
                    placeholder="your@email.com"/>
        </el-form-item>

        
        <el-form-item label="Password"
                      class="el-form-item label-short"
                      prop="password">
          <el-input id="login_password" v-model="form.password" type="password"
                    placeholder="*******"/>
        </el-form-item>

        


     
        <el-form-item class="el-form-item">
          <el-button id="login_submit_btn"
                    type="primary"
                    class="login-button"
                    @click="handleFormSubmit">Se connecter</el-button>
        </el-form-item>

       
    </div> 
    <div>
      <el-divider>ou</el-divider>
      <div class="social-login">
        <div>
          <v-facebook-login app-id="261288108609958"></v-facebook-login><br/>
          <div id="google-signin-button" class="g-signin2" data-width="215" data-onsuccess="onSignIn" data-onfailure="onFailure"></div>
        </div>
      </div>
    </div>
  </div>
</template>-->
<template>
    <div style="margin-top:5%" class="container">
        <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="signup-form bg-white">
                    <form method="post" @submit.prevent="login">
                        <h2>{{$t('sign_in')}}</h2>
                        <p class="hint-text"></p>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="errorMessage">
                            <strong>Error!</strong> {{errorMessage}}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control" name="email" placeholder="Email"
                                   required="required" v-model="email">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" name="password" placeholder="Password"
                                   required="required" v-model="password">
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary btn-lg btn-block " >
                                <span @click="signIn">Sign in </span>
                                <div class="text-center text-white" v-if="authLoading">
                                    <span class="spinner-border spinner-border-sm" role="staitus" aria-hidden="true"/>
                                    Loading...
                                </div>
                            </button>
                        </div>
                    </form>
                    <div class="text-center">Don't have an account?
                        <router-link :to="{name: 'register-user-page'}">{{$t('sign_up')}}</router-link>
                    </div>
                    <h2>Or</h2>
                    <!-- <button class="btn btn-lg btn-google btn-block text-uppercase" @click="loginGoogle('google')">
                        <i class="fab fa-google"></i> Continue with Google
                    </button> -->
                    <!-- <button class="btn btn-lg btn-github  btn-block text-uppercase" @click="onLogin()">
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
</template>

<script>
  import VFacebookLogin from 'vue-facebook-login-component'
  import GoogleLogin from 'vue-google-login';
  import {mapMutations, mapActions} from "vuex";
  export default {

    /*
    |--------------------------------------------------------------------------
    | component > components
    |--------------------------------------------------------------------------
    */
    components: {
      GoogleLogin,
      VFacebookLogin
    },

    /*
    |--------------------------------------------------------------------------
    | component > data
    |--------------------------------------------------------------------------
    */
    data () {
      return {
        showVerify:false,
        verifyForm:{
          client_id: app_client_id,
          client_secret: app_client_secret,
          grant_type:'access_code',
          access_code: '',// code from previous step, we don't to show it to user
          verification_key: '' // 6-digits so it's good to have validation if easy.

        },
        form: {
          email: '',
          password: '',
          remember: false,
        },

        isFormFocused: false,

        rules: {
          email: [
            {required: true, message: 'Please input your email', trigger: 'blur'},
            {type: 'email', message: 'Please input correct email address', trigger: ['blur']}
          ],
          password: [
            {required: true, message: 'Please input your password', trigger: 'blur'},
          ],
        },


        /// Faceboook login
        isConnected: false,
        name: '',
        email: '',
        personalID: '',
        picture: '',
        FB: undefined,

        //google login

        // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
        params: {
          client_id: "792431621404-7390cbc2r1nmntn2djrbrrq9ijl2m8ag.apps.googleusercontent.com"
        },
        // only needed if you want to render the button with the google ui
        renderParams: {
          width: 250,
          height: 50,
          longtitle: true
        },
        
        password: '',
        errorMessage: '',
        fbSignInParams: {
          scope: 'email,user_likes',
          return_scopes: true
        },
        googleSignInParams: {
          client_id: '562139948414-sgs3p6c198oc9o4c65mse9l17c6t524h.apps.googleusercontent.com'
        },
        authLoading: false

      };
    }, // End of component > data

    /*
    |--------------------------------------------------------------------------
    | component > computed
    |--------------------------------------------------------------------------
    */
    computed: {}, // End of component > computed

    /*
    |--------------------------------------------------------------------------
    | component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
      ...mapActions('auth', ['requestAccessToken','socialStudentAuth']),
      ...mapMutations('auth', ['initAccessToken', 'destroyAccessToken','setAccessToken']),
      /**
       * Handle when the Log In form was submitted.
       *
       * @return {boolean}
       */
      handleFormSubmit () {

        // Prepare payload data to be sent to API.
        let data = {
          grant_type: 'password',
          username: this.form.email,
          password: this.form.password,
          client_id: app_client_id,
          client_secret: app_client_secret,
          scope:'*'
        };
        console.log(data);

        // Clear old token
        this.destroyAccessToken();

        // Request freshly baked token from the oven!
        this.requestAccessToken({data}).then((r) => {
          if( r.data.token_type!=='Bearer'){
            this.$notify.error({
              title: 'Unable to login',
              message: window._.isNil(r.response) ? 'Email or password is incorrect' : r.data.message,
            });
          }
          else {
            this.$router.push({
              path: "/",
            });
          }

        }).catch((e) => {
          this.$notify.error({
            title: 'Unable to login',
            message: window._.isNil(e.response) ? 'Email or password is incorrect' : e.response.data.message,
          });
        });

      }, // End of handleFormSubmit() method

      //facebook login
      getUserData() {
        this.FB.api('/me', 'GET', { fields: 'id,name,email,picture' },
          user => {
            this.personalID = user.id;
            this.email = user.email;
            this.name = user.name;
            this.picture = user.picture.data.url;
          }
        )
        
      },
      onLogout() {
        this.isConnected = false;
      },
      redirectUser(){
        this.$router.push({path: '/'});
      },

      onSignInSuccess (response) {
        FB.api('/me', dude => {
          console.log(dude);
          console.log(`Good to see you, ${dude.name}.`)
          this.setAccessToken('token test')
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
        this.setAccessToken('token test')
        this.redirectUser(); 
      },
      ongSignInError (error) {
        // `error` contains any error occurred.
        console.log('OH NOES', error)
      },
      signIn(){
        this.authLoading = true;
        this.setAccessToken('token test')
        this.redirectUser();
      }

    }, // End of component > methods

    /*
    |--------------------------------------------------------------------------
    | component > mounted
    |--------------------------------------------------------------------------
    */
    mounted () {
     
      const hasAccessToken = !window._.isNil(localStorage.getItem("app_access_token"));

      // If user has access token already, redirect to dashboard.
      if (hasAccessToken) {
        console.log('There is a token already! Redirecting to Dashboard.');
        this.$router.push({path: '/'});
      }

     
    }, // End of component > mounted

  } // End of export default
</script>

<style scoped>
    .social-login {
      align-content: center !important;
      text-align: center !important;
      display: inline-block !important;
    }

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