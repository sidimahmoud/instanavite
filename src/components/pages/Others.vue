<template>
    <div class="others-products-page">
        <span v-html="$t('do_not_found')"></span><span class="text-jaune"><strong>{{$t('phone_number')}}</strong></span><br><br><br>
        <div>
            {{$t('condintion')}}<br><br>
            <ul>
                <li>{{$t('item_size_condition')}}</li>
                <li>{{$t('item_height_condition')}}</li>
                <li>{{$t('item_type_condition')}}</li>
                <li>{{$t('item_coocked_condition')}}</li>
            </ul>
        </div>
    </div>
</template>