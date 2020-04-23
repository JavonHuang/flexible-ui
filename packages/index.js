import fxButton from './button';
import fxInput from './input';
import {fxForm,fxFormItem} from './form';
import {fxSelect,fxOption} from './select';
//字体图标
import './fonts/font.scss'
// import './iconfont/iconfont.css'
//把所有的组件存储起来

const components=[
  fxButton,
  fxInput,
  fxForm,
  fxFormItem,
  fxSelect,
  fxOption
];

const install = Vue => {
  //判断组件是否安装，如果已经安装了就不在安装。
  if(install.installed) return;
  install.installed=true;
  //遍历的方式注册所有的组件
  components.map(component=>Vue.use(component));
}

//检查是否vue是否安装，满足才执行
if(typeof window !=="undefined" && window.Vue){
  install(window.Vue);
}

export default {
  //所有的组件必须有一个install的方法，才能通过Vue.use()进行按需注册
  install,
  ...components
}