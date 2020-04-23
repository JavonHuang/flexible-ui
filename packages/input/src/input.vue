<template>
  <div class="fx-input">
    <input v-bind:class="['fx-input—inner',blEmpty?'':'is-input']"
    ref="input"
    v-bind="$attrs"
    :type="showPassword?'text':type"
    @compositionstart="handleCompositionStart"
    @compositionupdate="handleCompositionUpdate"
    @compositionend="handleCompositionEnd"
    @blur="handleBlur"
    @input="handleInput"/>
    <label class="fx-input—label"><span>{{isRequired?'*':''}}</span>{{label}}</label>
    <i v-on:click="showPassword=!showPassword" v-if="type==='password'" class="iconfont fx-passworld"></i>
  </div>
</template>

<script>
import {getPropByPath,noop} from './../../utils/util';
import {isKorean} from './../../utils/shared';
import emitter from './../../mixins/emitter';
export default {
  name:"fxInput",
  componentName:"fxInput",
  mixins: [emitter],
  inheritAttrs: false,
  inject: {
    fxForm: {
      default: ''
    },
    fxFormItem: {
      default: ''
    }
  },
  props:{
    value: [String, Number],
    required:Boolean,
    label: String,
    validateEvent: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'text'
    },
  },
  computed:{
    form() {
      let parent = this.$parent;
      let parentName = parent.$options.componentName;
      while (parentName !== 'fxForm') {
        if (parentName !== 'fxFormItem') {
           break; 
        }
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      return parent;
    },
    blEmpty(){
      if(this.value!==null&&this.value!==''){
        return false;
      }else{
        return true;
      }
    },
    isRequired() {
      let rules = this.getRules();
      let isRequired = false;

      if (rules && rules.length) {
        rules.every(rule => {
          if (rule.required) {
            isRequired = true;
            return false;
          }
          return true;
        });
      }
      return isRequired||this.required;
    },
    nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value);
    }
  },
  data(){
    return{
      isComposing: false,
      showPassword:false
    }
  },
  mounted(){
    this.setNativeInputValue();
  },
  watch:{
    nativeInputValue(val) {
      this.setNativeInputValue();
      if (this.validateEvent) {
        this.dispatch('fxFormItem', 'fx.form.change', [val]);
      }
    },
  },
  methods:{
    getInput() {
      return this.$refs.input || this.$refs.textarea;
    },
    focusLeave(e){
      let that=this;
    },
    handleInput(event){
      if (event.target.value === this.nativeInputValue) return;
      this.$emit('input', event.target.value);
      this.$nextTick(this.setNativeInputValue);
    },
    setNativeInputValue(){
      const input = this.getInput();
        if (!input) return;
        if (input.value === this.nativeInputValue) return;
        input.value = this.nativeInputValue;
    },
    handleCompositionStart(event){
      this.isComposing = true;
    },
    handleCompositionUpdate(event){
      const text = event.target.value;
      const lastCharacter = text[text.length - 1] || '';
      this.isComposing = !isKorean(lastCharacter);
    },
    handleCompositionEnd(event){
      if (this.isComposing) {
        this.isComposing = false;
        this.handleInput(event);
      }
    },
    handleBlur(event){
      this.$emit('blur', event);
      if (this.validateEvent) {
        this.dispatch('fxFormItem', 'fx.form.blur', [this.value]);
      }
    },
    getRules() {
      let formRules = this.form.rules;
      const prop = getPropByPath(formRules, this.fxFormItem.prop || '');
      formRules = formRules ? (prop.o[this.fxFormItem.prop || ''] || prop.v) : [];
      return [].concat(formRules || []);
    },
  }
}
</script>

<style lang="scss" scoped>
.fx-input{
  position: relative;
  display: inline-block;
  .fx-input—label{
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
    &:disabled{
      background-color: transparent;
      cursor: not-allowed;
    }
  }
  .is-input+.fx-input—label{
    transform: scale(0.8);
    transform-origin: 0 0;
    top:0px!important;
    left: -6px!important;
    transition:all 0.2s;
  }
  .fx-input—inner:focus {
    // padding: 4px 4px 2px 4px;
    + .fx-input—label{
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
}
</style>