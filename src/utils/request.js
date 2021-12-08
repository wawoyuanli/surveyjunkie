/**封装ajax */
function requestAjax(options) {
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
export {
    requestAjax
}