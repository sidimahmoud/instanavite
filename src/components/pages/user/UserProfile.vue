<template>
    <div class="profile-page">  
        <el-row>
            <el-col :md="5">
                <div class="profile-card">
                    <img src="http://demo.geekslabs.com/materialize/v2.1/layout03/images/avatar.jpg"  alt="John" style="width:100%">
                    <h1>John Doe</h1>
                    <p class="title">CEO & Founder, Example</p>
                    <p>Harvard University</p>
                    <div style="margin: 24px 0;">
                        <a href="#"><i class="fas fa-dribbble"></i></a> 
                        <a href="#"><i class="fas fa-twitter"></i></a>  
                        <a href="#"><i class="fas fa-linkedin"></i></a>  
                        <a href="#"><i class="fas fa-facebook"></i></a> 
                    </div>
                </div>
            </el-col>
            <el-col :md="15" :offset="1">
                <el-tabs v-model="activeTab">
                    <el-tab-pane label="Orders in progress" name="progress">
                        <progress-orders></progress-orders>
                    </el-tab-pane>
                    <el-tab-pane label="Reçus" name="recus">
                        <orders-recips></orders-recips>
                    </el-tab-pane>
                    <el-tab-pane label="Personnel Settings" name="personnel_settings">
                        personnel settings
                    </el-tab-pane>
                </el-tabs>
                </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTab: 'progress'
        }
    }
}
</script>
