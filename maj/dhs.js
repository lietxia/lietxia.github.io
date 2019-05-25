if (
  window.location.host != "majsoul.union-game.com" ||
  window.location.pathname != "/0/v0.5.1.w/user_xieyi/1.txt"
) {
  alert("书签脚本用法：在任意地方运行一次此脚本，他会转向一个文本\n【注意】然后再运行一次此脚本");
  window.location.href =
    "https://majsoul.union-game.com/0/v0.5.1.w/user_xieyi/1.txt";
} else {
  history.pushState(null, null, "/dhs/");
  //document.getElementsByTagName('style')[0].remove();
  //document.getElementsByTagName('style')[0].remove();
  document.body.innerHTML = "";
  //-------

  var new_script = document.createElement("div");
  new_script.setAttribute("id", "root");
  document.body.appendChild(new_script);

  var x = document.createElement("iframe");
  x.src = "https://majsoul.union-game.com/dhs/";
  x.name = "qhdhs";
  x.id = "qhdhs";
  x.onload = function () {
    //var tmp = [];
    var scripts = frames["qhdhs"].document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      if (
        "https://majsoul.union-game.com/dhs/vendors~app~vendor.00956963.js" ===
        scripts[i].src
      ) {
        var new_script = document.createElement("script");
        new_script.setAttribute(
          "src",
          "https://lietxia.github.io/maj/vendors_app_vendor.00956963.js"
        );
        window.top.document.body.appendChild(new_script);
      } else {
        var new_script = document.createElement("script");
        new_script.setAttribute("src", scripts[i].src);
        window.top.document.body.appendChild(new_script);
      }
    }
    console.log(1);
    document.body.removeChild(x);
  };
  document.body.appendChild(x);

  //创建工具栏
  //样式表
  function create_toolbox() {
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = //'body{overflow-x:hidden;} ' +
      "#tool_div{background:#bbbcce;width:100%;position:fixed;bottom:0;left:0;} " +
      "#root{padding-bottom:200px;}" +
      "#ifr{height:40px;width:60%;}" +
      "#tool_div div{width:30%;display:inline-block;vertical-align:middle;}" +
      "#add_player_text{width:100%;height:40px;}" +
      "#start_ta{width:60%;}";
    document.head.appendChild(style);

    var tool_div = document.createElement("div");
    tool_div.setAttribute("id", "tool_div");

    //<--div
    var new_div = document.createElement("div");

    var new_lable = document.createElement("lable");
    new_lable.setAttribute("for", "cid");
    new_lable.innerText = "赛事ID:";
    new_div.appendChild(new_lable);
    var new_ipt = document.createElement("input");
    new_ipt.setAttribute("size", "2");
    new_ipt.setAttribute("type", "text");
    new_ipt.setAttribute("value", "0");
    new_ipt.setAttribute("id", "cid");
    new_ipt.setAttribute("onchange", "init_all()");
    new_div.appendChild(new_ipt);

    new_div.appendChild(document.createElement("br"));

    var new_lable = document.createElement("lable");
    new_lable.setAttribute("for", "c_round");
    new_lable.innerText = "回合:";
    new_div.appendChild(new_lable);
    var new_ipt = document.createElement("input");
    new_ipt.setAttribute("type", "text");
    new_ipt.setAttribute("size", "2");
    new_ipt.setAttribute("value", "1");
    new_ipt.setAttribute("id", "c_round");
    new_ipt.setAttribute("onchange", "init_all()");
    new_div.appendChild(new_ipt);

    new_div.appendChild(document.createElement("br"));

    var new_lable = document.createElement("lable");
    new_lable.setAttribute("for", "c_date");
    new_lable.innerText = "日期";
    new_div.appendChild(new_lable);
    var new_ipt = document.createElement("input");
    new_ipt.setAttribute("type", "text");
    new_ipt.setAttribute("size", "10");
    new_ipt.setAttribute("id", "c_date");
    new_ipt.setAttribute("onchange", "init_all()");
    var d = new Date();
    var nowstr = d.getFullYear();
    nowstr += (d.getMonth() < 10 ? "-0" : "-") + (d.getMonth() + 1);
    nowstr += (d.getDate() < 10 ? "-0" : "-") + d.getDate();
    new_ipt.setAttribute("value", nowstr);
    new_div.appendChild(new_ipt);

    new_div.appendChild(document.createElement("br"));

    var new_lable = document.createElement("lable");
    new_lable.setAttribute("for", "c_pw");
    new_lable.innerText = "赛事密码";
    new_div.appendChild(new_lable);
    var new_ipt = document.createElement("input");
    new_ipt.setAttribute("type", "password");
    new_ipt.setAttribute("size", "6");
    new_ipt.setAttribute("id", "c_pw");
    new_ipt.setAttribute("onchange", "init_all()");
    new_div.appendChild(new_ipt);

    tool_div.appendChild(new_div);
    //div-->

    //<--div-tools
    var div_tools = document.createElement("div");
    div_tools.setAttribute("id", "div-tools");

    var new_btn = document.createElement("input");
    new_btn.setAttribute("type", "button");
    new_btn.setAttribute("onclick", "init_list()");
    new_btn.setAttribute("value", "获取成员列表");
    div_tools.appendChild(new_btn);

    var new_btn = document.createElement("input");
    new_btn.setAttribute("type", "button");
    new_btn.setAttribute("onclick", "init_start()");
    new_btn.setAttribute("value", "开始某个组");
    div_tools.appendChild(new_btn);

    var new_btn = document.createElement("input");
    new_btn.setAttribute("type", "button");
    new_btn.setAttribute("onclick", "send_data()");
    new_btn.setAttribute("value", "读取牌谱");
    div_tools.appendChild(new_btn);

    var new_btn = document.createElement("input");
    new_btn.setAttribute("type", "button");
    new_btn.setAttribute("onclick", "init_miss()");
    new_btn.setAttribute("value", "未到名單");
    div_tools.appendChild(new_btn);

    var new_btn = document.createElement("input");
    new_btn.setAttribute("type", "button");
    new_btn.setAttribute("onclick", "init_all()");
    new_btn.setAttribute("value", "重载数据");
    div_tools.appendChild(new_btn);

    var new_btn = document.createElement("input");
    new_btn.setAttribute("type", "button");
    new_btn.setAttribute("onclick", "page_change()");
    new_btn.setAttribute("value", "切换页面");
    div_tools.appendChild(new_btn);

    tool_div.appendChild(div_tools);

    //div-tools->

    //<--div2
    var new_div2 = document.createElement("div");
    new_div2.setAttribute("id", "box");
    tool_div.appendChild(new_div2);
    //div2-->

    document.body.appendChild(tool_div);
  } //func-->
  create_toolbox();
} //else-->

