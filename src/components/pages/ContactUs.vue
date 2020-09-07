<template>
    <div class="contact-container">
        <el-row>
            
            <el-col :md="10">
                <el-form :model="formInline" ref="userObject" :rules="rules" :validate-on-rule-change="true">
                    <!-- Nom -->
                    <el-form-item label="Nom (optional)" class="label-short">
                        <el-input v-model="formInline.name"/>
                    </el-form-item>

                    <!-- Email -->
                    <el-form-item label="Email" class="label-short" prop="email">
                        <el-input v-model="formInline.email"/>
                    </el-form-item>

                    <!-- Message -->
                    <el-form-item label="Message" class="label-short" prop="question">
                        <el-input type="textarea" v-model="formInline.message" :rows="3"/>
                    </el-form-item>

                    <el-button type="primary"
                            @click="submitForm('userObject')">
                        Send
                    </el-button>
                </el-form>
            </el-col>
            <el-col :md="6">
                <div style="margin: 1 rem">
                    <div style="margin: 1 rem">
                        <i class="fa fa-map-marker-alt"></i> GC47+R2 Ville-Marie, Montréal, QC, Canada
                    </div>
                    <div style="margin: 1 rem">
                        <i class="fa fa-phone"></i> +1 (234) 567 08 09
                    </div>
                    <div style="margin: 1 rem">
                        <i class="fa fa-envelope"></i> <a href="#">communications@instantavite.ca</a>
                    </div>
                </div>
                
            </el-col>
        </el-row>
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