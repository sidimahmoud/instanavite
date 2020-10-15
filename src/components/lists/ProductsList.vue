<template>
    <div class="product-container">
        <el-row>
            <div class="categorie-wrapper-mobile">
                <div class="categorie-filter" v-for="cat in categoriesOpts" v-bind:key="cat.id">
                    <span @click="filterByCategorie(cat)">{{cat.name}}</span> <!--<span :class="categorie_block_class"></span>-->
                </div>
            </div>
            <el-col :md="4">
                <div class="catgorie-wrapper">
                    <diV class="div-header">
                        {{$t('product_per_categorie')}}
                    </div>
                    <div :class="cat.active ? 'categorie-selected' : 'categorie-filter'" v-for="cat in categoriesOpts" v-bind:key="cat.id"  @click="filterByCategorie(cat)">
                        <span v-if="language == 'fr'">{{cat.name}}</span>
                        <span v-else>{{cat.name_english}}</span>
                    </div>
                </div>
            </el-col>
            <el-col :md="18">
                <div class="produit-wrapper">
                    <div class="produit-list-header">
                        <!--<span>Total Products: {{listPagination.total}}</span>-->
                        <el-select v-model="sortBy" placeholder="Trier par" style="float:right;" @change="orderByChange">
                            <el-option label="Prix croissant" value="price"></el-option>
                            <el-option label="Prix décroissant" value="-price"></el-option>
                        </el-select>
                        
                    </div>
                    <!-- content here -->
                    <div>
                        <!-- Product list start here -->

                        <!-- Single product -->
                        <div class="grid" >
                            <div class="item-product" v-for="item in listData" v-bind:key="item.id">
                                <div class="product-grid__img-wrapper">			
                                    <img :src="item.image" alt="Img" class="product-grid__img"/>
                                </div>
                                <span v-if="language == 'fr'" class="product-grid__title">{{item.name}}</span>
                                <span v-else class="product-grid__title">{{item.name_english}}</span>
                                
                                <span class="product-grid__price">${{item.price}} / {{item.size}}</span>
                                <p class="product-grid__description"></p>
                                <span class="product-grid__btn product-grid__add-to-cart" @click="addToCart(item)"><i class="fa fa-cart-arrow-down"></i> {{$t('add_cart')}}</span>				
                                <!--<span class="product-grid__btn product-grid__view" @click="handleDetails(item)"><i class="fa fa-eye"></i> View more</span>-->
                            </div>
                            <div v-if="isEmpty(listData)">
                                Vous ne trouvez pas <strong>{{search_product}} </strong>? Appelez nous au 125-542-5524 et nous vous livrerons ce produit au prix du commerce.
                            </div>
                        </div>
                        <!-- end Single product -->
                        <!--Pagination-->
                        <div class="list-pagination">
                            
                            <el-pagination
                                layout="total, sizes, prev, pager, next, jumper"
                                :page-size="listPagination.per_page"
                                :page-sizes="[15, 20, 50, 100, 200]"
                                :total="listPagination.total"
                                :current-page="listPagination.current_page"
                                @current-change="reloadList"
                            >
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {mapMutations, mapState, mapActions, mapGetters} from "vuex";
import {isEmpty} from "~/js/helpers/Common";

export default {
    name: "product-list",
    props: {
    },
    /*
    |--------------------------------------------------------------------------
    | Component > data
    |--------------------------------------------------------------------------
    */
    data(){
        return {
            categoriesOpts: [],
            categorie_block_class : "fa fa-plus filter-icon",
            sortBy: '',
            search_product: '',
            categorie_selected: ''
        }
    },
    /*
    |--------------------------------------------------------------------------
    | Component > computed
    |--------------------------------------------------------------------------
    */
    computed: {
        ...mapGetters('product', {
            listData: 'listData',
            listPagination: 'listPagination',
        }),
        ...mapState('ui', ['language']),
    },
    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
        ...mapActions('product', {
            loadList: 'getList',
            loadListByParams: 'getListByParams'
        }),
        ...mapMutations('cart', {
            addProductCart: 'addToCart',
        }),

        loadCategories(){
            axios.get('https://api.instantavite.com/api/categories')
            .then((response) => {
                this.categoriesOpts = response.data;
            });  
        },
        filterByCategorie(cat){
            this.toggleClass(cat.id);
            let payload = {
                'filter[categorie]': cat.id
            }
            this.categorie_selected = cat.id;
            this.loadListByParams(payload); 
        },
        addToCart(item) {
            item.price = parseFloat(item.price).toFixed(2)
            this.addProductCart(item);
        },

        reloadList(n){
            let payload = {
                'page': n,
                'filter[categorie]': this.categorie_selected,
                'sort': this.sortBy
            }
            this.loadListByParams(payload); 
        },
        handleDetails(item) {
            this.$router.push({
                name: "product-details-page",
                params: {id: item.id}
            });
        },
        toggleClass(id) {
            // Create variable for all fighters (name takes up less space)
            let allCategories = this.categoriesOpts;
            // Get the clicked fighter
            let cat = allCategories.find(e => e.id === id)
            // Set all fighters to have a active key of false so that they "loose focus"
            allCategories = allCategories.map(e => window.vue.set(e, 'active', false))
            // Use Vue.set to tell vue that we updated the object and it needs to be re-rendered
            window.vue.set(cat, 'active', !cat.active)
        },
        isEmpty (v) {
            return isEmpty(v);
        },
        orderByChange(){
            let payload = {
                'filter[categorie]': this.categorie_selected,
                'sort': this.sortBy
            }

            this.loadListByParams(payload); 
        }
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
        this.loadCategories();
        const params = _.clone(this.$route.query);
        const filters = _.filter(Object.keys(params), (v) => _.includes(v, 'filter'));

        if (filters.length > 0) {
            _.each(filters, (x) => {
                this.search_product = params[x];
            });
        }
        if(!isEmpty(params)) {
            this.loadList(params);
        } else {
            let payload = {
                'filter[categorie]': 7
            };
            this.categorie_selected = 7;
            this.loadListByParams(payload);
        }
    },
}
</script>