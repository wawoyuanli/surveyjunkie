function acceptHandler() {
    document.getElementById('cookiebar').classList.add('isAccept')
    addCookie('accept_cookie',new Date().getTime().toString(),new Date().getTime().toString())
  }

  function addCookie(name, value, time) {
    var strSec = getSec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strSec * 1);
    //设置cookie的名称、值、失效时间
    document.cookie = name + "=" + value + ";expires=" + exp.toGMTString();
  }

  function getSec(str) {
    var str1 = str.substr(0, str.length - 1); //时间数值 
    var str2 = str.substr(str.length - 1, 1); //时间单位
    if (str2 == "s") {
      return str1 * 1000;
    } else if (str2 == "m") {
      return str1 * 60 * 1000;
    } else if (str2 == "h") {
      return str1 * 60 * 60 * 1000;
    } else if (str2 == "d") {
      return str1 * 24 * 60 * 60 * 1000;
    }
  }