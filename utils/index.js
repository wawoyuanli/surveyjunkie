
function collapseHandle(tabId,contentId) { 
    document.getElementById(tabId).addEventListener('click', function () {
        document.getElementById(contentId).style.display = "none";
    })
}
export { 
    collapseHandle
}