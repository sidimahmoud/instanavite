<template>
    <div class="cart-container">
        <div class="cart-products">
            <h5><strong> SHOPPING ITEMS</strong></h5>
            <el-table
                :data="cartData"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="Name"
                    width="250">
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="Price"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="quantity"
                    label="Quantity"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="total"
                    label="total"
                    width="200">
                </el-table-column>
                <el-table-column
                    label="Action">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                        @click="handleDelete(scope.row)"><i class="fas fa-trash"></i></el-button>
                    </template>
                </el-table-column>
                
            </el-table>
            <div>
                <h5><strong> CART TOTALS</strong></h5>
                <div class="total-box">
                    <table>
                        <tr>
                            <th>Subtotal</th>
                            <td>${{cartTotal}} </td>
                        </tr>
                        <tr>
                            <th>Shipping costs</th>
                            <td>$20 </td>
                        </tr>
                        <tr>
                            <th>TPS</th>
                            <td>$5</td>
                        </tr>
                        <tr>
                            <th>TVQ</th>
                            <td>$5</td>
                        </tr>
                        <tr>
                            <th>SHIPPING FEES</th>
                            <td>$5</td>
                        </tr>
                        <tr>
                            <th>Order preparation fees</th>
                            <td>$5</td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <td>${{totalDispaly}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div style="margin-top:1rem">
            <el-row>
                <el-col :md="11">
                    <div class="cart-products">
                        <h5><strong>BILLING DETAILS</strong></h5>
                        <el-form>
                            <el-form-item>
                                <el-input v-model="detail.first_name" placeholder="First name"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="detail.last_name" placeholder="Last name"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="detail.mobile" placeholder="Mobile"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="detail.email" placeholder="email"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="detail.address" placeholder="address"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="detail.post_code" placeholder="Postcode"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :md="12" :offset="1">
                    <div class="cart-products">
                        <h5><strong>PAYMENT OPTIONS</strong></h5>
                        <div style="text-align:center">
                            <img src="/images/defaults/payments1.jpg"/>
                            <img src="/images/payment/03.png">
                        </div>
                        <el-form>
                            <el-form-item>
                                <el-input placeholder="Cart Number"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="MM/YY"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="CVV"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" @click="createOrder">Complete Order</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import {mapMutations, mapGetters, mapActions} from "vuex";
import { Notification } from 'element-ui';

export default {
    name: "product-list",
    props: {
    },
    /*
    |--------------------------------------------------------------------------
    | Component > data
    |--------------------------------------------------------------------------
    */
    data(){
        return {
            detail: {
                first_name: '',
                last_name: '',
                mobile: '',
                email:'',
                address: '65 Bremner Blvd, Toronto, ON M5J 0A7, Canada',
                post_code:''
            }
            
        }
    },
    /*
    |--------------------------------------------------------------------------
    | Component > computed
    |--------------------------------------------------------------------------
    */
    computed: {
        ...mapGetters('cart', {
            cartData: 'cartData',
            cartTotal:'cartTotal'
        }),
        totalDispaly(){
            let somme = this.cartTotal + 40;
            return somme.toFixed(2);
        }
    },
    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
        ...mapMutations('cart', {
            removeFromCart: 'removeFromCart'
        }),
        ...mapActions('cart', {
            addOrder: 'createOrder'
        }),
        handleDelete(item){
            this.removeFromCart(item);
        },
        createOrder(){
            let payload= {
                language: "Français",
                address: this.detail.address,
                client_id: 1,
                super_market_id: 1,
                is_immediate: false,
                instructions: "",
                start_date: "2020-02-28 15:26:43",
                manually_handled: false,
                mobile: null,
                status_id: 1,
                is_test: 1,
                booker_name: this.detail.first_name,
                amount: this.cartTotal + 20, // cart total + delivery fee
                products: this.cartData
            }
            this.addOrder(payload).then(()=>{
                Notification({
                    title: 'Success',
                    message: 'Thank you for your order we will deliver soon.',
                    type: 'success'
                });
            });
        }
        
    },
    /*
    |--------------------------------------------------------------------------
    | Component > filters
    |--------------------------------------------------------------------------
    */
    filters: {
    },
    /*
    |--------------------------------------------------------------------------
    | Component > mounted
    |--------------------------------------------------------------------------
    */
    mounted() {
    },
}
</script>