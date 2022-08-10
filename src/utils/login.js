// import { requestAjax} from './request.js'
/**登陆接口 */
import axios from 'axios'
function login() { 
  axios({
    method: 'POST',//提交方法
    url: 'https://localhost:9091/panel/online_money/pages/login',//提交地址
    data: {
    username:'',
    password:'11'
    }
  }).then((res) => {
  console.log(res);
    alert('提交成功！');
  }).catch()
  // if (!valideInput('username')) {
  //   alert("请输入用户名");
  // }
  // if (!valideInput("password")) {
  //   alert("请输入密码");
  // }
  
  // var ajaxObj = new XMLHttpRequest(); //https://customer.cloudtopsurvey.com/
  // ajaxObj.open('POST', '/panel/online_money/pages/login')
  // ajaxObj.setRequestHeader("Content-type", "application/json"); //application/x-www-form-urlencoded
  // // ajaxObj.send('surveyPlatform=sy-s&ipLine=1&username=1&password=1999');
  // ajaxObj.onreadystatechange = function () {
  //   if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
  //     console.log('数据返回成功');
  //     console.log(ajaxObj.responseText);
  //   }
  // }
  // ajaxObj.send('username=hyl&password=123456')
}
// 校验
function valideInput(id) { 
 return document.getElementById(id).value
}

axios({
  method: 'POST',//提交方法
  url: '/panel/online_money/pages/login',//提交地址
  params: {
  username:'',
  password:'11'
  }
}).then((res) => {
console.log(res);
  alert('提交成功！');
})

 