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
                        PRODUITS PAR CATÉGORIE
                    </div>
                    <div class="categorie-filter" v-for="cat in categoriesOpts" v-bind:key="cat.id">
                        <span @click="filterByCategorie(cat)">{{cat.name}}</span> <!--<span :class="categorie_block_class"></span>-->
                    </div>
                </div>
            </el-col>
            <el-col :md="18">
                <div class="produit-wrapper">
                    <div class="produit-list-header">
                        <!--<span>Total Products: {{listPagination.total}}</span>-->
                        <el-select v-model="sortBy" placeholder="Trier par" style="float:right;">
                            <el-option label="name" value="name"></el-option>
                            <el-option label="date" value="date"></el-option>
                            <el-option label="price" value="price"></el-option>
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
                                <span class="product-grid__title">{{item.name}}</span>
                                <span class="product-grid__price">${{item.price.toFixed(2)}} / {{item.size}}</span>
                                <p class="product-grid__description"></p>
                                <span class="product-grid__btn product-grid__add-to-cart" @click="addToCart(item)"><i class="fa fa-cart-arrow-down"></i> Add to cart</span>				
                                <!--<span class="product-grid__btn product-grid__view" @click="handleDetails(item)"><i class="fa fa-eye"></i> View more</span>-->
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
import {mapMutations, mapActions, mapGetters} from "vuex";

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
            sortBy: ''
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
            let payload = {
                'filter[categorie_id]': cat.id
            }
            this.loadListByParams(payload); 
        },
        addToCart(item) {
            this.addProductCart(item);
        },

        reloadList(n){
            let payload = {
                'page': n
            }
            this.loadListByParams(payload); 
        },
        handleDetails(item) {
            this.$router.push({
                name: "product-details-page",
                params: {id: item.id}
            });
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
        this.loadList();
        this.loadCategories();
    },
}
</script>