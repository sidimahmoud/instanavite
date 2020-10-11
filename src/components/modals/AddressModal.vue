<template>

    <el-dialog
    :title="$t('delivery_address')"
    :visible.sync="iVisible"
    :modal-append-to-body="false"
    :append-to-body="true"
    custom-class="custom-modal"
    width='60%'>
        <!-- <div class="el-input google-maps-address-field">
            <input type="text" v-bind:id="id"
                ref="google_address_autocomplete"
                v-model="form.address"
                class="el-input__inner"
                :placeholder="$t('address')"/>
        </div> -->
        <google-maps-address
            class="google-maps-field"
            v-model="form.address"
            v-on:updateaddress="updateAddress">
        </google-maps-address>
        <el-input class="custom-cart" v-model="form.postal_code" :placeholder="$t('code_postal')" disabled></el-input>
    
        <div class="el-form-actions">
            <el-button type="default" @click="iVisible = false">{{$t('cancel')}}</el-button>
            <el-button type="primary" @click="submitForm('todo_form')">{{$t('submit')}}</el-button>
        </div>
  </el-dialog>

</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { isEmpty } from "~/js/helpers/Common";
import { Notification } from 'element-ui';

export default {
    /*
    |--------------------------------------------------------------------------
    | Component > props
    |--------------------------------------------------------------------------
    */
    props: {
        visible: {
            type: Boolean,
            default: false
        },
    },
    
    /*
    |--------------------------------------------------------------------------
    | Component > data
    |--------------------------------------------------------------------------
    */
    data(){
        return {
            loading: false,
            form: {
                address: "",
                coorinates: "",
                postal_code: ""
            },
            rules: {
                address: [
                    {
                        required: true,
                        message: "Please input address"
                    }
                ]
            }
        }
    },
    /*
    |--------------------------------------------------------------------------
    | Component > computed
    |--------------------------------------------------------------------------
    */
    computed: {
        ...mapGetters("ui", { postList: "postList" }),
        iVisible: {
            get() {
                return this.visible;
            },
            set(v) {
                this.$emit("update:visible", v);
            }
        },
    },
    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
        ...mapMutations('cart', {
            setAddress : 'setAddress',
            setPostCode: 'setPostCode',
            setCartCoordinates: 'setCartCoordinates',
        }),
        empty(v) {
            return isEmpty(v);
        },
        submitForm(form) {
            this.loading = true;
            
            if(this.form.postal_code.startsWith('J8') || this.form.postal_code.startsWith('J9')){

                this.setAddress(this.form.address);
                this.setPostCode(this.form.postal_code);
                this.setCartCoordinates(this.form.coorinates);

                this.$router.push({
                    name: "login-page",
                    params: {}
                });

            }else{
                //this.form.address = '';
                //this.form.postal_code = '';

                Notification({
                    title: 'Error',
                    message: 'Unfortunetly for this moment we do not perfom delivry in this area.',
                    type: 'warning'
                });
            }
        },
        /**
         * @param {object} location
         * @returns {void}
         */
        updateAddress (location) {
            this.form.postal_code = location.postal_code;
            this.form.coorinates = location.coorinates;
        },
    },
    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    mounted() {
        
    }
};
</script>