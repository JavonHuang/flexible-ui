import fxInput from './src/input.vue';

//给组件定义install方法
fxInput.install=Vue=>{
  Vue.component(fxInput.name,fxInput);
}

export default fxInput;