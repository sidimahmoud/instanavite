<template>
    <div class="app-page-top-bar">  
      <img class="app-header-logo" src="/images/defaults/small.png" @click="handleHome"/>
      
      <el-input class="header-input-field" :placeholder="$t('search_product')" v-model="product" @keyup.enter.native="browseProduct">
          <el-button slot="append" @click="browseProduct"><i class="fas fa-search search-icon"></i></el-button>
      </el-input>
      

      <div class="app-header-language">
        <el-badge>
          <span @click="handleChangeLanguage">{{languageLabel}}</span>
        </el-badge>
      </div>

      <div class="app-header-action">
        <div class="app-header-action-menu">
          <br/>
          <el-dropdown v-if="isConnected">
            <span class="el-dropdown-link">
              {{$t('hello')}}, {{userData.name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  @click.native="handleAccount">{{$t('profile')}}</el-dropdown-item>
              <el-dropdown-item  @click.native="handleLogout" divided>{{$t('logout')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-badge>
            <span class="icon-header" v-if="!isConnected" @click="handleAccount"><i class="fas fa-user"></i></span>
            <span class="icon-header" v-else @click="handleAccount">{{$t('purchase_history')}}</span>
          </el-badge>
          
          <el-badge :value="cartCount" class="item" type="primary">
            <span class="icon-header-cart" @click="handleCart"><i class="fas fa-cart-plus"></i></span>
          </el-badge>
          
          <!-- <span v-if="isConnected">{{$t('hello')}}, {{userData.name}}</span> -->

          <!-- <el-badge v-if="isConnected">
            <span class="button-header" @click="handleLogout">{{$t('logout')}}</span>
          </el-badge> -->

        </div>
      </div> 
    </div> <!-- /.app-page-top-bar -->
</template>

<script>
  import {mapGetters,mapState, mapMutations, mapActions} from "vuex";
  import {isEmpty} from "~/js/helpers/Common";
  
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
      ...mapGetters('auth', {
        userData: 'userData',
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
      ...mapMutations('auth', ['destroyAccessToken','destroyUserData']),
      handleLogout () {
        const _this = this;
        this.destroyAccessToken();
        this.destroyUserData();
        const path = '/';

        this.$router.push({path: "/"}, () => {
            if (_this.$route.path === path)
              window.location.reload();
        });
      },
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
        if(!isEmpty(this.product)){
          query[`filter[name]`] = this.product;
          const path = '/products';
          
          this.$router.push({path, query}, () => {
            if (_this.$route.path === path)
              window.location.reload();
          });
        }
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
