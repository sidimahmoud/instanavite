<template>
    <div class="about-container">
        <div class="about-section1">
            <span v-html="$t('about_section_1')"></span>
            <!-- La compagnie Instantavite vous permet de commander vos articles 
            préférés aux prix des supermarchés et commerces locaux (région d'opération Gatineau).
            Livraison dans maximum <span class="text-jaune"><strong>90 minutes </strong></span> ou à une autre plage horaire désirée. -->
        </div>
        <div class="about-section3">
            <span v-html="$t('about_section_2')"></span>
            <!-- Lorsque vous ne trouvez pas un article que vous cherchez ou vous n’êtes pas confortable avec le système de commande en ligne, 
            vous pouvez effectuer votre commande au téléphone. 
            <br/>Voir les conditions de livraison des articles non disponible sur la plateforme, 
            sous l'onglet <span class="text-jaune"><strong>COMMANDES SPÉCIAUX </strong></span> -->
                
        </div>
        <div class="about-section1">
            <span v-html="$t('about_section_3')"></span> <a href="https://gogivego.com/fr/" target="_blank">{{$t('here')}}</a>.   
        </div>

        <div class="about-section3">
            <span v-html="$t('about_section_4_1')"></span>
            <div>
                <ul>
                    <li><span v-html="$t('about_section_4_2')"></span></li>

                    <li><span v-html="$t('about_section_4_3')"></span></li>

                    <li><span v-html="$t('about_section_4_4')"></span></li>

                    <li><span v-html="$t('about_section_4_5')"></span></li>

                    <li><span v-html="$t('about_section_4_6')"></span></li>
                </ul>
            </div>
            <span v-html="$t('about_section_4_7')"></span>
                
        </div>

        <div class="about-section1">
            <el-row>
                <el-col :md="14" :offset="1">
                    <h4><span v-html="$t('download_app')"></span></h4>
                </el-col>
                <el-col :md="8" :offset="1">
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import {mapMutations} from "vuex";

export default {
    name: "about-page",
    props: {
    },
    /*
    |--------------------------------------------------------------------------
    | Component > data
    |--------------------------------------------------------------------------
    */
    data(){
        return {
        }
    },
    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
    },
    /*
    |--------------------------------------------------------------------------
    | Component > computed
    |--------------------------------------------------------------------------
    */
    computed: {
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
    },
}
</script>