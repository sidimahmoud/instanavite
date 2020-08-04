<template>
    <div class="about-container">
        <div class="about-section1">
            <el-row>
                <el-col :md="14" :offset="1">
                    La compagnie Instantavite vous permet de commander vos articles 
                    préférés aux prix des supermarchés et commerces locaux (région d'opération Gatineau).
                    Livraison dans maximum 90 minutes ou à une autre plage horaire désirée.
                </el-col>
                <el-col :md="8" :offset="1">
                    <img src="/images/about-us/deliver.png" height="120px" width="200px"/>
                </el-col>
            </el-row>
        </div>
        <div class="about-section2">
            <el-row>
                <el-col :md="14" :offset="1">
                    Lorsque vous ne trouvez pas un article que vous cherchez ou vous n’êtes pas confortable avec le système de commande en ligne, 
                    vous pouvez effectuer votre commande au téléphone. 
                    Voir les conditions de livraison des articles non disponible sur la plateforme, 
                    sous l'onglet <strong>Vous ne trouvez pas le produit que vous cherchez?</strong>
                </el-col>
                <el-col :md="8" :offset="1">
                    <img src="/images/about-us/deliver-phone.png" height="120px" width="200px"/>
                </el-col>
            </el-row>
        </div>
        <div class="about-section1">
            <el-row>
                <el-col :md="14" :offset="1">
                    Vos articles sont transportés dans des emballages recyclables et réutilisables,
                    de plus les produits frais sont gardés dans des sacs isolés pour conserver leur fraîcheur.
                </el-col>
                <el-col :md="8" :offset="1">
                    <img src="/images/about-us/deliver-sac.png" height="120px" width="200px"/>
                </el-col>
            </el-row>
        </div>

        <div class="about-section3">
            <el-row>
                <el-col :md="6" :offset="1">
                    <img src="/images/about-us/deliver-fruits.png" height="180px" width="200px"/>
                </el-col>
                <el-col :md="14" :offset="1">
                    <h4>Les frais de <span class="text-jaune">Préparation</span> des commandes et de la livraison sont calculés ainsi :</h4>
                    <div>
                        <ul>
                            <li> Lorsque la commande est moins de 20: <span class="text-jaune">3.5$ de frais de préparation.</span></li>

                            <li> Lorsque la commande est entre 20 - 40$:<span class="text-jaune"> 5$ de frais de préparation.</span></li>

                            <li> Lorsque la commande est entre 40 - 60$:<span class="text-jaune"> 7$ de frais de préparation.</span></li>

                            <li> Lorsque la commande est entre 60 - 80$:<span class="text-jaune"> 10$ de frais de préparation.</span></li>

                            <li> Lorsque la commande est entre 80$ et plus:<span class="text-jaune"> 15$ de frais de préparation.</span></li>
                        </ul>
                    </div>
                    Les frais de service de livraison varient entre 4 - 8.5$ selon la distance totale à parcourir.
                </el-col>
            </el-row>
        </div>

        <div class="about-section1">
            <el-row>
                <el-col :md="14" :offset="1">
                    <h4>DOWNLOAD OUR <span class="text-green">APP</span></h4>
                </el-col>
                <el-col :md="8" :offset="1">
                    <img src="/images/about-us/deliver-app.png"/>
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