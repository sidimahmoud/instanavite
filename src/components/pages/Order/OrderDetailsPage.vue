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

            <div class="order-steps" v-if="order.status_id < 4">
                <h5>Order Status</h5>
                <!-- <el-steps class="stpes" :active="order.status_id" finish-status="success" simple style="margin-top: 20px">
                    <el-step title="Pending">ici</el-step>
                    <el-step title="Assigned"></el-step>
                    <el-step title="PickedUp"></el-step>
                    <el-step title="On the way"></el-step>
                    <el-step title="Delivered"></el-step>
                </el-steps> -->
                <div class="stpes">
                    <ul class="list">
                        <li :class="`${order.status_id >=1 ? 'active': ''}`">
                            Pending
                        </li>
                        <!-- <li :class="`${order.status_id >=2 ? 'active': ''}`"><i class="fas fa-archive"></i>Assigned</li> -->
                        <li :class="`${order.status_id >=3 ? 'active': ''}`">PickedUp</li>
                        <li :class="`${order.status_id >=3 ? 'active': ''}`">On the way</li>
                        <li :class="`${order.status_id ==4 ? 'active': ''}`">Delivered</li>
                    </ul>
                </div>
            </div>
            <div class="order-steps" v-if="order.status_id == 4">
                <h5>Order Status</h5>
                <div class="rate-content">
                    <span class="text-green">The Order was delivered at {{order.completed_at}} thank you for your order.</span><br/><br/>
                    <span><strong>Rate {{order.driver.driver.name}}: <el-rate v-model="comment.rate"></el-rate></strong></span>   
                    <span>Comment the service of Mokhtar:</span>
                    <el-input 
                      placeholder="Comment"
                      v-model="comment.comment"
                      type="textarea"
                      :autosize="{ minRows: 5, maxRows: 6}"
                      maxlength="200"
                      show-word-limit>
                    </el-input><br/>

                    <el-button type="success" @click="rate">{{$t('send')}}</el-button>
                </div>
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
        return {
            comment:{
                comment:'',
                rate: 0
            }
        }
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
            rateOrder: 'rateOrder'
        }),

        fetchData() {
            let params = {
                id: this.$route.params.id
            }

            this.fetchOrder(params);
        },
        rate(){
            let payload = {
                order_id: this.order.id,
                from_client: true,
                from_driver: false,
                rate: this.comment.rate,
                message: this.comment.comment,
            }

            this.rateOrder(payload);
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