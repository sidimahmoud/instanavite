<template>
    <div class="app-page-top-bar">      
      <img class="app-header-logo" src="/images/defaults/logo.png"/>
      
      <el-select class="header-input-field" v-model="product" filterable placeholder="Cherchez un produit" remote
                :remote-method="searchItem" :loading="searchProduct" :no-data-text="emptyText">
          <span class="el-icon-search el-input__icon app-cursor-pointer fas fa-search search-icon"
              slot="suffix"></span>
          <el-option v-for="i in searchProductResult"
                      :key="i.id"
                      :label="i.name"
                      :value="i.id">
          </el-option>
      </el-select >
  
      <div class="app-header-action">
        <el-badge>
          <span class="icon-header"><i class="fas fa-user"></i></span>
        </el-badge> 
        <el-badge :value="cartCount" class="item" type="primary">
          <span class="icon-header-cart" @click="handleCart"><i class="fas fa-cart-plus"></i></span>
        </el-badge>
        <span class="app-info"><strong>Livraison tous les jours de 7h à 23h - GATINEAU</strong></span>
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
        blockClass: 'top-bar-extras',
        searchProduct: false,
        searchProductResult:[],
        emptyText: 'Vous ne trouvez pas (le mot que l\'usager a écrit)? Appelez nous au 125-542-5524 et nous vous livrerons ce produit au prix du commerce.'
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
      },
      searchItem(){
        axios.get(`https://api.instantavite.com/api/products?filter[name]=product`)
        .then( (result) => {
          this.searchProductResult = result.data.data
          console.log(result);
        });
      }
    }
  };
</script>
