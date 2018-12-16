/*
var new_script=document.createElement('script');
new_script.src="https://code.jquery.com/jquery-3.3.1.min.js"
document.body.appendChild(new_script);
$('html').remove();
$('!doctype html').remove();

window.removeEventListener('hashchange', window.getEventListeners(window).hashchange[0].listener, false)

*/


for (var eventType in getEventListeners(document)) {
  getEventListeners(document)[eventType].forEach(
    function (o) {
      document.removeEventListener(eventType, o.listener)
    }
  )
}

for (var eventType in getEventListeners(window)) {
  getEventListeners(window)[eventType].forEach(
    function (o) {
      window.removeEventListener(eventType, o.listener)
    }
  )
}
document.body.innerHTML = '';
window.webpackJsonp = null;
var new_script = document.createElement('div');
new_script.id = 'root';
document.body.appendChild(new_script);

var new_script = document.createElement('script');
new_script.src = '/dhs/manifest.ed14eec5.js';
document.body.appendChild(new_script);

var new_script = document.createElement('script');
new_script.src = 'https://lietxia.github.io/maj/vendors~app~vendor.19ac4945.js';
document.body.appendChild(new_script);

var new_script = document.createElement('script');
new_script.src = '/dhs/vendors~app.cedcf233.js';
document.body.appendChild(new_script);

var new_script = document.createElement('script');
new_script.src = '/dhs/app.b4a1bfac.js';
document.body.appendChild(new_script);

var new_script = document.createElement('script');
new_script.src = '/dhs/vendor.3098fd65.js';
document.body.appendChild(new_script);


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