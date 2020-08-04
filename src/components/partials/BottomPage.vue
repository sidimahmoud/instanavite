<template>
  <div id="footer">
    <div class="footer-content">
      <el-row style="padding-top: 1rem;">
        <el-col :md="7">
          <img src="/images/defaults/logo.png" height="60px" width="300px"/>
          <div>
            <i class="fa fa-phone"></i> +1 (234) 567 08 09
          </div>
          <div>
            <i class="fa fa-envelope"></i> intantavite@gmail.com
          </div>
          <div>
            <i class="fa fa-phone"></i> GC47+R2 Ville-Marie, Montréal, QC, Canada
          </div>
        </el-col>
        <el-col :md="6" :offset="2">
          <h5>Usefull links</h5>
          <ul>
            <li><a href="#">Nous joindre</a></li>
            <li><a href="#">Terms et Conditions</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </el-col>
        <el-col :md="6" :offset="2">
          <h5>Payments</h5>
          <ul>
            
          </ul>
        </el-col>
        <el-col :md="3" :offset="2">
          
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
