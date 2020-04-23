<template>
  <div class="fx-form">
    <slot></slot>
  </div>
</template>

<script>
import objectAssign from './../../utils/merge';
export default {
  name:"fxForm",
  componentName:"fxForm",
  provide() {
    return {
      fxForm: this
    };
  },
  props:{
    model: Object,
    rules: Object,
  },
  data(){
    return {
      fields: [],
    }
  },
  created(){
    this.$on('fx.form.addField', (field) => {
      if (field) {
        this.fields.push(field);
      }
    });
  },
  methods:{
    resetFields() {
      if (!this.model) {
        console.warn('[Element Warn][Form]model is required for resetFields to work.');
        return;
      }
      this.fields.forEach(field => {
        field.resetField();
      });
    },
    clearValidate(props = []) {
      const fields = props.length
        ? (typeof props === 'string'
          ? this.fields.filter(field => props === field.prop)
          : this.fields.filter(field => props.indexOf(field.prop) > -1)
        ) : this.fields;
      fields.forEach(field => {
        field.clearValidate();
      });
    },
    validate(callback) {
      if (!this.model) {
        console.warn('[Element Warn][Form]model is required for validate to work!');
        return;
      }

      let promise;
      // if no callback, return promise
      if (typeof callback !== 'function' && window.Promise) {
        promise = new window.Promise((resolve, reject) => {
          callback = function(valid) {
            valid ? resolve(valid) : reject(valid);
          };
        });
      }

      let valid = true;
      let count = 0;
      // 如果需要验证的fields为空，调用验证时立刻返回callback
      if (this.fields.length === 0 && callback) {
        callback(true);
      }
      let invalidFields = {};
      this.fields.forEach(field => {
        field.validate('', (message, field) => {
          if (message) {
            valid = false;
          }
          invalidFields = objectAssign({}, invalidFields, field);
          if (typeof callback === 'function' && ++count === this.fields.length) {
            callback(valid, invalidFields);
          }
        });
      });

      if (promise) {
        return promise;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.fx-form{
  display: flex;
  flex-direction: column;
}
</style>