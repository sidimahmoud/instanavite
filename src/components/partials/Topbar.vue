<template>
    <div class="app-page-top-bar">  
      <img class="app-header-logo" src="/images/defaults/small-logo.png" @click="handleHome"/>
      
      <el-input class="header-input-field" :placeholder="$t('search_product')" v-model="product" @keyup.enter.native="browseProduct">
        <span class="el-icon-search el-input__icon app-cursor-pointer fas fa-search search-icon" slot="suffix" @click.native="browseProduct"></span>
      </el-input>

      <div class="app-header-language">
        <el-badge>
          <span @click="handleChangeLanguage">{{languageLabel}}</span>
        </el-badge>
      </div>

      <div class="app-header-action">
        <div class="app-header-action-menu">
          <br/>
          <el-badge>
            <span class="icon-header" v-if="!isConnected" @click="handleAccount"><i class="fas fa-user"></i></span>
            <span class="icon-header" v-else @click="handleAccount">{{$t('hello')}}, Mokhtar</span>
          </el-badge>
          
          <el-badge :value="cartCount" class="item" type="primary">
            <span class="icon-header-cart" @click="handleCart"><i class="fas fa-cart-plus"></i></span>
          </el-badge>

          <!-- <el-badge> 
            <span class="app-info"><strong>{{$t('region_gatineau')}} </strong></span> <br/> <span class="app-info"><strong>{{$t('every_day')}}</strong></span>
          </el-badge> -->

        </div>
      </div> 
    </div> <!-- /.app-page-top-bar -->
</template>

<script>
  import {mapGetters,mapState, mapMutations, mapActions} from "vuex";
  
  export default {
    /*
    |--------------------------------------------------------------------------
    | Component > components
    |--------------------------------------------------------------------------
    */
    components: {
    },
    /*
    |--------------------------------------------------------------------------
    | Component > data
    |--------------------------------------------------------------------------
    */
    data () {
      return {
        product: '',
        languageLabel: 'EN',
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
      ...mapState('ui', ['language']),
      ...mapGetters('cart', {
        cartCount: 'cartCount',
      }),
      iLanguage: {
        get () {
          return this.language
        },
        set (v) {
          this.saveLanguage(v);
        }
      },
      isConnected(){
        const hasAccessToken = !window._.isNil(localStorage.getItem("app_access_token"));

        return hasAccessToken ? true : false;
      }
    },

    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
      ...mapMutations({
        saveLanguage: 'ui/saveLanguage',
      }),
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
        console.log("triggerd");
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
        const hasAccessToken = !window._.isNil(localStorage.getItem("app_access_token"));

        // If user has access token already, redirect to dashboard.
        if (hasAccessToken) {
          this.$router.push({
            name: "profile-page",
            params: {}
          });
        }else {
          this.$router.push({
            name: "login-page",
            params: {}
          });
        }
      },
      handleHome(){
        this.$router.push({
          name: "products-list",
          params: {}
        });
      },
      handleChangeLanguage(){
        if(this.languageLabel == 'EN'){
          this.languageLabel = 'FR'
          this.iLanguage = 'en'
        }else{
          this.languageLabel = 'EN'
          this.iLanguage = 'fr'
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
