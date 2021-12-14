/**注册接口 */
function registerHandler() {
  if (!valideInput('username')) {
    alert("请输入用户名");
  }
  if (!valideInput("password")) {
    alert("请输入密码");
  }
  var ajaxObj = new XMLHttpRequest();
  ajaxObj.open('POST', '/manager/authorization/sys/register/100')
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
// $("#registerbtn").click(function () {
//   requestAjax({
//     url: "/manager/authorization/sys/register/100",
//     async: true,
//     method: "POST",
//     data: {
//       username: getInputvalueById("username"),
//       password: getInputvalueById("passworSd"),
//     },
//     success: function (data) {
//       console.log(data);
//     },
//   });
// }); 