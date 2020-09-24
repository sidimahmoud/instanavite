<template>
    <div>
        <topbar-page v-if="isShowFull"></topbar-page>
        <topbar-mobile></topbar-mobile>
        <topbar-extras v-if="isShowFull"></topbar-extras>

        <main id="main_body">
            <router-view :key="($route.path.includes('resources')) ? JSON.stringify($route) : ''"></router-view> 
        </main>
        <div v-if="isShowFull">
            <button class="open-button" @click="openForm" v-if="!showForm">{{$t('clavarder')}} <i class="fas fa-comments"></i> </button>

            <div class="chat-popup" id="myForm" v-if="showForm">
                <div class="chat-header"><h4>{{$t('clavardage')}} <small><i class="close-icon" @click="closeForm">X</i></small></h4> </div>
                <div class="messaging">
                    <div class="inbox_msg">
                        <!-- v-if="!isLoggedIn" -->
                        <div v-if="!isListening" style="color:#000;text-align:centre;padding: 3px">
                            <el-form :model="formInline" ref="userObject" :rules="rules" :validate-on-rule-change="true">
                                <!-- Nom -->
                                <el-form-item :label="$t('name_optional')" class="label-short">
                                    <el-input v-model="formInline.name"/>
                                </el-form-item>

                                <!-- Email -->
                                <el-form-item :label="$t('email')" class="label-short" prop="email">
                                    <el-input v-model="formInline.email"/>
                                </el-form-item>

                                <!-- Message -->
                                <el-form-item :label="$t('message')" class="label-short" prop="question">
                                    <el-input type="textarea" v-model="formInline.message" :rows="3"/>
                                </el-form-item>

                                <el-button type="primary"
                                        class="button-close"
                                        @click="submitForm('userObject')">
                                    {{$t('send')}}
                                </el-button>
                            </el-form>
                            <!--Afin d'obtenir une assistance adaptée, veuillez vous <a href="javascript:;" @click="handleLogin" type="primary">connecter</a>-->
                        </div>
                        <div v-else class="mesgs">
                            <div class="msg_history" id="msg_history">
                                <div v-for="m in listData" v-bind:key="m.id">
                                    <div v-if="m.from_Admin" class="incoming_msg">
                                        <div class="received_msg">
                                            <div class="received_withd_msg">
                                                <p>{{m.message}}</p>
                                                <span class="time_date"> {{m.created_at}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="!m.from_Admin" class="outgoing_msg">
                                        <div class="sent_msg">
                                            <p>{{m.message}}</p>
                                            <span class="time_date"> {{m.created_at}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="type_msg">
                                <div class="input_msg_write">
                                    <el-input type="text" class="write_msg" placeholder="Type a message" v-model="message"/>
                                    <button class="msg_send_btn" type="button" @click="sendMessage"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <bottom-page v-if="isShowFull"></bottom-page>
    </div>
</template>
<script>
import {mapMutations, mapActions, mapGetters} from "vuex";
import {isEmpty} from "~/js/helpers/Common";

export default {
    name: "default-layout",
    props: {
    },
    /*
    |--------------------------------------------------------------------------
    | Component > data
    |--------------------------------------------------------------------------
    */
    data(){
        return {
            showForm: false,
            isAuth: false,
            isListening: false,
            message:'',
            formInline : {
                name: '',
                email: '',
                password: 'instantavite',
                type: 1
            },
            rules: {
                email: [
                    {
                        required: true,
                        message: 'Please enter a description'
                    },
                    {
                        email: true,
                        message: 'Please enter a valid email'
                    }
                ]
            },
        }
    },
    /*
    |--------------------------------------------------------------------------
    | Component > computed
    |--------------------------------------------------------------------------
    */
    computed: {
        ...mapGetters('auth', {
            userData:'userData',
            userEmail: 'user_email'
        }),
        ...mapGetters('message', {
            listData: 'listData'
        }),
        /**
         * @returns {boolean}
         */
        isLoggedIn() {
            return !this.$store.getters['auth/hasAccessToken'];
        },
        /**
         * @returns {boolean}
         */
        isShowFull () {
            return this.$route.meta.full_screen !== true;
        },

    },
    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
        ...mapActions('message', {
            sendChat: 'sendMessage',
            getList: 'getList'
        }),
        openForm() {
            this.showForm = true;
        },
        closeForm(){
            this.showForm = false;
        },
        handleLogin(){
            this.$router.push({
                name: "login-page",
            });
        },
        sendMessage(){
            let payload = {
                user_id: this.userData.id,
                message: this.message,
                is_for_admin: true
            }
            this.sendChat({data:payload}).then(()=>{
                this.message = '';
                setTimeout(() => {
                    this.getList({user_id: this.userData.id});
                },1000)
            });
        },
        scrollToEnd() {
            var container = this.$el.querySelector("#msg_history");
            container.scrollTop = container.scrollHeight;
        },
        submitForm(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    this.handleClickSubmitAdd();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleClickSubmitAdd(){
            axios({
                method: 'post',
                url: 'https://api.instantavite.com/api/questions',
                data: this.formInline
            })
            .then((response) => {
                this.$store.commit('auth/setUserEmail', this.formInline.email);
                this.getList({user_id: this.formInline.email});
                this.isListening = true;
                return response;
            });
        },
        addUser(){
            isEmpty(this.formInline.name)? this.formInline.name = 'test' : '';
            axios({
                method: 'post',
                url: 'https://api.instantavite.com/api/users',
                data: this.formInline
            })
            .then((response) => {
                this.$store.commit('auth/setAccessToken', 'testing')
                this.$store.commit('auth/setUserData', response.data);
                window.location.reload();
                return response;
            });
        },
        isEmpty (array) {
            return isEmpty(array);
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
        this.getList({user_id: this.userEmail});
        /*setTimeout(() => {
            this.scrollToEnd();
        },3000)*/
        
    },
}
</script>


