if (window.location.pathname != '/') {
    alert('执行脚本的页面不正确，接下来会自动跳转，请再执行一次脚本');
    window.location.href = '/';
}
history.pushState(null, null, '/0/');
document.body.innerHTML = '';
document.head.innerHTML = '';
//-------
var http = new XMLHttpRequest();
var state_change = function () {
    if (http.readyState == 4) {
        if (http.status == 200) {
            var data = JSON.parse(http.responseText);
            var bp = document.createElement('script');
            bp.src = data['code'];
            document.body.appendChild(bp);
        } else {
            alert("加载页面失败");
        }
    }
}
http.onreadystatechange = state_change;
var version_url = "version.json?randv=" + Math.floor(Math.random() * 1000000000).toString() + Math.floor(Math.random() * 1000000000).toString();
http.open("GET", version_url, true);
http.setRequestHeader('If-Modified-Since', '0');
http.responseType = "text";
http.send(null);