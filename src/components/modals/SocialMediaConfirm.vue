<template>
    <el-dialog
    :title="$t('continue_with_msg')"
    :visible.sync="iVisible"
    :modal-append-to-body="false"
    :append-to-body="true"
    custom-class="custom-modal-2"
    width='40%'>
        <el-input class="custom-cart" v-model="iUser.email" :placeholder="$t('email')"></el-input>
        <el-input class="custom-cart" v-model="iUser.name" :placeholder="$t('email')"></el-input>
    
        <div class="el-form-actions">
            <el-button type="default" @click="iVisible = false">{{$t('cancel')}}</el-button>
            <el-button type="primary" @click="submitForm">{{$t('submit')}}</el-button>
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
        user: {
            type: Object,
            default() {
                return {
                    email: '',
                    name: ''
                }
            }
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
        }
    },
    /*
    |--------------------------------------------------------------------------
    | Component > computed
    |--------------------------------------------------------------------------
    */
    computed: {
        ...mapGetters('user', {
            found : 'user',
        }),
        
        iVisible: {
            get() {
                return this.visible;
            },
            set(v) {
                this.$emit("update:visible", v);
            }
        },
        iUser: {
            get() {
                return this.user;
            },
            set(v) {
                this.$emit("update:user", v);
            }
        },
    },
    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
        ...mapActions('user', {
            matchUser : 'findUser',
            addUser: 'createUser'
        }),
        ...mapMutations('auth', {
            setUserData : 'setUserData',
            setAccessToken: 'setAccessToken'
        }),
        empty(v) {
            return isEmpty(v);
        },
        submitForm() {
            const _this = this;
            this.matchUser({email:  this.iUser.email}).then((r)=>{
                if(r.status == 200 || r.status == 201){
                    if(!isEmpty(_this.found)){
                        _this.setUserData(_this.found);
                        _this.setAccessToken("token social");
                        _this.redirectUser();
                    }else{
                        _this.createSocialUser();
                    }
                }
            });
        },
        redirectUser(){
            this.$router.push({path: '/cart'});
        },
        createSocialUser(){
            const _this = this;
            let payload = {
                name: this.iUser.name,
                last_name: this.iUser.name,
                email: this.iUser.email,
                password: this.iUser.name + "2020",
                type: 1,
            }

            this.addUser(payload).then((r)=>{
                if(r.status == 200 || r.status == 201){
                    if(!isEmpty(_this.found)){
                        _this.setUserData(_this.found);
                        _this.setAccessToken("token social");
                        _this.redirectUser();
                    }
                }
            });
            /* .then((r) => {
                if(r != "error"){
                    this.redirectUser();
                }
            }) */
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