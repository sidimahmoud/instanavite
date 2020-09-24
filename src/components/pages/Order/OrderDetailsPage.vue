<template>
    <div class="order-detail-page">
        <div>
            <h4>Order Progress</h4>

        </div>
        <el-steps :active="order.status_id">
            <el-step title="Pending" icon="el-icon-edit"></el-step>
            <el-step title="Assigned" icon="el-icon-upload"></el-step>
            <el-step title="PickedUp" icon="el-icon-picture"></el-step>
            <el-step title="On the way" icon="el-icon-upload"></el-step>
            <el-step title="Delivered" icon="el-icon-picture"></el-step>
        </el-steps>
    </div>
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
        return {}
    },
    /*
    |--------------------------------------------------------------------------
    | Component > computed
    |--------------------------------------------------------------------------
    */
    computed: {
        ...mapGetters('order', {
            order: 'itemData',
        }),
    },
    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
        ...mapActions('order', {
            fetchOrder: 'fetchOrder',
        }),

        fetchData() {
            let params = {
                id: this.$route.params.id
            }

            this.fetchOrder(params);
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