if (window.location.pathname != '/') {
  alert('执行脚本的页面不正确，接下来会自动跳转，请再执行一次脚本');
  window.location.href = '/';
} else {
  history.pushState(null, null, '/dhs/');
  document.getElementsByTagName('style')[0].remove();
  document.getElementsByTagName('style')[0].remove();
  document.body.innerHTML = '';
  //-------

  var new_script = document.createElement('div');
  new_script.setAttribute('id', "root")
  document.body.appendChild(new_script);

  var new_script = document.createElement('script');
  new_script.setAttribute('src', '/dhs/manifest.ed14eec5.js')
  new_script.setAttribute('charset', "utf-8");
  document.body.appendChild(new_script);

  var new_script = document.createElement('script');
  new_script.setAttribute('src', 'https://lietxia.github.io/maj/vendors~app~vendor.19ac4945.js')
  new_script.setAttribute('charset', "utf-8");
  document.body.appendChild(new_script);

  var new_script = document.createElement('script');
  new_script.setAttribute('src', '/dhs/vendors~app.cedcf233.js');
  new_script.setAttribute('charset', "utf-8");
  document.body.appendChild(new_script);

  var new_script = document.createElement('script');
  new_script.setAttribute('src', '/dhs/app.ca9d912f.js');
  new_script.setAttribute('charset', "utf-8");
  document.body.appendChild(new_script);

  var new_script = document.createElement('script');
  new_script.setAttribute('src', '/dhs/vendor.3098fd65.js');
  new_script.setAttribute('charset', "utf-8");
  document.body.appendChild(new_script);


  //创建工具栏
  //样式表
  function create_toolbox() {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'body{overflow-x:hidden;} ' +
      '#tool_div{background:#bbbcce;width:100%;position:fixed;bottom:0;left:0;} ' +
      '#root{padding-bottom:200px;}' +
      '#ifr{height:40px;width:60%;}' +
      '#tool_div div{width:30%;display:inline-block;vertical-align:middle;}' +
      '#add_player_text{width:100%;height:40px;}' +
      '#start_ta{width:60%;height:35px;}';
    document.head.appendChild(style);

    var tool_div = document.createElement('div');
    tool_div.setAttribute('id', 'tool_div');

    //<--div
    var new_div = document.createElement('div');

    var new_lable = document.createElement('lable');
    new_lable.setAttribute('for', 'cid');
    new_lable.innerText = '赛事ID:';
    new_div.appendChild(new_lable);
    var new_ipt = document.createElement('input');
    new_ipt.setAttribute('size', '2');
    new_ipt.setAttribute('type', 'text');
    new_ipt.setAttribute('value', '14');
    new_ipt.setAttribute('id', 'cid');
    new_div.appendChild(new_ipt);

    new_div.appendChild(document.createElement('br'));

    var new_lable = document.createElement('lable');
    new_lable.setAttribute('for', 'c_round');
    new_lable.innerText = '回合:';
    new_div.appendChild(new_lable);
    var new_ipt = document.createElement('input');
    new_ipt.setAttribute('type', 'text');
    new_ipt.setAttribute('size', '2');
    new_ipt.setAttribute('value', '1');
    new_ipt.setAttribute('id', 'c_round');
    new_div.appendChild(new_ipt);

    new_div.appendChild(document.createElement('br'));

    var new_lable = document.createElement('lable');
    new_lable.setAttribute('for', 'c_date');
    new_lable.innerText = '日期';
    new_div.appendChild(new_lable);
    var new_ipt = document.createElement('input');
    new_ipt.setAttribute('type', 'text');
    new_ipt.setAttribute('size', '10');
    new_ipt.setAttribute('id', 'c_date');
    var d = new Date();
    var nowstr = d.getFullYear();
    nowstr += (d.getMonth() < 10 ? "-0" : '-') + (d.getMonth() + 1);
    nowstr += (d.getDate() < 10 ? "-0" : '-') + d.getDate();
    new_ipt.setAttribute('value', nowstr);
    new_div.appendChild(new_ipt);

    tool_div.appendChild(new_div);
    //div-->

    //<--div-tools
    var div_tools = document.createElement('div');
    div_tools.setAttribute('id', 'div-tools');

    var new_btn = document.createElement('input');
    new_btn.setAttribute('type', 'button');
    new_btn.setAttribute('onclick', 'init_list()');
    new_btn.setAttribute('value', '获取成员列表');
    div_tools.appendChild(new_btn);

    var new_btn = document.createElement('input');
    new_btn.setAttribute('type', 'button');
    new_btn.setAttribute('onclick', 'init_start()');
    new_btn.setAttribute('value', '开始某个组');
    div_tools.appendChild(new_btn);

    var new_btn = document.createElement('input');
    new_btn.setAttribute('type', 'button');
    new_btn.setAttribute('onclick', 'send_data()');
    new_btn.setAttribute('value', '读取牌谱');
    div_tools.appendChild(new_btn);

    var new_btn = document.createElement('input');
    new_btn.setAttribute('type', 'button');
    new_btn.setAttribute('onclick', 'init_all()');
    new_btn.setAttribute('value', '重载数据');
    div_tools.appendChild(new_btn);

    tool_div.appendChild(div_tools);

    //div-tools->

    //<--div2
    var new_div2 = document.createElement('div');
    new_div2.setAttribute('id', 'box');
    tool_div.appendChild(new_div2);
    //div2-->

    document.body.appendChild(tool_div);
  } //func-->
  create_toolbox();
} //else-->


