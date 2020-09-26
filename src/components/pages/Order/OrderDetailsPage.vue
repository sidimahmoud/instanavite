<template>
    <div class="order-detail-page">
        <div class="order-container">
            <div class="order-details-header">
                <el-row>
                    <el-col :md="4" >
                        <h5>N° DE COMMANDE</h5>
                        <span class="text-jaune"><strong>{{order.id}}</strong></span>
                    </el-col>
                    <el-col :md="6" :offset="1">
                        <h5>COMMANDE EFFECTUÉE LE</h5>
                        <span class="text-jaune"><strong>{{order.created_at}}</strong></span>
                    </el-col>
                    <el-col :md="4" :offset="1">
                        <h5>TOTAL</h5>
                        <span class="text-jaune"><strong>${{order.amount}}</strong></span>
                    </el-col>
                    <el-col :md="4" :offset="1">
                        <h5>LIVRAISON À</h5>
                        <span class="text-jaune"><strong>{{order.address}}</strong></span>
                    </el-col>
                    
                </el-row>
            </div>

            <div class="order-steps">
                <h5>Order Status</h5>
                <el-steps class="stpes" :active="order.status_id" finish-status="success" simple style="margin-top: 20px">
                    <el-step title="Pending" icon="el-icon-edit"></el-step>
                    <el-step title="Assigned" icon="el-icon-upload"></el-step>
                    <el-step title="PickedUp" icon="el-icon-picture"></el-step>
                    <el-step title="On the way" icon="el-icon-upload"></el-step>
                    <el-step title="Delivered" icon="el-icon-picture"></el-step>
                </el-steps>
            </div>

            <div class="order-products">
                <h5>Order Products</h5>
                <el-row v-for="pro in order.products" v-bind:key="pro.id">
                    <el-col :md="4" ><img :src="pro.product.image" alt="Img" class="product-grid__img" /></el-col>
                    <el-col :md="6">
                        <span class="text-blue">{{pro.product.name}}</span><br/>
                        <span>{{$t('quantity')}}: {{pro.quantity}}</span><br/>
                        <span class="text-jaune">${{pro.product.price}}</span>
                    </el-col>
                </el-row>
            </div>
        </div>
        
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