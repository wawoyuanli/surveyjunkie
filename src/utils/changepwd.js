
/**登陆接口 */
function login() { 
    if (!valideInput('username')) {
      alert("请输入用户名");
    }
    if (!valideInput("password")) {
      alert("请输入密码");
    }
    
    var ajaxObj = new XMLHttpRequest();
    ajaxObj.open('POST', '/online_money/pages/login')
    ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxObj.send('username=hyl&password=123456');
    ajaxObj.onreadystatechange = function () {
      if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
        console.log('数据返回成功');
        console.log(ajaxObj.responseText);
      }else{
        alert('请求失败')
      }
    }
  }
  // 校验
  function valideInput(id) { 
   return document.getElementById(id).value
  }
   