//----init类---
function init_all() {
  window.team = 1;
  window.cls = 1;
}

function init_list() { //添加一些成员
  var box = document.getElementById('box');
  box.innerHTML = '';

  var cid = document.getElementById('cid').value;

  if (!(typeof window.team === "object")) {
    window.team = get_json('https://cors.io/?https://mahjong.pub/api/data.php?t=team&cid=' + cid);
  }
  var arr = ['', 'null'];
  var tmp = '';
  for (row in window.team) {
    tmp = window.team[row]['t_player'] + "\n" + window.team[row]['t_sub'];
    arr = arr.concat(tmp.split(/\s+/));
  }
  var res = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    var obj = arr[i];
    for (var j = 0, jlen = res.length; j < jlen; j++) {
      if (res[j] === obj) break;
    }
    if (jlen === j) res.push(obj);
  }
  res.shift();
  res.shift();


  var new_textarea = document.createElement('textarea');
  new_textarea.setAttribute('id', 'add_player_text');
  new_textarea.value = res.join("\n");
  box.appendChild(new_textarea);

  var new_btn = document.createElement('input');
  new_btn.setAttribute('type', 'button');
  new_btn.setAttribute('onclick', 'add_player()');
  new_btn.setAttribute('value', '加入参赛名单');
  box.appendChild(new_btn);

  return res;
} //func-->


function init_start() {
  var box = document.getElementById('box');
  box.innerHTML = '';
  var cid = document.getElementById('cid').value;
  var c_round = document.getElementById('c_round').value;

  var new_ta = document.createElement('textarea');
  new_ta.setAttribute('id', 'start_ta');
  box.appendChild(new_ta);

  var new_btn = document.createElement('input');
  new_btn.setAttribute('type', 'button');
  new_btn.setAttribute('onclick', 'start_class()');
  new_btn.setAttribute('value', '开始');
  box.appendChild(new_btn);

  box.appendChild(document.createElement('br'));

  if (!(typeof window.team === "object")) {
    window.team = get_json('https://cors.io/?https://mahjong.pub/api/data.php?t=team&cid=' + cid);
  }
  if (!(typeof window.cls === "object")) {
    window.cls = get_json('https://cors.io/?https://mahjong.pub/api/data.php?t=class&cid=' + cid);
  }
  if (window.cls === null) {
    return alert('此赛事还没分组，或读取分组失败，请按【重载数据】')
  }
  var cls_count = 0;
  for (var i = 0; i < window.cls.length; i++) {
    if (window.cls[i]['round'] == c_round && window.cls[i]['t_class'] > cls_count) {
      cls_count = window.cls[i]['t_class'];
    }
  }
  for (var i = 1; i <= cls_count; i++) {
    var new_btn = document.createElement('input');
    new_btn.setAttribute('type', 'button');
    new_btn.setAttribute('onclick', 'get_cls(' + i + ')');
    new_btn.setAttribute('value', i + '组');
    box.appendChild(new_btn);
  }

}

