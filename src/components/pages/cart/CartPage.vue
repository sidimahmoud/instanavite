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
            </div>
        </div>
        <div style="margin-top:1rem">
            <el-row>
                <el-col :md="11">
                    <div class="cart-products">
                        <h5><strong>BILLING DETAILS</strong></h5>
                        <el-form>
                            <el-form-item>
                                <el-input placeholder="First name"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="Last name"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="Phone"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="email"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="address"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="Postcode"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :md="12" :offset="1">
                    <div class="cart-products">
                        <h5><strong>PAYMENT OPTIONS</strong></h5>
                        <div style="text-align:center">
                            <img src="/images/defaults/paypal.png" height="35px" width="70px"/>
                            <img src="/images/defaults/cart.png" height="35px" width="70px"/>
                            <img src="/images/defaults/cart.png" height="35px" width="70px"/>
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
                        <el-button type="primary">Complete Order</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import {mapMutations, mapGetters} from "vuex";
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
            
        }
    },
    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
        ...mapMutations('cart', {
            removeFromCart: 'removeFromCart',
        }),
        handleDelete(item){
            this.removeFromCart(item);
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
        }),
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