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
  new_script.setAttribute('src', '/dhs/app.b4a1bfac.js');
  new_script.setAttribute('charset', "utf-8");
  document.body.appendChild(new_script);

  var new_script = document.createElement('script');
  new_script.setAttribute('src', '/dhs/vendor.3098fd65.js');
  new_script.setAttribute('charset', "utf-8");
  document.body.appendChild(new_script);


  //创建工具栏
  //样式表
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = 'body{overflow-x:hidden;} ' +
    '#tool_div{height:60px;background:#bbbcce;width:100%;position:fixed;bottom:0;left:0;} ' +
    '#root{margin-bottom:60px;}';
  document.head.appendChild(style);


  document.body.style.cssText = 'overflow-x:hidden;';
  var tool_div = document.createElement('div');
  tool_div.setAttribute('id', 'tool_div');

  var new_textarea = document.createElement('textarea');
  new_textarea.setAttribute('id', 'add_player_text');
  tool_div.appendChild(new_textarea);

  var new_btn = document.createElement('input');
  new_btn.setAttribute('type', 'button');
  new_btn.setAttribute('id', 'add_player_btn');
  new_btn.setAttribute('onclick', 'add_player(document.getElementById("add_player_text").value)');
  new_btn.setAttribute('value', '添加成员到系统');
  tool_div.appendChild(new_btn);
  document.body.appendChild(tool_div);

}

//-------
function sleep(ms) { //暂停
  return new Promise(resolve => setTimeout(resolve, ms));
}

function set_value(type, txt) { //设置值
  var last = window.ee.length - 1;
  window.ee[last][type] = txt;
  window.pp[last].updater.enqueueSetState(window.pp[last], window.ee[last], null, "setState");
}

async function add_player(str) {
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

async function players_start(narr, parr) {
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


async function get_table(nowstr) {
  document.querySelector('#root>div>header>div>div:nth-child(3)>div>div>div>div>button:nth-child(1)').click();
  await sleep(5000);
  window.ee = []; //重设缓存
  window.pp = []; //重设缓存
  window.tb = []; //重设缓存
  document.querySelector('#root>div>header>div>div:nth-child(3)>div>div>div>div>button:nth-child(4)').click();
  await sleep(5000);
  if (typeof nowstr === 'undefined') {
    var d = new Date();
    nowstr = d.getFullYear();
    nowstr += (d.getMonth() < 10 ? "-0" : '-') + (d.getMonth() + 1);
    nowstr += (d.getDate() < 10 ? "-0" : '-') + d.getDate();
  }
  var x = document.getElementsByTagName('tr');
  for (var i = 1; i < x.length; i++) {
    if (x[i].childNodes[1].innerText.indexOf(nowstr) === 0) {
      var tmparr = [];
      tmparr[0] = x[i].childNodes[1].innerText;
      tmparr[1] = x[i].childNodes[2].innerText;
      tmparr[2] = x[i].childNodes[3].innerText;
      tmparr[3] = x[i].childNodes[4].innerText;
      tmparr[4] = x[i].childNodes[5].innerText;
      x[i].childNodes[6].childNodes[0].children[1].click();
      tmparr[5] = window.ee[(window.ee.length - 1)].uuidEdit;
      window.tb.push(tmparr);
    }
  }

} //func

/*
players_start(['光靈聖鬼','星星消消看','',''],[25000,25000,25000,25000])
add_player('xxx\ndasdfasd');
get_table('2018-12-15');
*/