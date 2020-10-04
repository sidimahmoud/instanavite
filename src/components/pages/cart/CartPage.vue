<template>
    <div class="cart-container">
        <div class="cart-products">
            <div class="table-product">
                <h5><strong>{{$t('selected_products')}}</strong></h5>
                <el-table
                    :data="cartData"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        :label="$t('item_name')">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        :label="$t('cout')">
                    </el-table-column>
                    <el-table-column
                        prop="quantity"
                        :label="$t('quantity')">
                    </el-table-column>
                    <el-table-column
                        prop="total"
                        :label="$t('total')">
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
            </div>
            <br/>
            <el-row v-if="cartTotal > 0">
                <el-col :md="6">
                    <h5><strong> {{$t('total_panier')}}</strong></h5>
                    <div class="total-box">
                        <table>
                            <tr>
                                <th>{{$t('sous_total')}}</th>
                                <td><strong>${{cartTotal}} </strong></td>
                            </tr>
                            <tr>
                                <th>{{$t('tps')}}</th>
                                <td><strong>$1.00</strong></td>
                            </tr>
                            <tr>
                                <th>{{$t('tvq')}}</th>
                                <td><strong>$1.00</strong></td>
                            </tr>
                            <tr>
                                <th>{{$t('frais_preparation')}}</th>
                                <td><strong>$1.00</strong></td>
                            </tr>
                            <tr>
                                <th>{{$t('frais_livraison')}}</th>
                                <td><strong>$1.00</strong></td>
                            </tr>
                            <tr v-if="!isEmpty(orderTips)">
                                <th>{{$t('pourboir')}}</th>
                                <td><strong>${{orderTips}}</strong></td>
                            </tr>
                            <tr>
                                <th>{{$t('total')}}</th>
                                <td><strong>${{cartAllTotal}}</strong></td>
                            </tr>
                        </table>
                    </div>
                </el-col>
                <el-col :md="14" :offset="1">
                    <h5><strong> {{$t('pourboir')}}</strong></h5>
                    <el-button @click="addTips(5)" round>5%</el-button>
                    <el-button @click="addTips(10)" round>10%</el-button>
                    <el-button @click="addTips(15)" round>15%</el-button>
                    <el-button @click="addTips(20)" round>20%</el-button>
                    <el-input placeholder="Write an amount" v-model="orderTips" style="width:20%;"></el-input>
                    <el-button>Thank you</el-button>
                </el-col>
            </el-row>
        </div>
        <div style="margin-top:1rem">
            <el-row>
                <el-col :md="11">
                    <div style="padding:1%;height:353px;background-color: #f8f8f8;">
                        <!-- <div class="cart-products"> -->
                            <h5><strong>{{$t('billing_details')}}</strong></h5>
                            <form>
                                <div class="el-input google-maps-address-field">
                                    <input type="text" v-bind:id="id"
                                        ref="google_address_autocomplete"
                                        v-model="address"
                                        class="el-input__inner"
                                        :placeholder="$t('address')"/>
                                </div>
                                    <el-input class="custom-cart" v-model="detail.post_code" :placeholder="$t('code_postal')"></el-input>
                                    <!-- <el-input class="custom-cart" v-model="detail.first_name" :placeholder="$t('last_name')"></el-input>
                                    <el-input class="custom-cart" v-model="detail.last_name" :placeholder="$t('name')"></el-input> -->
                                    <el-input class="custom-cart" v-model="detail.mobile" :placeholder="$t('phone')"></el-input>
                                    <el-input class="custom-cart" v-model="detail.email" :placeholder="$t('email')"></el-input>
                            </form>
                       <!--  </div> -->
                    </div>
                </el-col>
                <el-col :md="12" :offset="1">
                    <div class="cart-products">
                        <h5><strong>{{$t('payment_option')}}</strong></h5>
                        <div style="text-align:center">
                            <img src="/images/defaults/visa.png" height="60px"/>
                            <img src="/images/defaults/mastercard.png" height="60px"/>
                            <img src="/images/payment/03.png">
                        </div>
                        <!-- <el-form>
                            <div ref="card"></div>
                            <el-input class="custom-cart" placeholder="Cart Number" disabled></el-input>
                            <el-input class="custom-cart" placeholder="MM/YY" disabled></el-input>
                            <el-input class="custom-cart" placeholder="CVV" disabled></el-input>
                        </el-form> -->
                        <!-- Used to display Element errors. -->
                        <p class="text-jaune">Cart information</p>
                        <!-- <div id="card-errors" role="alert"></div>
                        <div class="cart-ref" ref="card"></div> -->
                        <stripe-elements
                            ref="elementsRef"
                            :pk="publishableKey"
                            :amount="cartAllTotal"
                            locale="en"
                            @token="tokenCreated"
                            @loading="loading = $event"
                        >
                        </stripe-elements>
                        <el-button class="cart-submit-button" type="primary" @click="createOrder">{{$t('complet_order')}}</el-button>

                        <br/><br/>{{$t('or_via')}}<br/><br/>
                        <!-- <PayPal
                            :amount="cartAllTotal"
                            currency="USD"
                            :client="credentials">
                        </PayPal> -->
                    </div>
                   
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import {mapMutations, mapGetters, mapActions} from "vuex";
import { Notification } from 'element-ui';
import {isEmpty} from "~/js/helpers/Common";
import PayPal from 'vue-paypal-checkout';
import { StripeElements } from 'vue-stripe-checkout';

