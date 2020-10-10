<template>
    <div id="printSection" class="order-reciept-page printSection">
            <el-row>
                <el-col :md="13" >
                    <div class="order-reciept">
                        Societé instantavite<br/>
                        32 avenue monsiegneur dézel,<br/>
                        Ville de Québec, Quebec,<br/>
                        G1E2T7<br/>
                        <a href="https://instantavite-dev.netlify.app" target="_blank">www.instantavite.com</a>
                    </div>
                </el-col>
                <el-col :md="8">
                   <div class="order-reciept">
                        <h4>RECEIPT</h4>
                        <img class="app-header-logo" src="/images/defaults/logo2.png" height="90px" width="130px"/>
                    </div>
                </el-col>
                <el-col :md="2">
                   <el-button small color="primary" @click="printSection">
                        <i class="fas fa-print"></i>Print
                    </el-button>
                </el-col>
            </el-row>
            <br/><br/>
            <el-row>
                <el-col :md="6" >
                    <h5>BILL TO</h5>
                    <el-divider></el-divider>
                    <el-row>
                        <el-col :md="12" >
                            <p>Name of the customer</p>
                        </el-col>
                        <el-col :md="11">
                            <span>{{order.created_at}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :md="12" >
                            <p>Name of the customer</p>
                        </el-col>
                        <el-col :md="11">
                            <span>{{order.created_at}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :md="12" >
                            <p>Name of the customer</p>
                        </el-col>
                        <el-col :md="11">
                            <span>{{order.created_at}}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :md="4" :offset="1">
                    <h5>SHIPPING ADDRESS</h5>
                    <el-divider></el-divider>
                    <span><strong>{{order.address}}</strong></span>
                </el-col>
                <el-col :md="6" :offset="1">
                    <el-row>
                        <el-col :md="12" >
                            <p>Order Number:</p>
                        </el-col>
                        <el-col :md="12">
                            <span>#{{order.id}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :md="8" >
                            <p>Payment date:</p>
                        </el-col>
                        <el-col :md="8">
                            <span>{{order.created_at}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :md="8" >
                            <p>Order Status:</p>
                        </el-col>
                        <el-col :md="8">
                            <span class="text-green">{{$t('delivered')}}</span>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <div>
                <el-table
                    :data="order.products"
                    style="width: 80%"
                    :row-class-name="tableRowClassName">
                    <el-table-column
                        label="Description">
                        <template slot-scope="scope">
                            {{scope.row.product.name}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="quantity"
                        label="Quantity"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        label="Unit price"
                        width="180">
                        <template slot-scope="scope">
                            {{scope.row.product.price}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="total"
                        label="Total">
                    </el-table-column>
                </el-table>
            </div>
            <div>
                <el-row>
                    <el-col :md="4">
                    </el-col>
                    <el-col :md="11" :offset="5">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <th>{{$t('sous_total')}}</th>
                                    <td><strong>${{order.amount}} </strong></td>
                                </tr>
                                <tr>
                                    <th>{{$t('tps')}}</th>
                                    <td><strong>$1.00</strong></td>
                                </tr>
                                <tr>
                                    <th>{{$t('tvq')}}</th>
                                    <td><strong>$1.00</strong></td>
                                </tr>
                                <tr>
                                    <th>{{$t('frais_preparation')}}</th>
                                    <td><strong>$1.00</strong></td>
                                </tr>
                                <tr>
                                    <th>{{$t('frais_livraison')}}</th>
                                    <td><strong>$1.00</strong></td>
                                </tr>
                                <tr class="last-row">
                                    <th>{{$t('total')}}</th>
                                    <td><strong>${{order.amount}}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                </el-row>
            </div>
    </div> 
</template>

<script>
import {mapMutations, mapActions, mapGetters} from "vuex";
import {isEmpty} from "~/js/helpers/Common";

export default {
    /*
    |--------------------------------------------------------------------------
    | Component > data
    |--------------------------------------------------------------------------
    */
    data() {
        return {}
    },
    /*
    |--------------------------------------------------------------------------
    | Component > computed
    |--------------------------------------------------------------------------
    */
    computed: {
        ...mapGetters('order', {
            order: 'itemData',
        }),
    },
    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
        ...mapActions('order', {
            fetchOrder: 'fetchOrder',
        }),

        fetchData() {
            let params = {
                id: this.$route.params.id
            }

            this.fetchOrder(params);
        },
        printSection() {
            this.$htmlToPaper("printSection");
        },
        tableRowClassName({row, rowIndex}) {
            if (rowIndex === 1) {
            return 'warning-row';
            } else if (rowIndex === 3) {
            return 'success-row';
            }
            return '';
        }
    },
    /*
    |--------------------------------------------------------------------------
    | Component > mountes
    |--------------------------------------------------------------------------
    */
    mounted() {
       this.fetchData();
    }
}
</script>