function page_change() {
  //*[@id="root"]/div/header/div/div[3]/div/div/div/div
  var pg = document.querySelector('#root > div > header > div > div:nth-child(3) > div > div > div > div');
  var box = document.getElementById("box");
  box.innerHTML = "";
  var btns = pg.innerText.split(/\s+/);
  for (var i = 0; i < btns.length; i++) {
    var new_btn = document.createElement("input");
    new_btn.setAttribute("type", "button");
    new_btn.setAttribute("onclick", "document.querySelector('#root > div > header > div > div:nth-child(3) > div > div > div > div > button:nth-child(" + (i + 1) + ")').click();");
    new_btn.setAttribute("value", btns[i]);
    box.appendChild(new_btn);
  }
}


//----init类---
function init_all() {
  window.team = 1;
  window.cls = 1;
  window.c_admin = 1;
}

function init_miss() {
  var box = document.getElementById("box");
  box.innerHTML = "";

  if (typeof window.miss == "undefined") {
    window.miss = [];
  }

  var new_textarea = document.createElement("textarea");
  new_textarea.value = window.miss.join("\n");
  new_textarea.setAttribute("id", "miss_ta");
  box.appendChild(new_textarea);

  var new_btn = document.createElement("input");
  new_btn.setAttribute("type", "button");
  new_btn.setAttribute("onclick", "clean_miss()");
  new_btn.setAttribute("value", "清空列表");
  box.appendChild(new_btn);

  var new_btn = document.createElement("input");
  new_btn.setAttribute("type", "button");
  new_btn.setAttribute("onclick", "copy_miss()");
  new_btn.setAttribute("value", "複製列表");
  box.appendChild(new_btn);
}

