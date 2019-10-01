/*
雀魂大会室大凤林辅助脚本v1.0

书签
javascript: void ((function () { var e = document.createElement('script'); e.setAttribute('src', 'https://lietxia.github.io/maj/dhs.js?' + Math.random()); document.body.appendChild(e); })());

书签需要打开2次
*/


//检查当前网址

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

function dhs_onload() {
	var scripts = frames["qhdhs"].document.getElementsByTagName("script");
	for (let i = 0; i < scripts.length; i++) {
		//"https://www.majsoul.com/dhs/vendors~app~vendor.00956963.js"
		if (scripts[i].src.startsWith("https://www.majsoul.com/dhs/vendors~app~vendor")) {
			var thisVersion = scripts[i].src.substring(scripts[i].src.length - 11);
			var localVersion = localStorage.getItem('vendors_app_vendor');
			var vendor_data = localStorage.getItem('vendors_app_vendor_data');
			if (thisVersion != localVersion
				|| vendor_data == null
				|| vendor_data == ""
				|| vendor_data.length < 100
			) {//版本不符
				localStorage.setItem('vendors_app_vendor_data', '');
				fetch(scripts[i].src)
					.then(async function (response) {
						var text = await response.text();
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


(function () {
	if (window.location.host == "www.majsoul.com") {
		if (window.location.pathname == "/"
			|| window.location.pathname == ""
			|| window.location.pathname == "/index.html"
			|| window.location.pathname == "/index.htm") {
			//改变url
			history.pushState(null, null, "/dhs/?lng=zh-CN");
			//清除内容
			document.head.innerHTML = '';
			document.body.innerHTML = ''

			var style = document.createElement('link');
			style.setAttribute('rel', "stylesheet")
			style.setAttribute('type', "text/css")
			style.setAttribute('href', 'https://mj.000.mk/dhs/dock.css')
			document.head.appendChild(style);

			//创建div#root
			var e = document.createElement('div');
			e.setAttribute('id', 'root');
			document.body.appendChild(e);

			var x = ce(['iframe',
				'src', "https://www.majsoul.com/dhs/?lng=zh-CN",
				'name', "qhdhs",
				'id', 'qhdhs',
				'onload', 'top.dhs_onload()'
			]);

			document.body.appendChild(x);
			var script = document.createElement('script');
			script.setAttribute('src', 'https://mj.000.mk/dhs/dhs.js')
			document.body.appendChild(script);
			return;
		}
	}
	alert("书签脚本用法：\n1.在任意地方运行一次此脚本，他会转向雀魂首页\n2.【注意】然后再运行一次此脚本");
	return window.location.href = "https://www.majsoul.com/";
})()
