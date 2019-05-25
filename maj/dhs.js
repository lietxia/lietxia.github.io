/*
雀魂大会室大凤林辅助脚本v1.0

书签
javascript: void ((function () { var e = document.createElement('script'); e.setAttribute('src', 'https://lietxia.github.io/maj/dhs.js?' + Math.random()); document.body.appendChild(e); })());

书签需要打开2次
*/


//检查当前网址
if (
	window.location.host != "majsoul.union-game.com" ||
	window.location.pathname != "/index.html"
) {
	alert("书签脚本用法：\n1.在任意地方运行一次此脚本，他会转向雀魂首页\n2.【注意】然后再运行一次此脚本");
	window.location.href = "https://majsoul.union-game.com/index.html";
}

//改变url
history.pushState(null, null, "/dhs/");
//清除内容
document.getElementsByTagName('head')[0].innerHTML = '';
document.getElementsByTagName('body')[0].innerHTML = '';
//-------

function ce(arr) {//创建元素
	if (!Array.isArray(arr) || arr.length < 1 || arr.length % 2 == 0) { return; }
	var e = document.createElement(arr[0]);
	for (var i = arr.length - 1; i >= 1; i -= 2) {
		e.setAttribute(arr[i - 1], arr[i]);
	}
	return e;
}
function cet(arr, t) {//创建元素+元素带innertext
	if (!Array.isArray(arr) || arr.length < 1 || arr.length % 2 == 0) { return; }
	var e = document.createElement(arr[0]);
	for (var i = arr.length - 1; i >= 1; i -= 2) {
		e.setAttribute(arr[i - 1], arr[i]);
	}
	e.innerText = t;
	return e;
}

function check_js() {
	if (typeof window.pp != "object") {
		alert('脚本可能失效了');
	}
}

//创建div#root
document.body.appendChild(ce(['div', 'id', 'root']));

var x = ce(['iframe',
	'src', "https://majsoul.union-game.com/dhs/",
	'name', "qhdhs",
	'id', 'qhdhs',
]);

x.onload = function () {
	var scripts = frames["qhdhs"].document.getElementsByTagName("script");
	for (let i = 0; i < scripts.length; i++) {
		//"https://majsoul.union-game.com/dhs/vendors~app~vendor.00956963.js"
		if (
			scripts[i].src.substr(0, 53) == "https://majsoul.union-game.com/dhs/vendors~app~vendor"
		) {
			var thisVersion = scripts[i].src.substr(53);
			var localVersion = localStorage.getItem('vendors_app_vendor');

			if (thisVersion != localVersion) {//版本不符
				localStorage.setItem('vendors_app_vendor_data', '');
				$.ajax({
					url: scripts[i].src,
					dataType: "text",
					success: function (text) {
						text = "window.pp = [];window.ee = [];" + text;
						text = text.replace(
							'_.prototype.setState=function(e,t){',
							'_.prototype.setState=function(e,t){console.log("setstate", e, t); if (typeof e.contest_name != "undefined" || typeof e.query != "undefined" || typeof e.prepareSlot != "undefined" || typeof e.uuidEdit != "undefined") { window.pp.push(this); window.ee.push(e); }'
						);
						localStorage.setItem('vendors_app_vendor_data', text);
						localStorage.setItem('vendors_app_vendor', thisVersion);

						var new_script = document.createElement("script");
						new_script.innerText = localStorage.getItem('vendors_app_vendor_data');
						new_script.setAttribute('onload', 'check_js()');
						window.top.document.body.appendChild(new_script);
					}
				})
			} else {
				var new_script = document.createElement("script");
				new_script.innerText = localStorage.getItem('vendors_app_vendor_data');
				new_script.setAttribute('onload', 'check_js()');
				window.top.document.body.appendChild(new_script);
			}

		} else {
			var new_script = document.createElement("script");
			new_script.setAttribute("src", scripts[i].src);
			window.top.document.body.appendChild(new_script);
		}
	}
	document.body.removeChild(document.getElementById('qhdhs'));
};

document.body.appendChild(x);


(function () {//创建工具栏
	var style = ce(["style", "type", "text/css", "rel", 'stylesheet']);

	style.appendChild(document.createTextNode(
		"#tool_div{background:#bbbcce;width:100%;position:fixed;bottom:0;left:0;} " +
		"#root{padding-bottom:200px;}" +
		"#ifr{height:40px;width:60%;}" +
		"#tool_div div{width:30%;display:inline-block;vertical-align:middle;}" +
		"#add_player_text{width:100%;height:40px;}" +
		"#start_ta{width:60%;}"
	))  //'body{overflow-x:hidden;} ' +

	document.head.appendChild(style);

	var tool_div = ce(['div', "id", "tool_div"]);

	//<--div
	var new_div = document.createElement("div");

	var d = new Date();
	var nowstr = d.getFullYear();
	nowstr += (d.getMonth() < 10 ? "-0" : "-") + (d.getMonth() + 1);
	nowstr += (d.getDate() < 10 ? "-0" : "-") + d.getDate();

	var data_id = ["cid", "c_round", 'c_date', 'c_pw'];
	var data_lable = ["赛事ID:", '回合:', '日期', '赛事密码']
	var data_size = ['2', '2', '10', '6'];
	var data_value = ['0', '1', nowstr, ''];
	var data_type = ["text", "text", "text", "password"];

	for (var i = 0; i < data_id.length; i++) {
		new_div.appendChild(cet(["lable", "for", data_id[i]], data_lable[i]));
		new_div.appendChild(ce(["input",
			"size", data_size[i],
			"type", data_type[i],
			"value", data_value[i],
			"id", data_id[i],
			"onchange", "init_all()"
		]));
		new_div.appendChild(document.createElement("br"));
	}

	tool_div.appendChild(new_div);
	//div-->

	//<--div-tools
	var div_tools = document.createElement("div");
	div_tools.setAttribute("id", "div-tools");

	var btn_value = ["获取成员列表", "开始某个组", "读取牌谱", "未到名單", "重载数据", "切换页面"];
	var btn_onclick = ["init_list()", "init_start()", "send_data()", "init_miss()", "init_all()", "page_change()"];

	for (var i = 0; i < btn_value.length; i++) {
		var new_btn = document.createElement("input");
		new_btn.setAttribute("type", "button");
		new_btn.setAttribute("value", btn_value[i]);
		new_btn.setAttribute("onclick", btn_onclick[i]);
		div_tools.appendChild(new_btn);
	}

	tool_div.appendChild(div_tools);

	//div-tools->

	//<--div2
	var new_div2 = document.createElement("div");
	new_div2.setAttribute("id", "box");
	tool_div.appendChild(new_div2);
	//div2-->

	document.body.appendChild(tool_div);

})()


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