//-------
function get_json(url) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, false);
  xmlhttp.send();
  if (xmlhttp.status === 200) {
    return JSON.parse(xmlhttp.responseText);
  } else {
    return null;
  }
}

function sleep(ms) { //暂停
  return new Promise(resolve => setTimeout(resolve, ms));
}

function set_value(type, txt) { //设置值
  var last = window.ee.length - 1;
  window.ee[last][type] = txt;
  window.pp[last].updater.enqueueSetState(window.pp[last], window.ee[last], null, "setState");
}

function get_cls(cls) {
  var cid = document.getElementById('cid').value;
  var c_round = document.getElementById('c_round').value;

  arr = get_json('https://cors.io/?https://mahjong.pub/api/majsoul.php?cid=' + cid + '&r=' + c_round + '&c=' + cls);
  if (arr === null) { return alert('获取第' + cls + '组开赛名单失败') }
  document.getElementById('start_ta').value = arr;
}

async function add_player(str) {
  if (typeof str === 'undefined') {
    str = document.getElementById("add_player_text").value;
  }
  document.querySelector('#root>div>header>div>div:nth-child(3)>div>div>div>div>button:nth-child(1)').click();
  await sleep(2000);
  window.ee = []; //重设缓存
  window.pp = []; //重设缓存
  document.querySelector('#root>div>header>div>div:nth-child(3)>div>div>div>div>button:nth-child(2)').click();
  await sleep(3000);
  document.querySelector('#root>div>div>main>div:nth-child(2)>div>div>button:nth-child(3)').click();
  await sleep(1000);
  var eelast = window.ee.length - 1;
  window.ee[eelast].query = str;
  window.pp[eelast].updater.enqueueSetState(window.pp[eelast], window.ee[eelast], null, "setState");
  await sleep(1000);
  document.querySelector('body>div>div:nth-child(2)>div>div:nth-child(3)>button').click();
  await sleep(1000);
  document.querySelector('body>div>div:nth-child(2)>div>div:nth-child(3)').lastChild.click();
}

async function start_class() {
  var narr = [];
  var parr = [];
  var tmp = [];
  var ta = document.getElementById('start_ta').value.split(/[\r\n]+/);
  console.log(ta);
  for (var i = 0; i < ta.length; i++) {
    tmp = ta[i].replace(/^\s+|\s+$/g, '').split(/[\s]+/);
    if (tmp.length === 1) {
      narr[i] = '';
      parr[i] = tmp[0];
    } else {
      narr[i] = tmp[0];
      parr[i] = tmp[1];
    }
  }

  document.querySelector('#root>div>header>div>div:nth-child(3)>div>div>div>div>button:nth-child(1)').click();
  await sleep(3000);
  window.ee = []; //重设缓存
  window.pp = []; //重设缓存
  document.querySelector('#root>div>header>div>div:nth-child(3)>div>div>div>div>button:nth-child(3)').click();
  await sleep(5000);

  var list = document.querySelector('#root>div>div>main>div:nth-child(2)>div>div>div>div:nth-child(2)>ul').childNodes;
  var set = [0, 0, 0, 0];
  var cnt = 0;

  for (var ii = 0; ii < 4; ii++) {
    if (narr[ii] === null || narr[ii] === '') {
      document.querySelector('#root>div>div>main>div:nth-child(2)>div>div>div:nth-child(2)>div:nth-child(3)>button').click();
      set[ii] = parr[ii];
      cnt++;
      await sleep(2000);
    } else {
      for (var i = 0; i < list.length; i++) {
        if (list[i].childNodes[0].childNodes[0].innerText == narr[ii]) {
          list[i].childNodes[1].childNodes[0].click();
          set[ii] = parr[ii];
          cnt++;
          await sleep(2000);
        }
      }
    }
  }

  var eelast = window.ee.length - 1;
  window.ee[eelast].prepareSlot[0].initPoint = set[0];
  window.ee[eelast].prepareSlot[1].initPoint = set[1];
  window.ee[eelast].prepareSlot[2].initPoint = set[2];
  window.ee[eelast].prepareSlot[3].initPoint = set[3];
  window.pp[eelast].updater.enqueueSetState(window.pp[eelast], window.ee[eelast], null, "setState");

  if (cnt === 4) {
    //----點擊隨機按鈕---
    document.querySelector('#root>div>div>main>div:nth-child(2)>div>div>div:nth-child(2)>div:nth-child(2)>label:nth-child(2)>span>span>input').click();
    document.querySelector('#root>div>div>main>div:nth-child(2)>div>div>div:nth-child(2)>div:nth-child(3)').lastChild.click();
  }
}

