<template>
  <div id="footer">
    <div class="footer-content">
      <el-row style="padding-top: 1rem;">
        <el-col :md="8">
          <img class="app-header-logo"  src="/images/defaults/logo.png"/>
          <div>
            <i class="fa fa-phone"></i> +1 (234) 567 08 09
          </div>
          <div>
            <i class="fa fa-envelope"></i> <a href="#">communications@instantavite.ca</a>
          </div>
          <div>
            <i class="fa fa-phone"></i> GC47+R2 Ville-Marie, Montréal, QC, Canada
          </div>
        </el-col>
        <el-col :md="6" :offset="2">
          <h5>Usefull links</h5>
          <ul>
            <!--<li><a href="#">Nous joindre</a></li>-->
            <li><a href="/#/terme-condition">Termes et Conditions</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </el-col>
        <el-col :md="6" :offset="2">
          <h5>Payments</h5>
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
