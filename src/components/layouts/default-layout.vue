<template>
    <div>
        <topbar-page v-if="isShowFull"></topbar-page>
        <topbar-mobile></topbar-mobile>
        <topbar-extras v-if="isShowFull"></topbar-extras>

        <main id="main_body">
            <router-view :key="($route.path.includes('resources')) ? JSON.stringify($route) : ''"></router-view> 
        </main>
        <div v-if="isShowFull">
            <button class="open-button" @click="openForm" v-if="!showForm">Clavarder <i class="fas fa-comments"></i> </button>

            <div class="chat-popup" id="myForm" v-if="showForm">
                <h3>Clavarder</h3>
                <div class="messaging">
                    <div class="inbox_msg">
                        <div v-if="!isLoggedIn" style="color:#000;text-align:centre;padding:10px">
                            <el-form :model="formInline" ref="userObject" :rules="rules" :validate-on-rule-change="true">
                                <!-- Address 1 -->
                                <el-form-item label="Email" class="label-short" prop="email">
                                    <el-input v-model="formInline.email"/>
                                </el-form-item>

                                <!-- Address 2 -->
                                <el-form-item label="Nom (optional)" class="label-short">
                                    <el-input v-model="formInline.name"/>
                                </el-form-item>

                                <el-button type="primary"
                                        class="button-close"
                                        @click="submitForm('userObject')">
                                    Envoyer
                                </el-button>
                            </el-form>
                            <!--Afin d'obtenir une assistance adaptée, veuillez vous <a href="javascript:;" @click="handleLogin" type="primary">connecter</a>-->
                        </div>
                        <div v-else class="mesgs">
                            <div v-if="isEmpty(listData)" style="color:#5F9EA0;padding:1rem">
                                Posez votre question<br/>un administrateur vas vous repondre au plus breves delai.
                            </div>
                            <div class="msg_history" id="msg_history">
                                <div v-for="m in listData" v-bind:key="m.id">
                                    <div v-if="m.from_Admin" class="incoming_msg">
                                        <!--<div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>-->
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
                        
                        <el-button type="danger" class="button-close" @click="closeForm">Close</el-button>
                    </div>
                </div>
                
            </div>
        </div>
        <bottom-page></bottom-page>
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
                ],
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
            userData:'userData'
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
            axios.get(`https://api.instantavite.com/api/users?filter[email]=${this.formInline.email}`)
            .then((response) => {
                console.log(response.data)
                if(!isEmpty(response.data)){
                    this.$store.commit('auth/setAccessToken', 'testing')
                    this.$store.commit('auth/setUserData', response.data[0]);
                    window.location.reload();
                }else{
                   this.addUser(); 
                }
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
        this.getList({user_id: this.userData.id});
        setTimeout(() => {
            this.scrollToEnd();
        },3000)
        
    },
}
</script>


