<template>
  <li>{{label}}</li>
</template>

<script>
export default {
  name:"fxOption",
  componentName:"fxOption",
  props:{
    value: {
      required: true
    },
    label: [String, Number],
    open:true
  }
}
</script>

<style lang="scss" scoped>
.fx-option{
  // transition: all 0.5s;
  //   display: none;
}
</style>