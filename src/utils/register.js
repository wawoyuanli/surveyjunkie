/**注册接口 */
// loginName  :   String  	 //账号
// email 	   :   String 	 	//邮箱
// password   :	   String 	//密码
// sex        :    String    //0-男  1-女
// surveyBirthdayYear ： String  //出生日期
function register() {
  // if (!valideInput('username')) {
  //   alert("请输入用户名");
  // }
  // if (!valideInput("email")) {
  //   alert("请输入邮箱账号");
  // }
  var ajaxObj = new XMLHttpRequest();  ///online_money/pages/register/102
  ajaxObj.open('POST', '/panel/online_money/pages/register/102')
  ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  ajaxObj.send('loginName=hyl&password=123456&email=1583649818@qq.com&sex=1&surveyBirthdayYear=1997-03-03');
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