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
            label="Reçus">
            <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="handleShow(scope.row)">{{$t('display_reciept')}}</el-button>
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
        ...mapActions('order', {
            getReciept: 'recieptOrder',
        }),
        

        fetchData() {
            let params = {
                id: this.userData.id,
            }
            this.loadList(params);
        },
        handleShow(row){
            //this.getReciept();
            this.$router.push({
                name: "order-receipt-page",
                params: {id: row.id}
            });
            /* window.open("https://firebasestorage.googleapis.com/v0/b/instantavite-1ea10.appspot.com/reciept/document.pdf", "_blank"); */
        }
    },
    /*
    |--------------------------------------------------------------------------
    | Component > mountes
    |--------------------------------------------------------------------------
    */
    mounted() {
       this.fetchData();
    }
}
</script>
