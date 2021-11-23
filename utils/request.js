/**封装ajax */
function requestAjax(options) {
    debugger
    var params = formsParams(options.data);
    var xhr = null
    /**兼容处理 */
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    /**连接 */

    if (options.method === 'GET') {
        xhr.open(options.method, options.url + "?" + params, options.async);
        xhr.send(null)
    } else if (options.method === 'POST') {
        xhr.open(options.method, options.url, options.async);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
    xhr.onreadystatechange = function () {
        debugger
        if (xhr.readyState == 4 && xhr.status == 200) {
            options.success(xhr.responseText);
        }
    }
}
function formsParams(data) {
    var arr = [];
    for (var prop in data) {
        arr.push(prop + "=" + data[prop]);
    }
    return arr.join("&");
}
/**例子 */
// requestAjax({
//     url : "https://www.salientsurveys.com",  // url---->地址
//     method : "POST",   // method ---> 请求方式
//     async : true,   // async----> 同步：false，异步：true 
//     data : {        //传入信息
//         name : "张三",
//         age : 18
//     },
//     success : function(data){   //返回接受信息
//         console.log(data);
//     },
//     fail: function (err) { 
//         console.log(err);
//     }
// })

export {
    requestAjax
}