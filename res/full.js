
//载入全屏脚本
var new_script = document.createElement("script");
new_script.setAttribute("src", "https://lietxia.github.io/res/screenfull.min.js");
new_script.async = true;
document.body.appendChild(new_script);

//原来的百度脚本
var new_script = document.createElement("script");
new_script.setAttribute("src", "http://push.zhanzhang.baidu.com/push.js?123");
document.body.appendChild(new_script);

var new_script = document.createElement("script");


$(function(){
    con = confirm("是否全屏？"); 
    if (con == true) {
        screenfull.request();
    }
  });




