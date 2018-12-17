history.pushState(null, null, '/dhs/');
document.head.innerHTML='';
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

//-------

function set_point(a, b, c, d) {
  var last = window.ee.length - 1;
  window.ee[last].prepareSlot[0].initPoint = a;
  window.ee[last].prepareSlot[1].initPoint = b;
  window.ee[last].prepareSlot[2].initPoint = c;
  window.ee[last].prepareSlot[3].initPoint = d;
  window.pp[last].updater.enqueueSetState(window.pp[last], window.ee[last], null, "setState");
}


function set_value(type, txt) {
  var last = window.ee.length - 1;
  window.ee[last][type] = txt;
  window.pp[last].updater.enqueueSetState(window.pp[last], window.ee[last], null, "setState");
}

/*
set_point('123','123','123','123');
set_value('contest_name','xx');
set_value('query',"asdfsda\ndsaf");

set_value('prepareSlot',[{type:2,initPoint:'2500'},{type:2,initPoint:'2500'},{},{}]);

*/