<template>
    <div class="about-container">
        <div class="about-section1">
            La compagnie Instantavite vous permet de commander vos articles 
            préférés aux prix des supermarchés et commerces locaux (région d'opération Gatineau).
            Livraison dans maximum <span class="text-jaune"><strong>90 minutes </strong></span> ou à une autre plage horaire désirée.
        </div>
        <div class="about-section3">
            
            Lorsque vous ne trouvez pas un article que vous cherchez ou vous n’êtes pas confortable avec le système de commande en ligne, 
            vous pouvez effectuer votre commande au téléphone. 
            <br/>Voir les conditions de livraison des articles non disponible sur la plateforme, 
            sous l'onglet <span class="text-jaune"><strong>COMMANDES SPÉCIAUX </strong></span>
                
        </div>
        <div class="about-section1">
            Vos articles sont transportés dans des emballages recyclables et réutilisables, de plus les produits frais sont gardés dans des sacs isolés pour conserver leur fraîcheur.
            Visitez également notre site web encourageant l’entraide et la réutilisation (recyclage) d’objets <a href="www.gogivego.com">ici</a>.   
        </div>

        <div class="about-section3">
            <h4>Les frais de <span class="text-jaune">Préparation</span> des commandes et de la livraison sont calculés ainsi :</h4>
            <div>
                <ul>
                    <li> Lorsque la commande est moins de 20: <span class="text-jaune">3.5$ de frais de préparation.</span></li>

                    <li> Lorsque la commande est entre 20 - 40$:<span class="text-jaune"> 5$ de frais de préparation.</span></li>

                    <li> Lorsque la commande est entre 40 - 60$:<span class="text-jaune"> 7$ de frais de préparation.</span></li>

                    <li> Lorsque la commande est entre 60 - 80$:<span class="text-jaune"> 10$ de frais de préparation.</span></li>

                    <li> Lorsque la commande est entre 80$ et plus:<span class="text-jaune"> 20$ de frais de préparation.</span></li>
                </ul>
            </div>
            Les frais de service de livraison varient entre 4 - 8.5$ selon la distance totale à parcourir.
                
        </div>

        <div class="about-section1">
            <el-row>
                <el-col :md="14" :offset="1">
                    <h4>DOWNLOAD OUR <span class="text-green">APP</span></h4>
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