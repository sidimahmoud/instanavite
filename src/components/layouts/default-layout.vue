<template>
    <div class="master-layout">
        <topbar-page v-if="isShowFull"></topbar-page>
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
                        <div v-if="!isLoggedIn" style="color:#000;text-align:centre;padding:10px">Afin d'obtenir une assistance adaptée, veuillez vous <a href="javascript:;" @click="handleLogin" type="primary">connecter</a></div>
                        <div v-else class="mesgs">
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
            }
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


