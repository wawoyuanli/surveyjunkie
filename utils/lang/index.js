
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//获取cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
var cn = {
    services: '服务',
    affiliates: '附属公司和合作伙伴'
};
var en = {
    services: 'services',
    affiliates: 'Affiliates & Partners'
}
function getLang(m) {
    var lang = getCookie('lan') //语言版本
    switch (lang) {
        case 'cn':
            var t = cn[m];
            break;
        case 'en':
            var t = en[m];
            break;
        default:
            break;
    }

    //如果所选语言的json中没有此内容就选取其他语言显示
    if (t == undefined) t = cn[m];
    if (t == undefined) t = en[m];
    // if(t==undefined) t = hk[m];
    if (t == undefined) t = m; //如果还是没有就返回他的标识
    return t;
}
function setLang(name, value) {
    setCookie(name, value)
    var _self = $(this);
    var attr = _self.attr('set-lan').split(':');
    debugger
    // var position = a[0];   //文字放置位置
    // var mark = attr[1];   //文字的标识
    var lang = getCookie(name) //语言版本
    var t =null
    switch (lang) {
        case 'cn':
            t = cn[name];  //这里cn[m]中的cn是上面定义的json字符串的变量名，m是json中的键，用此方式读取到json中的值
            break;
        case 'en':
             t = en[name];
            break;
        default:
            break;
    }
    // debugger
    switch (name) {
        case 'html':
            _self.html(t);
            break;
        case 'val':
        case 'value':
            _self.val(t);
            break;
        default:
            _self.html(t);
    }
}

export {
    getLang,
    setLang
}