<template>
  <masked-input
    type="text"
    name="phone"
    class="form-control"
    v-model="phone"
    :mask="[/[7-8]/,'(', /[8-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
    :guide="true"
    placeholderChar="_">
  </masked-input>
</template>
 
<script>
  import MaskedInput from 'vue-text-mask'
 
  export default {
    name: 'name',
 
    components: {
      MaskedInput
    },
 
    data () {
      return {
        phone: '8'
      }
    }
  }
</script> 