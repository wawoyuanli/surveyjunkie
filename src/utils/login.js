
function loginbtn() { 
  if (!valideInput('username')) {
    alert("请输入用户名");
  }
  if (!valideInput("password")) {
    alert("请输入密码");
  }
  var ajaxObj = new XMLHttpRequest();
  ajaxObj.open('POST', '/manager/authorization/sys/login')
  ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  ajaxObj.send('username=hyl&password=123456');
  ajaxObj.onreadystatechange = function () {
    // 为了保证 数据 完整返回，我们一般会判断 两个值
    if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
      // 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
      // 5.在注册的事件中 获取 返回的 内容 并修改页面的显示
      console.log('数据返回成功');
      // 数据是保存在 异步对象的 属性中
      console.log(ajaxObj.responseText);
    }
  }
}
document.getElementById('login_btn').addEventListener('click',loginbtn())
// 校验
function valideInput(id) { 
 return document.getElementById(id).value
}
// (function () { 
//   function loginbtn() { 
//     debugger
//     document.getElementById("login_btn").addEventListener("click", function () {
//       if (!valideInput('username')) {
//         alert("请输入用户名");
//       }
//       if (!valideInput("password")) {
//         alert("请输入密码");
//       }
//       var ajaxObj = new XMLHttpRequest();
//       ajaxObj.open('POST', '/manager/authorization/sys/login')
//       ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//       ajaxObj.send('username=hyl&password=123456');
//       ajaxObj.onreadystatechange = function () {
//         // 为了保证 数据 完整返回，我们一般会判断 两个值
//         if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
//           // 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
//           // 5.在注册的事件中 获取 返回的 内容 并修改页面的显示
//           console.log('数据返回成功');
//           // 数据是保存在 异步对象的 属性中
//           console.log(ajaxObj.responseText);
//         }
//       }
//     });
//   }
//   //校验
//   function valideInput(id) { 
//    return document.getElementById(id).value
//   }
// })()
// window.onload=loginbtn()