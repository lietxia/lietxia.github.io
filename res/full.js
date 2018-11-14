
//载入全屏脚本
var new_script = document.createElement("script");
new_script.setAttribute("src", "https://lietxia.github.io/res/screenfull.min.js");
new_script.async = true;
document.body.appendChild(new_script);

//原来的百度脚本
var new_script = document.createElement("script");
new_script.setAttribute("src", "http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=399644784#x");
document.body.appendChild(new_script);

var new_script = document.createElement("script");

window.onload = function () {
    var con;
    con = confirm("是否全屏？"); //在页面上弹出对话框
    if (con == true) {
        //const el = document.getElementById('layaContainer');
        screenfull.request();
    }
}





