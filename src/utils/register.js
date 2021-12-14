/**注册接口 */
function registerHandler() { 
    if (!valideInput('username')) {
      alert("请输入用户名");
    }
    if (!valideInput("password")) {
      alert("请输入密码");
    }
    requestAjax({
      method: 'POST',
      url: "/manager/authorization/sys/login",
      data: {
        username: 'hyl',
        password:'123456'
      }
    }, function (res) { 
      console.log(res)
    })
    var ajaxObj = new XMLHttpRequest();
    ajaxObj.open('POST', '/manager/authorization/sys/login')
    ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxObj.send('username=hyl&password=123456');
    ajaxObj.onreadystatechange = function () {
      if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
        console.log('数据返回成功');
        console.log(ajaxObj.responseText);
      }
    }
  }
  // 校验
  function valideInput(id) { 
   return document.getElementById(id).value
  }
   