async function send_data() {
  var box = document.getElementById('box');
  box.innerHTML = '';
  document.querySelector('#root>div>header>div>div:nth-child(3)>div>div>div>div>button:nth-child(1)').click();
  await sleep(3000);
  window.ee = []; //重设缓存
  window.pp = []; //重设缓存
  window.tb = []; //重设缓存
  document.querySelector('#root>div>header>div>div:nth-child(3)>div>div>div>div>button:nth-child(4)').click();
  await sleep(5000);
  var nowstr = document.getElementById('c_date').value;
  var x = document.getElementsByTagName('tr');
  for (var i = 1; i < x.length; i++) {
    if (x[i].childNodes[1].innerText.indexOf(nowstr) === 0) {
      var tmparr = [];
      tmparr[0] = x[i].childNodes[1].innerText;
      tmparr[1] = x[i].childNodes[2].innerText;
      tmparr[2] = x[i].childNodes[3].innerText;
      tmparr[3] = x[i].childNodes[4].innerText;
      tmparr[4] = x[i].childNodes[5].innerText;
      tmparr[5] = x[i].childNodes[6].innerText;
      x[i].childNodes[6].childNodes[0].children[1].click();
      tmparr[6] = window.ee[(window.ee.length - 1)].uuidEdit;
      window.tb.push(tmparr);
    }
  }

  var new_form = document.createElement('form');
  new_form.setAttribute('method', "post");
  new_form.setAttribute('target', "ifr");
  new_form.setAttribute('action', "https://mahjong.pub/api/majsoul.php");

  var new_ifr = document.createElement('iframe');
  new_ifr.setAttribute('name', 'ifr');
  new_ifr.setAttribute('id', 'ifr');
  new_form.appendChild(new_ifr);

  var new_btn = document.createElement('input');
  new_btn.setAttribute('type', 'submit');
  new_btn.setAttribute('value', '发送');
  new_form.appendChild(new_btn);

  var new_textarea = document.createElement('textarea');
  new_textarea.setAttribute('name', 'json');
  new_textarea.value = JSON.stringify(window.tb);
  new_form.appendChild(new_textarea);

  box.appendChild(new_form);

} //func

/*
players_start(['光靈聖鬼','星星消消看','',''],[25000,25000,25000,25000])
add_player('xxx\ndasdfasd');
get_table('2018-12-15');

function unique(arr){
    var res=[];
    for(var i=0,len=arr.length;i<len;i++){
        var obj = arr[i];
        for(var j=0,jlen = res.length;j<jlen;j++){
            if(res[j]===obj) break;
        }
        if(jlen===j)res.push(obj);
    }
    return res;
}

(function () {
    var results, currentWindow,
    // create an iframe and append to body to load a clean window object
    iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    // get the current list of properties on window
    currentWindow = Object.getOwnPropertyNames(window);
    // filter the list against the properties that exist in the clean window
    results = currentWindow.filter(function(prop) {
        return !iframe.contentWindow.hasOwnProperty(prop);
    });
    // log an array of properties that are different
    console.log(results);
    document.body.removeChild(iframe);
}());

*/