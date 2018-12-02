
window.loopcnt = 0;
var newdiv = document.createElement('div');
newdiv.setAttribute('class', 'footer');
newdiv.setAttribute('id', 'div_b');
newdiv.style.cssText = 'height:60px;background:green;width:100%;position:fixed;bottom:0;left:0;';
newdiv.innerHTML = '<input type="button" value="(循环)满4人即开" onclick="loop_start()" > 检查次数:<span id="lcnt">' + window.loopcnt + '</span>';
document.body.appendChild(newdiv);

function loop_start() {
    window.loop = setInterval(check_list, 10000);
    document.getElementById('div_b').innerHTML = '<input type="button" value="停止循环" onclick="loop_stop()" >检查次数:<span id="lcnt">' + window.loopcnt + '</span>';
}

function loop_stop() {
    clearInterval(window.loop);
    document.getElementById('div_b').innerHTML = '<input type="button" value="(循环)满4人即开" onclick="loop_start()" >检查次数:<span id="lcnt">' + window.loopcnt + '</span>';
}

function check_list() {
    //检查
    window.loopcnt++;
    var pcnt = 0;
    var _span_ = document.getElementsByTagName('span');
    for (var i = 0; i < _span_.length; i++) {
        if (_span_[i].innerText === '准备开始') {
            pcnt++;
            _span_[i].parentNode.setAttribute('id', 'sbt_' + pcnt);
        }
        if (_span_[i].innerText === '对局开始') {
            _span_[i].parentNode.setAttribute('id', 'btn_st');
        }
        if (_span_[i].innerText === '随机坐席（后台）') {
            _span_[i].parentNode.setAttribute('id', 'btn_rand');
        }
    }
    console.log("检查，人数=" + pcnt);
    if (pcnt >= 4) {
        document.getElementById('sbt_1').click();
        setTimeout('pcnt', 1000);
        document.getElementById('sbt_2').click();
        setTimeout('pcnt', 1000);
        document.getElementById('sbt_3').click();
        setTimeout('pcnt', 1000);
        document.getElementById('sbt_4').click();
        setTimeout('pcnt', 1000);
        document.getElementById('btn_rand').click();
        setTimeout('pcnt', 1000);
        document.getElementById('btn_st').click();
    }
    document.getElementById('lcnt').innerText = window.loopcnt;

}
