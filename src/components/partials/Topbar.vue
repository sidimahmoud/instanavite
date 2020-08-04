<template>
    <div class="app-page-top-bar">
        <div  class="top-bar-img">
            
            <img src="/images/defaults/logo.png" height="50px" width="100px"/>
        
            <el-input class="header-input-field" v-model="product" placeholder="search">
                <span class="el-icon-search el-input__icon app-cursor-pointer fas fa-search search-icon"
                    slot="suffix"></span>
            </el-input>
        
            <el-badge>
             <span class="icon-header"><i class="fas fa-heart"></i></span> 
            </el-badge> 
            <el-badge :value="cartCount" class="item" type="primary">
              <span class="icon-header" @click="handleCart"><i class="fas fa-cart-plus"></i></span>
              
            </el-badge>
            <span style="margin-left: 1rem">Livraison tous les jours de 7h à 23h - <span class="text-red">Gatineau</span></span>   
        </div>

    </div> <!-- /.app-page-top-bar -->
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
        product: '',
        blockClass: 'top-bar-extras'
      };
    },

    /*
    |--------------------------------------------------------------------------
    | Component > computed
    |--------------------------------------------------------------------------
    */
    computed: {
      ...mapGetters('cart', {
        cartCount: 'cartCount',
      }),
    },

    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
      handleCart() {
        this.$router.push({
          name: "cart-page",
          params: {}
        });
      }
    }
  };
</script>
