<template>
  <div class="fx-select">
    <input class="fx-input—inner"/>
    <label class="fx-select—label"><span>{{isRequired?'*':''}}</span>{{label}}</label>
    <i class="iconfont fx-passworld"></i>
    <ul v-bind:class="[{
      'fx-select-ul':!open,
      'fx-select-up':open
      }]">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name:"fxSelect",
  componentName:"fxSelect",
  props:{
    value: [String, Number],
    required:Boolean,
    label: String,
    validateEvent: {
      type: Boolean,
      default: true
    },
    open:true
  },
  computed:{
    isRequired(){
      return true;
    }
  }
}
</script>

<style lang="scss" scoped>
.fx-select{
  position: relative;
  display: inline-block;
   .fx-select—label{
    position:absolute;
    display: inline-block;
    position: absolute;
    display: inline-block;
    top: 60%;
    left: -6px !important;
    transform: translateY(-50%);
    transition:all 0.2s;
    transform-origin: 0 0;
    font-size: 14px;
    span{
      color: #f56c6c;
      width: 6px;
      display: inline-block;
    }
   }
   .fx-input—inner{
    cursor: pointer;
    border: none;
    border-bottom: 1px solid #dcdfe6;
    outline: none;
    padding: 18px 4px 2px 0px;
    height: 100%;
    width: 180px;
    height: 36px;
    // margin: 0 6px;
    box-sizing: border-box;
  }
  .is-input+.fx-select—label{
    transform: scale(0.8);
    transform-origin: 0 0;
    top:0px!important;
    left: -6px!important;
    transition:all 0.2s;
  }
  .fx-input—inner:focus {
    // padding: 4px 4px 2px 4px;
    + .fx-select—label{
      transform: scale(0.8);
      transform-origin: 0 0;
      top:0px!important;
      left: -6px!important;
      transition:all 0.2s;
    }
  }
  .fx-passworld{
    position: absolute;
    bottom: 2px;
    right: 8px;
    cursor: pointer;
    color: #bfbfbf;
    display: none;
    &:hover{
      color: #2c2c2c;
    }
  }
  &:hover {
    .fx-passworld{
      display:inline-block!important;;
    }
  }
  .fx-select-ul{
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    position: absolute;
    background: #fff;
    margin: 0;
    width: 100%;
    max-height: 0px;
    overflow:auto;
    box-sizing: border-box;
    transition:all 0.3s;
  }
  .fx-select-up{
    max-height: 100px;
    overflow:auto;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    position: absolute;
    background: #fff;
    margin: 0;
    width: 100%;
    box-sizing: border-box;
    transition:all 0.3s;
    
  }
}
</style>