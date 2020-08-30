<template>
    <div class="app-page-top-bar">      
      <img class="app-header-logo" src="/images/defaults/logo.png" @click="handleHome"/>
      
      <el-input class="header-input-field" placeholder="Chercher un produit" v-model="product" @keyup.enter.native="browseProduct">
          <span class="el-icon-search el-input__icon app-cursor-pointer fas fa-search search-icon"
              slot="suffix" @click="browseProduct"></span>
      </el-input>
  
      <div class="app-header-action">
        <el-badge>
          <span class="icon-header" @click="handleAccount"><i class="fas fa-user"></i></span>
        </el-badge>
        <el-badge> 
          <span class="icon-header-cart" @click="handleChangeLanguage">{{language}}</span>
        </el-badge>
        <el-badge :value="cartCount" class="item" type="primary">
          <span class="icon-header-cart" @click="handleCart"><i class="fas fa-cart-plus"></i></span>
        </el-badge>
        <span class="app-info"><strong>Livraison dans la région de GATINEAU – Tous les jours de 7h à 23h</strong></span>
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
        language: 'FR',
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
      },
      browseProduct(){
        const _this = this;
        let query = {};
        
        query[`filter[name]`] = this.product;
        const path = '/products';
        
        this.$router.push({path, query}, () => {
          if (_this.$route.path === path)
            window.location.reload();
        });
      },
      handleAccount() {
        this.$router.push({
          name: "login-page",
          params: {}
        });
      },
      handleHome(){
        this.$router.push({
          name: "products-list",
          params: {}
        });
      },
      handleChangeLanguage(){
        if(this.language == 'FR'){
          this.language = 'EN'
        }else{
          this.language = 'FR'
        }
      }
     
    },
    /*
    |--------------------------------------------------------------------------
    | Component > mounted
    |--------------------------------------------------------------------------
    */
    mounted(){
      // Assign the query values stuff to the form ---
      const q = _.clone(this.$route.query);
      const filters = _.filter(Object.keys(q), (v) => _.includes(v, 'filter'));

      if (filters.length > 0) {
          _.each(filters, (x) => {
            this.product = q[x];
          });
      }
    }
  };
</script>
