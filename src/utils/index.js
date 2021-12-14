/**给元素标签添加类 */
// export function addClass(tabId, contentId) {
//   var _tabId = document.getElementById(tabId);
//   var _contentId = document.getElementById(contentId);
//   _tabId.onmouseover = function () {
//     _contentId.classList.add("curent_active_show");
//   };
// }
// export function removeClass(contentId) {
//   document.getElementById(contentId).onmouseover = function () {
//     this.classList.add("curent_active_show");
//   };
//   document.getElementById(contentId).onmouseout = function () {
//     this.classList.remove("curent_active_show");
//   };
// }
// /**点击显示提示 */
// export function showToast(id) {
//   var toastid = document.getElementById(id);
//   toastid.addEventListener("click", function () {
//     alert("敬请期待");
//   });
// }
// /**点击跳转 */
// export function route(id, url) {
//   var _id = document.getElementById(id);
//   _id.addEventListener("click", function () {
//     window.location.href = url;
//   });
// }
/**导出 */
// export {
//     addClass,
//     removeClass,
//     showToast,
//     route
// }
 const name = 'hyl'
// const name='hyl'
// module.exports = {
//   name
// }
export { 
  name
}
