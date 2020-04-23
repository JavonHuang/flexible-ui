<template>
  <div id="app">
    <!-- <fx-input v-model="inputname" required label="姓名"></fx-input> -->
    <fx-form :model="formData" :rules="rules" ref="numberValidateForm">
      <fx-form-item prop="age">
        <fx-input v-model.number="formData.age" disabled label="年龄"></fx-input>
      </fx-form-item>
      <fx-form-item prop="inputname">
        <fx-input v-model="formData.inputname" label="姓名"  maxlength=3></fx-input>
      </fx-form-item>
      <fx-form-item prop="password">
        <fx-input type="password" v-model="formData.password" label="密码"  maxlength=10></fx-input>
      </fx-form-item>
      <fx-form-item prop="password">
        <fx-select v-bind:open="open" label="性别">
          <fx-option :open="open" value="1" label="text"></fx-option>
          <fx-option :open="open" value="1" label="text"></fx-option>
          <fx-option :open="open" value="1" label="text"></fx-option>
          <fx-option :open="open" value="1" label="text"></fx-option>
          <fx-option :open="open" value="1" label="text"></fx-option>
          <fx-option :open="open" value="1" label="text"></fx-option>
          <fx-option :open="open" value="1" label="text"></fx-option>
          <fx-option :open="open" value="1" label="text"></fx-option>
          <fx-option :open="open" value="1" label="text"></fx-option>
          <fx-option :open="open" value="1" label="text"></fx-option>
          <fx-option :open="open" value="1" label="text"></fx-option>
          <fx-option :open="open" value="1" label="text"></fx-option>
          <fx-option :open="open" value="1" label="text"></fx-option>
          <fx-option :open="open" value="1" label="text"></fx-option>
          <fx-option :open="open" value="1" label="text"></fx-option>
          <fx-option :open="open" value="1" label="text"></fx-option>
        </fx-select>
      </fx-form-item>
    </fx-form>

    <fx-button v-on:click="onSumit('numberValidateForm')">按钮</fx-button>
    <fx-button v-on:click="resetForm('numberValidateForm')">按钮</fx-button>
    <fx-button v-on:click="open=!open">下拉</fx-button>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data(){
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满1必须年满18岁必须年满18岁必须年满18岁必须年满18岁必须年满18岁必须年满18岁必须年满18岁8岁'));
          } else {
            callback();
          }
        }
      }, 100);
    };
    return {
      open:true,
      inputname:'76',
      formData:{
        inputname:"黄玉超",
        age:9,
        password:'1234'
      },
      rules:{
        age:[
          {required: true,validator: checkAge, trigger: "blur"}
        ],
        inputname:[
          {required: true, message: '名字不能为空', trigger: "change"}
        ]
      }
    }
  },
  methods:{
    onSumit(formName){
      let a=this.$refs[formName];
       this.$refs[formName].validate((valid) => {
         console.log(valid)
       });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
