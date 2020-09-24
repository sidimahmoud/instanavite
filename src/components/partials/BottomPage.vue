<template>
  <div id="footer">
    <div class="footer-content">
      <el-row style="padding-top: 1rem;">
        <el-col :md="8">
          <img class="app-header-logo"  src="/images/defaults/logo.png"/>
          <div>
            <i class="fa fa-phone"></i> {{$t('phone_number')}}
          </div>
          <div>
            <i class="fa fa-envelope"></i> <a href="#">communications@instantavite.ca</a>
          </div>
        </el-col>
        <el-col :md="6" :offset="2">
          <h5>{{$t('usefull_links')}}</h5>
          <ul>
            <!--<li><a href="#">Nous joindre</a></li>-->
            <li><a href="/#/terme-condition">{{$t('termes_and_conditions')}}</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">{{$t('become_courier')}}</a></li>
          </ul>
        </el-col>
        <el-col :md="6" :offset="2">
          <h5>{{$t('payments')}}</h5>
          <img src="/images/defaults/visa.png" height="60px"/>
          <img src="/images/defaults/mastercard.png"  height="60px"/>
          <img src="/images/payment/03.png">
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {

    /*
    |--------------------------------------------------------------------------
    | Component > data
    |--------------------------------------------------------------------------
    */
    data () {
      return {
        product: ''
      };
    },

    /*
    |--------------------------------------------------------------------------
    | Component > computed
    |--------------------------------------------------------------------------
    */
    computed: {
    },

    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
    }
  };
</script>
