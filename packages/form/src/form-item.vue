<template>
  <div class="fx-form-item">
    <slot></slot>
    <span ref="msg" v-bind:class="[{
      'fx-error':true,
      'is-required':isRequired,
      'is-error':validateState=='error'
      }]">{{validateMessage}}</span>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator';
import objectAssign from './../../utils/merge';
import {getPropByPath,noop} from './../../utils/util';
import emitter from './../../mixins/emitter';
export default {
  name:"fxFormItem",
  componentName:"fxFormItem",
  mixins: [emitter],
  provide() {
    return {
      fxFormItem: this
    };
  },
  inject: ['fxForm'],
  props:{
    prop: String,
    required: {
      type: Boolean,
      default: undefined
    },
    rules: [Object, Array]
  },
  computed:{
    form() {
      let parent = this.$parent;
      let parentName = parent.$options.componentName;
      while (parentName !== 'fxForm') {
        if (parentName === 'fxFormItem') {
          this.isNested = true;
        }
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      return parent;
    },
    fieldValue() {
      const model = this.form.model;
      if (!model || !this.prop) { return; }

      let path = this.prop;
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.');
      }

      return getPropByPath(model, path, true).v;
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
      return isRequired;
    }
  },
  watch:{
    validateMessage(val){
      this.$nextTick(this.setMarginBottom());
    }
  },
  data() {
    return {
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      validator: {}
    };
  },
  mounted(){
    // this.dispatch('fxForm', 'fx.form.addField', [this]);
    // this.addValidateEvents();
    if (this.prop) {
      this.dispatch('fxForm', 'fx.form.addField', [this]);

      let initialValue = this.fieldValue;
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue);
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      });

      this.addValidateEvents();
    }
  },
  methods:{
    validate(trigger, callback = noop){
      this.validateDisabled = false;
      const rules = this.getFilteredRule(trigger);
      if ((!rules || rules.length === 0) && this.required === undefined) {
        callback();
        return true;
      }
      // this.validateState = 'validating';
      const descriptor = {};
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger;
        });
      }
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      const model = {};
      model[this.prop] = this.fieldValue;
      validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
        this.validateState = !errors ? 'success' : 'error';
        this.validateMessage = errors ? errors[0].message : '';

        callback(this.validateMessage, invalidFields);
        this.fxForm && this.fxForm.$emit('validate', this.prop, !errors, this.validateMessage || null);
      });
    },
    clearValidate() {
      this.validateState = '';
      this.validateMessage = '';
      this.validateDisabled = false;
    },
    resetField() {
      this.validateState = '';
      setTimeout(()=>{
        this.validateMessage = '';
      },300)

      let model = this.form.model;
      let value = this.fieldValue;
      let path = this.prop;
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.');
      }

      let prop = getPropByPath(model, path, true);

      this.validateDisabled = true;
      if (Array.isArray(value)) {
        prop.o[prop.k] = [].concat(this.initialValue);
      } else {
        prop.o[prop.k] = this.initialValue;
      }

      // reset validateDisabled after onFieldChange triggered
      this.$nextTick(() => {
        this.validateDisabled = false;
      });

      this.broadcast('fxTimeSelect', 'fieldReset', this.initialValue);
    },
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter(rule => {
        if (!rule.trigger || trigger === '') return true;
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1;
        } else {
          return rule.trigger === trigger;
        }
      }).map(rule => objectAssign({}, rule));
    },
    getRules() {
      let formRules = this.form.rules;
      const selfRules = this.rules;
      const requiredRule = this.required !== undefined ? { required: !!this.required } : [];

      const prop = getPropByPath(formRules, this.prop || '');
      formRules = formRules ? (prop.o[this.prop || ''] || prop.v) : [];

      return [].concat(selfRules || formRules || []).concat(requiredRule);
    },
    onFieldBlur(event){
      this.validate('blur');
    },
    onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false;
        return;
      }
      this.validate('change');
    },
    addValidateEvents() {
      const rules = this.getRules();

      if (rules.length || this.required !== undefined) {
        this.$on('fx.form.blur', this.onFieldBlur);
        this.$on('fx.form.change', this.onFieldChange);
      }
    },
    removeValidateEvents() {
      this.$off();
    },
    setMarginBottom(val){
      setTimeout(()=>{
        if(this.$refs.msg&&this.$refs.msg.clientHeight>15){
          if(this.$refs.msg.parentNode.style.marginBottom==this.$refs.msg.clientHeight)
          return false;
          this.$refs.msg.parentNode.style.marginBottom=this.$refs.msg.clientHeight+'px';
        }else{
          this.$refs.msg.parentNode.style.marginBottom=15+'px';
        }
      },0)
    }
  }
}
</script>

<style lang="scss" scoped>
.fx-form-item{
  position: relative;
  display: inline-block;
  margin-bottom: 15px;
  transition:all 0.3s;
  width: 200px;
  .fx-error{
    display: block;
    color: #f56c6c;
    position: absolute;
    text-align: left;
    left: 6px;
    font-size: 12px;
    transform-origin:right top;
    -moz-transform:rotateX(90deg);
    -webkit-transform:rotateX(90deg);
    -o-transform:rotateX(90deg);
    transform:rotateX(90deg);
    transition:all 0.3s;
    /*IE*/
    filter:FlipV;
    transition:all 0.3s;
  }
  .is-error {
    transform-origin:right top;
    -moz-transform:rotateX(0deg);
    -webkit-transform:rotateX(0deg);
    -o-transform:rotateX(0deg);
    transform:rotateX(0deg);
    transition:all 0.3s;
    /*IE*/
    filter:FlipV;
    transition:all 0.3s;
  }
}
</style>