<template>
  <button class="fx-button" v-on:click="handleClick">
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
export default {
  name:"fxButton",
  componentName:"fxButton",
  methods:{
    handleClick(event){
      this.$emit('click',event);
    }
  }
}
</script>

<style lang="scss" scoped>
.fx-button{
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
  &:active{
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: none;
  }
  &:focus, &:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
}
</style>