<template>
    <el-table
        :data="listData"
        style="width: 100%">
        <el-table-column
            prop="created_at"
            label="Date"
            width="180">
        </el-table-column>
        <el-table-column
            prop="amount"
            label="Amount"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="Address">
        </el-table-column>
        <el-table-column
            label="Actions">
            <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="handleShow(scope.row)">{{$t('view_order_progress')}}</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import {mapMutations, mapActions, mapGetters} from "vuex";
import {isEmpty} from "~/js/helpers/Common";

export default {
    /*
    |--------------------------------------------------------------------------
    | Component > data
    |--------------------------------------------------------------------------
    */
    data() {
        return {
        }
    },
    /*
    |--------------------------------------------------------------------------
    | Component > computed
    |--------------------------------------------------------------------------
    */
    computed: {
        ...mapGetters('user', {
            listData: 'progressOrders',
        }),
        ...mapGetters('auth', {
            userData: 'userData',
        }),
        
    },
    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
        ...mapActions('user', {
            loadList: 'fetchProgressOrders',
        }),

        fetchData() {
            let params = {
                id: this.userData.id
            }

            this.loadList(params);
        },
        handleShow(row){
            this.$router.push({
                name: "order-details-page",
                params: {id: row.id}
            });
            
        }
    },
    /*
    |--------------------------------------------------------------------------
    | Component > mountes
    |--------------------------------------------------------------------------
    */
    mounted() {
      const hasAccessToken = !window._.isNil(localStorage.getItem("app_access_token"));

      // If user has access token already, redirect to dashboard.
      if (!hasAccessToken) {
        this.fetchData();
      }
       
    }
}
</script>
