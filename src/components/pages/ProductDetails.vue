<template>
    <div class="product-detail-page">
        <div class="product-detail-page-container">
            <div class="product-details">
                <el-row>
                    <el-col :md="12">
                        <div class="product-details__img-wrapper">			
                            <img :src="item.image" alt="Img" class="product-grid__img" />
                        </div>
                    </el-col>
                    <el-col :md="11" :offset="1">
                        <h3><strong>{{item.name}}</strong></h3>
                        <h4 class="text-red"><strong>${{item.price}}</strong></h4>
                        <h6><strong>Availability:</strong> <span class="text-green">In Stock</span></h6>
                        <el-button type="primary" @click="addToCart(item)"><i class="fa fa-cart-arrow-down"></i> Add to cart</el-button>		
                    </el-col>
                </el-row>
            </div>
            <el-divider></el-divider>
            <div class="related-products">
                <h4 style="text-align:center;">Related Products</h4>
            </div>
        </div>
    </div>
</template>
<script>
import {mapMutations, mapActions, mapGetters} from "vuex";

export default {
    name: "product-details",
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
        }
    },
    /*
    |--------------------------------------------------------------------------
    | Component > computed
    |--------------------------------------------------------------------------
    */
    computed: {
        ...mapGetters('product', {
            item: 'getItem',
        }),

    },
    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
        ...mapActions('product', {
            getProduct: 'getProduct',
        }),
        ...mapMutations('cart', {
            addProductCart: 'addToCart',
        }),

        loadCategories(){
            axios.get('http://api.instantavite.com/api/categories')
            .then((response) => {
                this.categoriesOpts = response.data;
            });  
        },
        addToCart(item) {
            this.addProductCart(item);
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
        this.getProduct({id:this.$route.params.id})
        this.loadCategories();
    },
}
</script>