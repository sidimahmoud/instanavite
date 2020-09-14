<template>
    <div class="cart-container">
        <div class="cart-products">
            <div class="table-product">
                <h5><strong>PRODUITS SÉLECTIONÉS</strong></h5>
                <el-table
                    :data="cartData"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="Name">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="Price">
                    </el-table-column>
                    <el-table-column
                        prop="quantity"
                        label="Quantity">
                    </el-table-column>
                    <el-table-column
                        prop="total"
                        label="total">
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
            <div v-if="cartTotal > 0">
                <h5><strong> CART TOTALS</strong></h5>
                <div class="total-box">
                    <table>
                        <tr>
                            <th>Subtotal</th>
                            <td><strong>${{cartTotal}} </strong></td>
                        </tr>
                        <tr>
                            <th>TPS</th>
                            <td><strong>$5.00</strong></td>
                        </tr>
                        <tr>
                            <th>TVQ</th>
                            <td><strong>$5.00</strong></td>
                        </tr>
                        <tr>
                            <th>Shipping fees</th>
                            <td><strong>$5.00</strong></td>
                        </tr>
                        <tr>
                            <th>Order preparation fees</th>
                            <td><strong>$5.00</strong></td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <td><strong>${{totalDispaly}}</strong></td>
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
                            <div class="el-input google-maps-address-field">
                                <el-form-item>
                                    <input type="text" v-bind:id="id"
                                        ref="google_address_autocomplete"
                                        v-model="address"
                                        class="el-input__inner"
                                        placeholder="Address"/>
                                </el-form-item>
                            </div>
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
                                    <el-input v-model="detail.post_code" placeholder="Zipcode"></el-input>
                                </el-form-item>
                            
                        </el-form>
                    </div>
                </el-col>
                <el-col :md="12" :offset="1">
                    <div class="cart-products">
                        <h5><strong>PAYMENT OPTIONS</strong></h5>
                        <div style="text-align:center">
                            <img src="/images/defaults/visa.png" height="60px"/>
                            <img src="/images/defaults/mastercard.png" height="60px"/>
                            <img src="/images/payment/03.png">
                        </div>
                        <el-form>
                            <el-form-item>
                                <el-input placeholder="Cart Number" disabled></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="MM/YY" disabled></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="CVV" disabled></el-input>
                            </el-form-item>
                        </el-form>
                        <div ref="card"></div>
                        <el-button type="primary" @click="createOrder">Complete Order</el-button>

                        <br/><br/>Or via<br/><br/>
                        <PayPal
                            amount="10.00"
                            currency="USD"
                            :client="credentials"
                            env="sandbox">
                        </PayPal>
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

/*let stripe = Stripe(`YOUR_STRIPE_PUBLISHABLE_KEY`),
    elements = stripe.elements(),
    card = undefined;*/

export default {
    name: "product-list",

    /*
    |--------------------------------------------------------------------------
    | Component > components
    |--------------------------------------------------------------------------
    */
    components: {
      PayPal
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
                sandbox: 'AQd-XDPukcWgJQfqJPTfVvsTP6HsdZ1fcFzy0ceLLGKYaIZ_GjQDCPLng1OhJ6aKcV_h3Np2AbWHRyiX',
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
            let somme = this.cartTotal + 20;
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
                    amount: this.cartTotal + 20, // cart total + delivery fee
                    products: this.cartData,
                    coordinates: this.coordinates
                }
                this.addOrder(payload).then(() => {
                    Notification({
                        title: 'Success',
                        message: 'Thank you for your order we will deliver soon.',
                        type: 'success'
                    });
                });
            } else {
                Notification({
                    title: 'Error',
                    message: 'The address cannot be empty.',
                    type: 'warning'
                });
            }
            
        },
         /**
         * Helper method to get and return the preferred city value form
         * Google Maps Autocomplete result.
         *
         * @param {object} place
         *   The getPlace() for Autocomplete result upon choosing a suggestion.
         *   e.g. autocomplete.getPlace()
         *
         * @return {string}
         */
        getCityValue(place) {
            let result = '';

            // Iterate and get "locality" value,
            // if there are none, just get "postal_code" as a fallback.
            _.each(place.address_components, (v) => {
                if (
                    _.includes(v.types, 'locality') ||
                    _.includes(v.types, 'postal_town')
                ) {
                    result = v.short_name;
                    return false; // Break the loop
                }
            });
            return result;
        },

        getCoordinate(place) {
            return place.geometry.location.lat()+","+place.geometry.location.lng();
        },
        
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
        // Define the target element and instantiate it with google autocomplete.
        let input = document.getElementById(this.id);
        let autocomplete = new google.maps.places.Autocomplete(input, this.autocompleteOpts);

        // Add listener when a selection has been chosen or changed.
        autocomplete.addListener('place_changed', () => {
            let result = autocomplete.getPlace().formatted_address;
            
            let city = this.getCityValue(autocomplete.getPlace());
            let coordinate= this.getCoordinate(autocomplete.getPlace());
            this.coordinates = coordinate;
            console.log('coordinate');
            console.log(coordinate);
           /* this.$emit('input', result); // Update this component's value.
            this.$emit('update:city', city); // Update city prop value.
            this.$emit('update:coordinate', coordinate); // Update coordinate prop value.*/
        });

        /*card = elements.create('card');
        card.mount(this.$refs.card);*/

    },
}
</script>