function init_list() {
  //添加一些成员
  var box = document.getElementById("box");
  box.innerHTML = "";

  var cid = document.getElementById("cid").value;

  if (!(typeof window.team === "object")) {
    window.team = get_json(
      "https://mahjong.pub/api/data.php?t=team&cid=" + cid
    );
  }
  var arr = ["", "null"];
  var tmp = "";
  for (row in window.team) {
    tmp = window.team[row]["t_player"] + "\n" + window.team[row]["t_sub"];
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

  var new_textarea = document.createElement("textarea");
  new_textarea.setAttribute("id", "add_player_text");
  new_textarea.value = res.join("\n");
  box.appendChild(new_textarea);

  var new_btn = document.createElement("input");
  new_btn.setAttribute("type", "button");
  new_btn.setAttribute("onclick", "add_player()");
  new_btn.setAttribute("value", "加入参赛名单");
  box.appendChild(new_btn);

  return res;
} //func-->

function init_start() {
  var box = document.getElementById("box");
  box.innerHTML = "";
  var cid = document.getElementById("cid").value;
  var c_round = document.getElementById("c_round").value;

  var new_ta = document.createElement("textarea");
  new_ta.setAttribute("id", "start_ta");
  new_ta.setAttribute("rows", "4");
  box.appendChild(new_ta);

  var new_btn = document.createElement("input");
  new_btn.setAttribute("type", "button");
  new_btn.setAttribute("onclick", "start_class()");
  new_btn.setAttribute("value", "开始");
  box.appendChild(new_btn);

  box.appendChild(document.createElement("br"));

  if (!(typeof window.miss === "object")) {
    window.miss = [];
  }
  if (!(typeof window.c_admin === "object")) {
    window.c_admin = get_json(
      "https://mahjong.pub/api/data.php?t=admin&cid=" + cid
    );
  }
  if (!(typeof window.team === "object")) {
    window.team = get_json(
      "https://mahjong.pub/api/data.php?t=team&cid=" + cid
    );
  }
  if (!(typeof window.cls === "object")) {
    window.cls = get_json(
      "https://mahjong.pub/api/data.php?t=class&cid=" + cid
    );
  }
  if (window.cls === null) {
    return alert("此赛事还没分组，或读取分组失败，请按【重载数据】");
  }
  var cls_count = 0;
  window.this_round = [];
  for (var i = 0; i < window.cls.length; i++) {
    if (
      window.cls[i]["round"] == c_round &&
      window.cls[i]["t_class"] > cls_count
    ) {
      cls_count++;
      window.this_round[window.cls[i]["t_class"]] = [
        window.cls[i]["rid"],
        window.cls[i]["tid1"],
        window.cls[i]["tid2"],
        window.cls[i]["tid3"],
        window.cls[i]["tid4"]
      ];
    }
  }
  for (var i = 1; i <= cls_count; i++) {
    var new_btn = document.createElement("input");
    new_btn.setAttribute("type", "button");
    new_btn.setAttribute("onclick", "get_cls(" + i + ")");
    new_btn.setAttribute("value", i + "组");
    new_btn.setAttribute("id", "btn_start_" + i);
    box.appendChild(new_btn);
  }
}

//-------

function copy_miss() {
  document.getElementById("miss_ta").select();
  document.execCommand("Copy");
}

function clean_miss() {
  window.miss = [];
  document.getElementById("miss_ta").value = "";
}

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

function sleep(ms) {
  //暂停
  return new Promise(resolve => setTimeout(resolve, ms));
}

function set_value(type, txt) {
  //设置值
  var last = window.ee.length - 1;
  window.ee[last][type] = txt;
  window.pp[last].updater.enqueueSetState(
    window.pp[last],
    window.ee[last],
    null,
    "setState"
  );
}

function get_cls(cls) {
  arr = get_json(
    "https://mahjong.pub/api/maj_get.php?p=" +
    window.c_admin.c_s_po +
    "&data=" +
    window.this_round[cls].join("_") +
    "&t=" +
    encodeURI(window.c_admin.t_type)
  );
  if (arr === null || arr === "") {
    return alert("获取第" + cls + "组开赛名单失败");
  }
  if (arr[0] == "2") {
    return alert(arr[1]);
  }
  document.getElementById("start_ta").value = arr[1];
}

async function add_player(str) {
  if (typeof str === "undefined") {
    str = document.getElementById("add_player_text").value;
  }
  document
    .querySelector(
      "#root>div>header>div>div:nth-child(3)>div>div>div>div>button:nth-child(1)"
    )
    .click();
  await sleep(2000);
  window.ee = []; //重设缓存
  window.pp = []; //重设缓存
  document
    .querySelector(
      "#root>div>header>div>div:nth-child(3)>div>div>div>div>button:nth-child(2)"
    )
    .click();
  await sleep(3000);
  document
    .querySelector(
      "#root>div>div>main>div:nth-child(2)>div>div>button:nth-child(3)"
    )
    .click();
  await sleep(1000);
  var eelast = window.ee.length - 1;
  window.ee[eelast].query = str;
  window.pp[eelast].updater.enqueueSetState(
    window.pp[eelast],
    window.ee[eelast],
    null,
    "setState"
  );
  await sleep(1000);
  document
    .querySelector("body>div>div:nth-child(2)>div>div:nth-child(3)>button")
    .click();
  //await sleep(1000);
  //document.querySelector('body>div>div:nth-child(2)>div>div:nth-child(3)').lastChild.click();
}

async function start_class() {
  var narr = [];
  var parr = [];
  var tmp = [];
  var ta = document.getElementById("start_ta").value.split(/[\r\n]+/);
  for (var i = 0; i < ta.length; i++) {
    tmp = ta[i].replace(/^\s+|\s+$/g, "").split(/[\s]+/);
    if (tmp.length === 1) {
      narr[i] = "";
      parr[i] = tmp[0];
    } else {
      narr[i] = tmp[0];
      parr[i] = tmp[1];
    }
  }

  document
    .querySelector(
      "#root>div>header>div>div:nth-child(3)>div>div>div>div>button:nth-child(1)"
    )
    .click();
  await sleep(3000);
  window.ee = []; //重设缓存
  window.pp = []; //重设缓存
  document
    .querySelector(
      "#root>div>header>div>div:nth-child(3)>div>div>div>div>button:nth-child(3)"
    )
    .click();
  await sleep(5000);

  var list = document.querySelector(
    "#root>div>div>main>div:nth-child(2)>div>div>div>div:nth-child(2)>ul"
  ).childNodes;
  var set = ["x", "x", "x", "x"];
  var cnt = 0;

  for (var ii = 0; ii < 4; ii++) {
    if (narr[ii] === null || narr[ii] === "") {
      document
        .querySelector(
          "#root>div>div>main>div:nth-child(2)>div>div>div:nth-child(2)>div:nth-child(3)>button"
        )
        .click();
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
  var missarr = "以下選手未到\n";
  if (cnt < 4) {
    for (var i = 0; i < 4; i++) {
      if (set[i] == "x") {
        window.miss.push(narr[i]);
        missarr += narr[i] + "\n";
      }
    }
    return alert(missarr);
  }

  await sleep(2000);
  var eelast = window.ee.length - 1;
  window.ee[eelast].prepareSlot[0].initPoint = set[0];
  window.ee[eelast].prepareSlot[1].initPoint = set[1];
  window.ee[eelast].prepareSlot[2].initPoint = set[2];
  window.ee[eelast].prepareSlot[3].initPoint = set[3];
  window.pp[eelast].updater.enqueueSetState(
    window.pp[eelast],
    window.ee[eelast],
    null,
    "setState"
  );

  if (cnt === 4) {
    //----點擊隨機按鈕---
    await sleep(1000);
    document
      .querySelector(
        "#root>div>div>main>div:nth-child(2)>div>div>div:nth-child(2)>div:nth-child(2)>label:nth-child(2)>span>span>input"
      )
      .click();
    await sleep(1000);
    //document.querySelector('#root>div>div>main>div:nth-child(2)>div>div>div:nth-child(2)>div:nth-child(3)').lastChild.click();
    alert("信息已填好，请点击开始");
  }
}

async function send_data() {
  var box = document.getElementById("box");
  box.innerHTML = "";
  document
    .querySelector(
      "#root>div>header>div>div:nth-child(3)>div>div>div>div>button:nth-child(1)"
    )
    .click();
  await sleep(3000);
  window.ee = []; //重设缓存
  window.pp = []; //重设缓存
  window.tb = []; //重设缓存

  document
    .querySelector(
      "#root>div>header>div>div:nth-child(3)>div>div>div>div>button:nth-child(4)"
    )
    .click();
  await sleep(5000);
  var nowstr = document.getElementById("c_date").value;
  var x = document.getElementsByTagName("tr");
  var bcnt = 0;
  var bs = false;
  for (var i = 1; i < x.length; i++) {

    if (
      x[i].childNodes[1].innerText.indexOf(nowstr) === 0 &&
      x[i].childNodes[6].innerText.replace(/^\s+|\s+$/g, "") != "pass"
    ) {
      bs = true;
      var tmparr = [];
      tmparr[0] = x[i].childNodes[1].innerText;
      tmparr[1] = x[i].childNodes[2].innerText;
      tmparr[2] = x[i].childNodes[3].innerText;
      tmparr[3] = x[i].childNodes[4].innerText;
      tmparr[4] = x[i].childNodes[5].innerText;
      tmparr[5] = x[i].childNodes[6].innerText;
      x[i].childNodes[6].childNodes[0].children[1].click();
      tmparr[6] = window.ee[window.ee.length - 1].uuidEdit;
      window.tb.push(tmparr);
    }
    if (bs) {
      if (x[i].childNodes[1].innerText.indexOf(nowstr) != 0) {
        bcnt++;
      }
    }
    if (bcnt > 9) { break }
  }

  var new_form = document.createElement("form");
  new_form.setAttribute("method", "post");
  new_form.setAttribute("target", "ifr");
  new_form.setAttribute("action", "https://mahjong.pub/api/maj_post.php");

  var new_ifr = document.createElement("iframe");
  new_ifr.setAttribute("name", "ifr");
  new_ifr.setAttribute("id", "ifr");
  new_form.appendChild(new_ifr);

  var new_btn = document.createElement("input");
  new_btn.setAttribute("type", "submit");
  new_btn.setAttribute("value", "发送");
  new_form.appendChild(new_btn);

  var new_btn = document.createElement("input");
  new_btn.setAttribute("type", "hidden");
  new_btn.setAttribute("name", "cid");
  new_btn.setAttribute("value", document.getElementById("cid").value);
  new_form.appendChild(new_btn);

  var new_btn = document.createElement("input");
  new_btn.setAttribute("type", "hidden");
  new_btn.setAttribute("name", "pw");
  new_btn.setAttribute("value", document.getElementById("c_pw").value);
  new_form.appendChild(new_btn);

  var new_btn = document.createElement("input");
  new_btn.setAttribute("type", "hidden");
  new_btn.setAttribute("name", "rnd");
  new_btn.setAttribute("value", document.getElementById("c_round").value);
  new_form.appendChild(new_btn);

  var new_textarea = document.createElement("textarea");
  new_textarea.setAttribute("name", "json");
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
