<template>
    <div class="el-input google-maps-address-field ">
        <input type="text" id="google_address_autocomplete"
               ref="google_address_autocomplete"
               v-model="iValue"
               class="el-input__inner"
               :placeholder="placeholder"/>
    </div>
</template>

<script>
import { isEmpty } from '~/js/helpers/Common';

    export default {

        props: {

            value: {
                type: String,
                default: '',
            },

            placeholder: {
                type: String,
                default: 'Address'
            },

            autocompleteOpts: {
                type: Object,
                default() {
                    return {};
                }
            }
        },

        computed: {
            iValue: {
                get() {
                    return this.value
                },
                set(v) {
                    this.$emit('input', v);
                },
            },
        },
        methods:{
            /**
             * Helper method to get and return the preferred city value form
             * Google Maps Autocomplete result.
             *
             * @param {object} place
             *   The getPlace() for Autocomplete result upon choosing a suggestion.
             *   e.g. autocomplete.getPlace()
             *
             * @return {string}
             */
            getCityValue(place) {
                let result = '';

                // Iterate and get "locality" value,
                // if there are none, just get "postal_code" as a fallback.
                _.each(place.address_components, (v) => {
                    if (
                        _.includes(v.types, 'locality') ||
                        _.includes(v.types, 'postal_town')
                    ) {
                        result = v.short_name;
                        return false; // Break the loop
                    }
                });
                return result;
            },
            getPostalCode(place){
                let result = '';
                _.each(place.address_components, (v) => {
                    if (
                        _.includes(v.types, 'postal_code')
                    ) {
                        result = v.short_name;
                        return false; // Break the loop
                    }
                });
                return result;
            },
            getCountryCode(place){
                let result = '';
                _.each(place.address_components, (v) => {
                    if (
                        _.includes(v.types, 'country')
                    ) {
                        result = v.short_name;
                        return false; // Break the loop
                    }
                });
                return result;
            },
        },

        mounted() {
            // Define the target element and instantiate it with google autocomplete.
            const input = document.getElementById('google_address_autocomplete');
            const autocomplete = new google.maps.places.Autocomplete(input, this.autocompleteOpts);

            // Add listener when a selection has been chosen or changed.
            autocomplete.addListener('place_changed', () => {
                //console.log(autocomplete.getPlace());
                const result = autocomplete.getPlace().formatted_address;
                let postal_code = this.getPostalCode(autocomplete.getPlace(),'postal_code');
                let country = this.getCountryCode(autocomplete.getPlace(),'country');
                let lat = autocomplete.getPlace().geometry.location.lat();
                let long= autocomplete.getPlace().geometry.location.lng();
                this.$emit('input', result);
                
                this.$emit('updateaddress',{
                    postal_code:postal_code,coorinates:lat+','+long
                });
            });

            // Reflect the previous value to the form as it's disappearing
            // when autocomplete is re-instantiated on mount.
            input.value = this.value;
        }
    };
</script>
