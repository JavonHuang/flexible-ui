import fxSelect from './src/select.vue';
import fxOption from './src/option.vue';
//给组件定义install方法
fxSelect.install=Vue=>{
  Vue.component(fxSelect.name,fxSelect);
}
//给组件定义install方法
fxOption.install=Vue=>{
  Vue.component(fxOption.name,fxOption);
}
export {fxSelect,fxOption};