<template>
    <div class="app-page-top-bar-extra">
        <div class="top-menu">
          <nav class="menu">
            <ul>
                <li><span @click="handleCategories"><i class="fa fa-bars"></i>    BROWSE CATEGORIES</span></li>
                <li><span @click="handleCategories">AUTRES PRODUITS</span></li>
                <li><span @click="handleOthers">COMMANDE TELEPHONIQUE</span></li>
                <li><span @click="handleAbout">ABOUT US</span></li>
                <li><span @click="handleCategories">CONTACT</span></li>

                <li class="last-number"><i class="fas fa-phone-alt icon-li"></i>  123-456-789 </li>
            </ul>
          </nav>

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
      handleAbout(){
        this.$router.push({
          name: "about-page",
          params: {}
        });
      },
      handleCategories(){
        this.$router.push({
          name: "products-list",
          params: {}
        });
    
      },
      handleOthers(){
        this.$router.push({
          name: "others-page",
          params: {}
        });
      }
    }
  };
</script>
