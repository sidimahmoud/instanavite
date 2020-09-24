<template>
    <div class="app-page-top-bar-extra">
        <div class="top-menu">
          <nav class="menu">
            <ul>
                <!--<li><span @click="handleCategories"><i class="fa fa-bars"></i>    BROWSE CATEGORIES</span></li>-->
                <li>
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      {{$t('our_partners')}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="handleCategories">{{$t('produits_sprotive')}}</el-dropdown-item>
                      <el-dropdown-item @click.native="handleCategories">{{$t('produits_elctronique')}}</el-dropdown-item>
                      <el-dropdown-item @click.native="handleCategories">{{$t('produits_mecanique')}}</el-dropdown-item>
                      <el-dropdown-item @click.native="handleCategories">{{$t('ready_to_eat')}}</el-dropdown-item>
                      <el-dropdown-item @click.native="handleCategories">{{$t('pharmacy_products')}}</el-dropdown-item>
                      <el-dropdown-item @click.native="handleCategories">{{$t('tools_and_hardware')}}</el-dropdown-item>
                      <el-dropdown-item @click.native="handleCategories">{{$t('pharmacy_products')}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
                <li><span @click="handleOthers">{{$t('special_orders')}}</span></li>
                <li><span @click="handleAbout">{{$t('about_us')}}</span></li>
                <li><span @click="handleContact">{{$t('contact_us')}}</span></li>
                
                <li class="last-number"><i class="fas fa-phone-alt icon-li"></i>{{$t('phone_number')}}</li>
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
          name: "partners-page",
          params: {}
        });
    
      },
      handleOthers(){
        this.$router.push({
          name: "others-page",
          params: {}
        });
      },
      handleContact(){
        this.$router.push({
          name: "contact-page",
          params: {}
        });
      },
    }
  };
</script>
