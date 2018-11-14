
var new_script = document.createElement("script");
new_script.setAttribute("src", "https://lietxia.github.io/res/screenfull.min.js");
document.body.appendChild(new_script);

var new_script = document.createElement("script");
new_script.setAttribute("src", "http://push.zhanzhang.baidu.com/push.js?123");
document.body.appendChild(new_script);

window.onload = function () {
    var con;
    con = confirm("是否全屏？"); //在页面上弹出对话框
    if (con == true) {
        screenfull.request(document.getElementById('layaContainer'));
    }
}