/* let stripe = Stripe(`pk_live_51HB0HpHDyIu0bdYbv47CLk1imRIm5l8JwxVpg3uWGClstvnaVKQ8hPa4gnkqOIMZvOWTL7JOKIiNn2muThX3O9YA00EYiEVmHx`),
    elements = stripe.elements(),
    card = undefined; */

export default {
    name: "product-list",

    /*
    |--------------------------------------------------------------------------
    | Component > components
    |--------------------------------------------------------------------------
    */
    components: {
      PayPal,
      StripeElements
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
                address: '',
                post_code:''
            },
            id: "google_address_autocomplete",
            address: "",
            coordinates: "",
            credentials: {
                sandbox: 'sb-irwra2790525@business.example.com',
                production: 'AQd-XDPukcWgJQfqJPTfVvsTP6HsdZ1fcFzy0ceLLGKYaIZ_GjQDCPLng1OhJ6aKcV_h3Np2AbWHRyiX'
            },
            loading: false,
            publishableKey: 'pk_live_51HB0HpHDyIu0bdYbv47CLk1imRIm5l8JwxVpg3uWGClstvnaVKQ8hPa4gnkqOIMZvOWTL7JOKIiNn2muThX3O9YA00EYiEVmHx', 
            token: null,
            
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
            cartTotal:'cartTotal',
            cartAllTotal: 'cartAllTotal',
            orderTips: 'getTips'
        }),
        totalDispaly(){
            return parseFloat(this.cartTotal + 4).toFixed(2);
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
            setTips: 'setTips',
            clearCart: 'clearCart',
        }),
        ...mapActions('cart', {
            addOrder: 'createOrder'
        }),

        handleDelete(item){
            this.removeFromCart(item);
        },
        createOrder(){
            const _this = this;
            const hasAccessToken = !window._.isNil(localStorage.getItem("app_access_token"));
            //this.processPayment('token');
            if(hasAccessToken){
                this.$refs.elementsRef.submit();
            }else {
                this.$router.push({
                    name: "login-page",
                    params: {}
                });
            }
            /* stripe.createToken(card).then(function(result) {
                console.log(result.token);
                if (!isEmpty(result.token)) {
                    // Send the token to your server.
                    _this.processPayment(result.token);
                }else{
                    Notification({
                        title: 'Error',
                        message: 'Sorry we cannot validate payment cart.',
                        type: 'error'
                    });
                }
            }); */
        },
        processPayment(token) {
            // Insert the token ID into the form so it gets submitted to the server

            if(!isEmpty(this.coordinates)){
                let payload= {
                    language: "Français",
                    address: this.address,
                    client_id: 1,
                    town_id:1,
                    super_market_id: 1,
                    is_immediate: false,
                    instructions: "",
                    start_date: "2020-02-28 15:26:43",
                    manually_handled: false,
                    mobile: this.detail.mobile,
                    status_id: 1,
                    is_test: 1,
                    booker_name: this.detail.first_name,
                    amount: this.cartAllTotal,
                    products: this.cartData,
                    coordinates: this.coordinates,
                    stripeToken: token.id,
                }

                this.addOrder(payload).then((r) => {
                    if(!isEmpty(r)){
                        this.clearCart();
                    }
                })
            } else {
                Notification({
                    title: 'Error',
                    message: 'The address cannot be empty.',
                    type: 'warning'
                });
            }
        },

        getCoordinate(place) {
            return place.geometry.location.lat()+","+place.geometry.location.lng();
        },

        getPostalCode(place){
            let result = '';
            _.each(place.address_components, (v) => {
                if (
                    _.includes(v.types, 'postal_code')
                ) {
                    result = v.short_name;
                    return false; // Break the loop
                }
            });
            return result;
        },

        tokenCreated (token) {
            //this.loading = true
            this.token = token;
            this.processPayment(token)
        },
        isEmpty (v) {
            return isEmpty(v);
        },
        addTips(v) {
            let s = (this.cartTotal * v ) / 100;
            let formated = parseFloat(s).toFixed(2);
            this.setTips(formated);
        }
    },
    /*
    |--------------------------------------------------------------------------
    | Component > filters
    |--------------------------------------------------------------------------
    */
    filters: {
    },
    beforeCreate(){

    },
    /*
    |--------------------------------------------------------------------------
    | Component > mounted
    |--------------------------------------------------------------------------
    */
    mounted() {
        // Define the target element and instantiate it with google autocomplete.
        let input = document.getElementById(this.id);
        let autocomplete = new google.maps.places.Autocomplete(input, this.autocompleteOpts);

        // Add listener when a selection has been chosen or changed.
        autocomplete.addListener('place_changed', () => {
            console.log('event changed');
            console.log(autocomplete.getPlace());
            const result = autocomplete.getPlace().formatted_address;
            this.address =  result;
            let postcode = this.getPostalCode(autocomplete.getPlace());
            let coordinate= this.getCoordinate(autocomplete.getPlace());
            this.coordinates = coordinate;
            this.detail.post_code = postcode;
            console.log('coordinate');
            console.log(coordinate);
        });

        /* card = elements.create('card');
        card.mount(this.$refs.card); */

    },
}
</script>
<style scoped>
    .cart-ref {
      margin: 5%;
    }

</style>
