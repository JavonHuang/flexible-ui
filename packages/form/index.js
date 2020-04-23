import fxForm from './src/form.vue';
import fxFormItem from './src/form-item.vue';
//给组件定义install方法
fxForm.install=Vue=>{
  Vue.component(fxForm.name,fxForm);
}
fxFormItem.install=Vue=>{
  Vue.component(fxFormItem.name,fxFormItem);
}
export {fxForm,fxFormItem};