import fxButton from './src/button.vue';

//给组件定义install方法
fxButton.install=Vue=>{
  Vue.component(fxButton.name,fxButton);
}

export default fxButton;