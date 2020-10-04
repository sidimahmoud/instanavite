<template>
    <div class="profile-page">  
        <el-row>
            <el-col :md="5">
                <div class="profile-card">
                    <img src="http://demo.geekslabs.com/materialize/v2.1/layout03/images/avatar.jpg"  alt="John" style="width:100%">
                    <p><strong>Name:</strong> test user</p>
                    <p><strong>Delivery address:</strong> 65 allee nicolas carnot, Montreal, QC, Canada</p>
                    <!-- <div style="margin: 24px 0;">
                        <a href="#"><i class="fab fa-facebook-f"></i></a> 
                        <a href="#"><i class="fab fa-instagram"></i></a>  
                        <a href="#"><i class="fab fa-twitter"></i></a> 
                    </div> -->
                </div>
            </el-col>
            <el-button type="danger" @click="logout">{{$t('logout')}}</el-button>
            <el-col :md="15" :offset="1">
                <el-tabs v-model="activeTab">
                    <el-tab-pane :label="$t('orders_list')" name="progress">
                        <progress-orders></progress-orders>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('recus')" name="recus">
                        <orders-recips></orders-recips>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('personnel_settings')" name="personnel_settings">
                        personnel settings
                    </el-tab-pane>
                </el-tabs>
                </el-col>
        </el-row>
    </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
    /*
    |--------------------------------------------------------------------------
    | component > data
    |--------------------------------------------------------------------------
    */
    data() {
        return {
            activeTab: 'progress'
        }
    },
    /*
    |--------------------------------------------------------------------------
    | component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
        ...mapMutations('auth', ['destroyAccessToken','destroyUserData']),
        logout () {
            console.log('ici');
            this.destroyAccessToken();
            this.destroyUserData();
            //window.location.reload();
        },
    },
    /*
    |--------------------------------------------------------------------------
    | component > mounted
    |--------------------------------------------------------------------------
    */
    mounted () {
     
      const hasAccessToken = !window._.isNil(localStorage.getItem("app_access_token"));

      // If user has access token already, redirect to dashboard.
      if (!hasAccessToken) {
        this.$router.push({path: '/login'});
      }

     
    },
}
</script>
