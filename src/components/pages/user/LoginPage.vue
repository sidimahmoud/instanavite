<template>
  <div class="login-page">
      <div class="wrap-login p-t-30 p-b-50">
              <span class="login100-form-title p-b-41">
               Account Login
             </span>
             <el-form class="login-form" id="login_form" :model="form" ref="login_form" :rules="rules"
                      @keyup.enter.native="handleFormSubmit">

               <!-- Email -->
               <el-form-item label="Email"
                             class="el-form-item label-short"
                             prop="email">
                 <el-input id="login_email"
                           v-model="form.email"
                           placeholder="your@email.com"/>
               </el-form-item>

               <!-- Password -->
               <el-form-item label="Password"
                             class="el-form-item label-short"
                             prop="password">
                 <el-input id="login_password" v-model="form.password" type="password"
                           placeholder="*******"/>
               </el-form-item>

               <!-- Remember Me -->
               <!--<el-form-item class="el-form-item" label>
                 <el-checkbox id="login_remember" v-model="form.remember">
                   <span>Remember Me</span>
                 </el-checkbox>
               </el-form-item>-->

               <!-- Submit Button -->
               <el-form-item class="el-form-item">
                 <el-button id="login_submit_btn"
                            type="primary"
                            icon="el-icon-fa fa-sign-in"
                            @click="handleFormSubmit">
                   Log In
                 </el-button>
               </el-form-item>

             </el-form> <!-- /#login_form -->
           </div> <!-- /.form-container -->

  </div> <!-- /.login-page -->
</template>

<script>
  import {mapMutations, mapActions} from "vuex";
  export default {
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
      ...mapActions('auth', ['requestAccessToken']),
      ...mapMutations('auth', ['initAccessToken', 'destroyAccessToken']),
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
            window.location.reload();
          }

        }).catch((e) => {
          this.$notify.error({
            title: 'Unable to login',
            message: window._.isNil(e.response) ? 'Email or password is incorrect' : e.response.data.message,
          });
        });

      }, // End of handleFormSubmit() method


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
        this.$router.push({name: 'starting-point'});
      }

    }, // End of component > mounted

  } // End of export default
</script>
