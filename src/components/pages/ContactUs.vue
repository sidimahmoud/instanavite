<template>
    <div class="contact-container">
        <!--Section: Contact v.2-->
        <section class="mb-4">

            <!--Section heading-->
            <h2 class="h1-responsive font-weight-bold text-center my-4">{{$t('contact_us')}}</h2>
            <!--Section description-->
            <p class="text-center w-responsive mx-auto mb-5">{{$t('service_msg')}}.</p>

            <div class="row">

                <!--Grid column-->
                <div class="col-md-9 mb-md-0 mb-5">
                    <form id="contact-form" name="contact-form" action="mail.php" method="POST">

                        <!--Grid row-->
                        <div class="row">

                            <!--Grid column-->
                            <div class="col-md-6">
                                <div class="md-form mb-0">
                                    <input type="text" id="name" name="name" class="form-control" v-model="formInline.name">
                                    <label for="name" class="">{{$t('votre_nom')}}</label>
                                </div>
                            </div>
                            <!--Grid column-->

                            <!--Grid column-->
                            <div class="col-md-6">
                                <div class="md-form mb-0">
                                    <input type="text" id="email" name="email" class="form-control" v-model="formInline.email">
                                    <label for="email" class="">{{$t('votre_email')}}</label>
                                </div>
                            </div>
                            <!--Grid column-->

                        </div>
                        <!--Grid row-->

                        <!--Grid row-->
                        <div class="row">
                            <div class="col-md-12">
                                <div class="md-form mb-0">
                                    <input type="text" id="subject" name="subject" class="form-control" v-model="formInline.subject">
                                    <label for="subject" class="">{{$t('subject')}}</label>
                                </div>
                            </div>
                        </div>
                        <!--Grid row-->

                        <!--Grid row-->
                        <div class="row">

                            <!--Grid column-->
                            <div class="col-md-12">

                                <div class="md-form">
                                    <textarea type="text" id="message" name="message" rows="5" class="form-control md-textarea" v-model="formInline.message"></textarea>
                                    <label for="message">{{$t('message')}}</label>
                                </div>

                            </div>
                        </div>
                        <!--Grid row-->

                    </form>
                    <div class="actions-form-item">
                        <el-button type="primary"
                                class="contact-button"
                                @click="submitForm('userObject')">
                            {{$t('send')}}
                        </el-button>
                    </div>
                    <div class="status"></div>
                </div>
                <!--Grid column-->

                <!--Grid column-->
                <div class="col-md-3 text-center">
                    <ul class="list-unstyled mb-0">
                        <li><i class="fas fa-map-marker-alt fa-2x"></i>
                            <p>GC47+R2 Ville-Marie, Montréal, QC, Canada</p>
                        </li>

                        <li><i class="fas fa-phone mt-4 fa-2x"></i>
                            <p>{{$t('phone_number')}}</p>
                        </li>

                        <li><i class="fas fa-envelope mt-4 fa-2x"></i>
                            <p>communications@instantavite.ca</p>
                        </li>
                    </ul>
                </div>
                <!--Grid column-->

            </div>

        </section>
<!--Section: Contact v.2-->
        <!-- <el-row>
            
            <el-col :md="10">
                <el-form :model="formInline" ref="userObject" :rules="rules" :validate-on-rule-change="true">
                    
                    <el-form-item label="Nom (optional)" class="label-short">
                        <el-input v-model="formInline.name"/>
                    </el-form-item>

                    
                    <el-form-item label="Email" class="label-short" prop="email">
                        <el-input v-model="formInline.email"/>
                    </el-form-item>

                    
                    <el-form-item label="Message" class="label-short" prop="question">
                        <el-input type="textarea" v-model="formInline.message" :rows="3"/>
                    </el-form-item>
                    <div class="actions-form-item">
                        <el-button type="primary"
                                @click="submitForm('userObject')">
                            Envoyer
                        </el-button>
                    </div>
                </el-form>
               
            </el-col>
            <el-col :md="6" :offset="1">
                <div style="margin-top: 3rem">
                    <div style="margin: 1rem">
                        <i class="fa fa-map-marker-alt"></i> GC47+R2 Ville-Marie, Montréal, QC, Canada
                    </div>
                    <div style="margin: 1rem">
                        <i class="fa fa-phone"></i> +1 (234) 567 08 09
                    </div>
                    <div style="margin: 1rem">
                        <i class="fa fa-envelope"></i> <a href="#">communications@instantavite.ca</a>
                    </div>
                </div>
                
            </el-col>
        </el-row> -->
    </div>
</template>
<script>

export default {

    /*
    |--------------------------------------------------------------------------
    | Component > data
    |--------------------------------------------------------------------------
    */
    data(){
        return {
            formInline : {
                name: '',
                email: '',
                password: 'instantavite',
                type: 1,
                subject: '',
                message: ''
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
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
        submitForm(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    this.sendMessage();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        sendMessage(){
        },
    }
}
</script>