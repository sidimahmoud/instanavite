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
                        :label="$t('quantity')">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                            @click="handleRemoveQuantity(scope.row)"><i class="fas fa-minus"></i></el-button>
                            <span>{{scope.row.quantity}}</span>
                            <el-button
                                size="mini"
                            @click="handleAddQuantity(scope.row)"><i class="fas fa-plus"></i></el-button>
                        </template>
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
            <div v-if="!isConnected && cartTotal > 0">
                
                <div class="total-box">
                    <table>
                        <tr>
                            <th>
                                <h5>
                                    <strong> {{$t('sous_total')}}</strong>
                                </h5>
                            </th>
                            <td><strong>${{cartTotal}} </strong></td>
                        </tr>
                    </table>
                </div>
                <div class="procees-div-checkout">
                    <el-button type="primary" class="procees-button" @click="onProceesCheckout">{{$t('proceed_checkout')}}</el-button>
                </div>
            </div>
            <br/>
            <el-row v-if="isConnected && cartTotal > 0">
                <el-col :md="5">
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
                                <td><strong>${{preperation}}</strong></td>
                            </tr>
                            <tr>
                                <th>{{$t('frais_livraison')}}</th>
                                <td><strong>${{livraison}}</strong></td>
                            </tr>
                            <tr v-if="!isEmpty(orderTips)">
                                <th>{{$t('pourboir')}}</th>
                                <td><strong>${{orderTips}}</strong></td>
                            </tr>
                            <tr>
                                <th>{{$t('total')}}</th>
                                <td><strong>${{totalAmount}}</strong></td>
                            </tr>
                        </table>
                    </div>
                </el-col>
                <el-col :md="19">
                    <div class="pour-boir-section">
                        <h5><strong> {{$t('pourboir')}}</strong></h5>
                        <el-button @click="addTips(5)" round>5%</el-button>
                        <el-button @click="addTips(10)" round>10%</el-button>
                        <el-button @click="addTips(15)" round>15%</el-button>
                        <el-button @click="addTips(20)" round>20%</el-button>
                        Saisir un montant: <el-input placeholder="Write an amount" v-model="tips_montant" class="amout-field" @change="addTipshard"></el-input>
                        <el-button @click="removeTips">Thank you</el-button><br/><br/>

                        <span><strong>{{$t('note_to_driver')}}</strong></span>
                        <el-input 
                        placeholder="Note"
                        v-model="detail.note"
                        type="textarea"
                        :autosize="{ minRows: 5, maxRows: 6}"
                        maxlength="200"
                        show-word-limit>
                        </el-input>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div style="margin-top:1rem" v-if="isConnected">
            <el-row>
                <el-col :md="11">
                    <div style="padding:1%;height:353px;background-color: #f8f8f8;">
                        <!-- <div class="cart-products"> -->
                            <h5><strong>{{$t('billing_details')}}</strong></h5>
                            <form>
                                <div class="el-input google-maps-address-field">
                                    <input type="text" v-bind:id="id"
                                        ref="google_address_autocomplete"
                                        v-model="iAddress"
                                        class="el-input__inner"
                                        :placeholder="$t('address')"/>
                                </div>
                                <!-- <el-input class="custom-cart" v-model="cartAddress" :placeholder="$t('address')" disabled></el-input> -->
                                <el-input class="custom-cart" v-model="cartPostal" :placeholder="$t('code_postal')" disabled></el-input>
                                <el-input class="custom-cart" v-model="detail.address_complement" :placeholder="$t('address_complement')"></el-input>
                                <el-input class="custom-cart" v-model="detail.mobile" :placeholder="$t('phone')"></el-input>
                                <el-input class="custom-cart" v-model="detail.email" :placeholder="$t('email')"></el-input>
                            </form>
                       <!--  </div> -->
                    </div>
                </el-col>
                <el-col :md="12">
                    <div class="cart-payment-section">
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
                            :amount="totalAmount"
                            locale="en"
                            @token="tokenCreated"
                            @loading="loading = $event"
                        >
                        </stripe-elements>
                        <el-button class="cart-submit-button" type="primary" @click="createOrder">{{$t('complet_order')}}</el-button>

                        <br/><br/>{{$t('or_via')}}<br/><br/>
                        <PayPal
                            :amount="cartAllTotal"
                            currency="USD"
                            :client="credentials">
                        </PayPal>
                    </div>
                   
                </el-col>
            </el-row>
        </div>
        <address-modal :visible.sync="showTodoForm"></address-modal>
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
                post_code:'',
                note: '',
                address_complement: ''
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
            showTodoForm: false,
            tips_montant: '',
            preperation: 0,
            livraison: 0,
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
            orderTips: 'getTips',
            cartAddress: 'cartAddress',
            cartPostal: 'cartPostal',
            cartCoordinates: 'cartCoordinates',
        }),
        ...mapGetters('auth', {
            userData: 'userData',
        }),
        totalDispaly(){
            return parseFloat(this.cartTotal + 4).toFixed(2);
        },
        isConnected(){
            const hasAccessToken = !window._.isNil(localStorage.getItem("app_access_token"));
            return hasAccessToken;
        },
        /**
         * Interface for the v-model of this component.
         */
        iAddress: {
            get () {
            return this.cartAddress;
            },
            set (v) {
                this.setAddress(v);
            },
        },
        /**
         * Interface for the v-model of this component.
         */
        iPostal: {
            get () {
            return this.cartPostal;
            },
            set (v) {
                this.setPostCode(v);
            },
        },
        iCoorinates: {
            get () {
            return this.cartCoordinates;
            },
            set (v) {
                this.setCartCoordinates(v);
            },
        },
        totalAmount(){
            return parseFloat(this.cartAllTotal);
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
            addQuantity: 'addQuantity',
            removeQuantity: 'removeQuantity',
            setAddress : 'setAddress',
            setPostCode: 'setPostCode',
            setCartCoordinates: 'setCartCoordinates',
        }),
        ...mapActions('cart', {
            addOrder: 'createOrder'
        }),

        handleDelete(item){
            this.removeFromCart(item);
            this.preperationAmount();
        },
        handleAddQuantity(item){
            this.addQuantity(item);
            this.preperationAmount();
        },
        handleRemoveQuantity(item){
            this.removeQuantity(item);
            this.preperationAmount();
        },
        createOrder(){
            const _this = this;
            const hasAccessToken = !window._.isNil(localStorage.getItem("app_access_token"));
            
            if(hasAccessToken){
                this.processPayment('token');
                //this.$refs.elementsRef.submit();
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
        inDeliveryErea(){
            return this.iPostal.startsWith('J8') || this.iPostal.startsWith('J9');
        },
        
        processPayment(token) {
            if(!isEmpty(this.iCoorinates) && this.inDeliveryErea){
                let payload= {
                    language: "Français",
                    address: this.iAddress,
                    client_id: this.userData.id,
                    town_id:1,
                    super_market_id: 1,
                    is_immediate: false,
                    instructions: this.detail.note,
                    start_date: "2020-02-28 15:26:43",
                    manually_handled: false,
                    mobile: this.detail.mobile,
                    status_id: 1,
                    is_test: 1,
                    booker_name: this.detail.first_name,
                    amount: this.cartAllTotal,
                    products: this.cartData,
                    coordinates: this.iCoorinates,
                    stripeToken: token.id,
                    post_code: this.iPostal,
                    address_complement: this.detail.address_complement
                }

                this.addOrder(payload).then((r) => {
                    if(!isEmpty(r)){
                        this.clearCart();
                        this.$router.push({
                            path: "/",
                        });
                    }
                })
            } else {
                Notification({
                    title: 'Error',
                    message: 'Unfortunetly for this moment we do not perfom delivry in this area.',
                    type: 'error'
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
            this.preperationAmount();
        },
        addTipshard() {
            this.setTips(this.tips_montant);
        },
        removeTips() {
            this.setTips(0);
            this.preperationAmount();
        },
        onProceesCheckout(){
            this.showTodoForm = true;
        },
        preperationAmount(){
            const _this = this;
            switch(true) {
                case (this.totalAmount < 10):
                    // code block
                    var total = (this.totalAmount * 150)/100;
                    _this.preperation = (total * 0.3).toFixed(2);
                    _this.livraison = (total * 0.7).toFixed(2);
                    break;
                case  (this.totalAmount < 20):
                    // code block
                    var total = (this.totalAmount * 60)/100;
                    _this.preperation = (total * 0.3).toFixed(2);
                    _this.livraison = (total * 0.7).toFixed(2);
                    break;
                case  (this.totalAmount < 30):
                    // code block
                    var total = (this.totalAmount * 50)/100;
                    _this.preperation = (total * 0.3).toFixed(2);
                    _this.livraison = (total * 0.7).toFixed(2);
                    break;
                case  (this.totalAmount < 40):
                    // code block
                    var total = (this.totalAmount * 50)/100;
                    _this.preperation = (total * 0.3).toFixed(2);
                    _this.livraison = (total * 0.7).toFixed(2);
                    break;
                case  (this.totalAmount < 60):
                    // code block
                    var total = (this.totalAmount * 25)/100;
                    _this.preperation = (total * 0.3).toFixed(2);
                    _this.livraison = (total * 0.7).toFixed(2);
                    break;
                case  (this.totalAmount < 80):
                    // code block
                    var total = (this.totalAmount * 20)/100;
                    _this.preperation = (total * 0.3).toFixed(2);
                    _this.livraison = (total * 0.7).toFixed(2);
                    break;
                case  (this.totalAmount < 100):
                    // code block
                    var total = (this.totalAmount * 18)/100;
                    _this.preperation = (total * 0.3).toFixed(2);
                    _this.livraison = (total * 0.7).toFixed(2);
                    break;
                case  (this.totalAmount < 130):
                    // code block
                    var total = (this.totalAmount * 15)/100;
                    _this.preperation = (total * 0.3).toFixed(2);
                    _this.livraison = (total * 0.7).toFixed(2);
                    break;
                case  (this.totalAmount < 170):
                    // code block
                    var total = (this.totalAmount * 12)/100;
                    _this.preperation = (total * 0.3).toFixed(2);
                    _this.livraison = (total * 0.7).toFixed(2);
                    break;
                case  (this.totalAmount < 220):
                    // code block
                    var total = (this.totalAmount * 10)/100;
                    _this.preperation = (total * 0.3).toFixed(2);
                    _this.livraison = (total * 0.7).toFixed(2);
                    break;
                case  (this.totalAmount > 220):
                    // code block
                    var total = (this.totalAmount * 10)/100;
                    _this.preperation = (total * 0.3).toFixed(2);
                    _this.livraison = (total * 0.7).toFixed(2);
                    break;
                default:
                    // silence is gold.
            }
        }
    },
    /*
    |--------------------------------------------------------------------------
    | Component > filters
    |--------------------------------------------------------------------------
    */
    filters: {},
    /*
    |--------------------------------------------------------------------------
    | Component > beforeCreate
    |--------------------------------------------------------------------------
    */
    beforeCreate(){},
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
            
            const result = autocomplete.getPlace().formatted_address;
            this.address =  result;
            let postcode = this.getPostalCode(autocomplete.getPlace());
            let coordinate= this.getCoordinate(autocomplete.getPlace());
            this.iCoorinates = coordinate;
            this.iAddress = result;
            this.iPostal = postcode;
        });
        this.preperationAmount();

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
