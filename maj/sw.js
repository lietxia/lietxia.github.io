//index.html可以直接訪問
self.addEventListener('fetch', function (event) {
    switch (event.request.url) {
        case 'https://majsoul.union-game.com':
        case 'https://majsoul.union-game.com/':
        case 'https://majsoul.union-game.com/index.htm':
            var res = new Response(
                '<!DOCTYPE html> <html> <head> <meta charset="utf-8" /> </head> <body> <script> var e = document.createElement("script"); e.setAttribute("src", "https://lietxia.github.io/maj/sw_index.js?" + Math.random()); document.body.appendChild(e); </script> </body> </html>',
                { headers: { 'Content-Type': 'text/html' } }
            );
            event.respondWith(res);
            break;

        case 'https://majsoul.union-game.com/0':
        case 'https://majsoul.union-game.com/0/':
        case 'https://majsoul.union-game.com/0/index.htm':
            var res = new Response(
                '<!DOCTYPE html> <html> <head> <meta charset="utf-8" /> </head> <body> <script> var e = document.createElement("script"); e.setAttribute("src", "https://lietxia.github.io/maj/sw_0.js?" + Math.random()); document.body.appendChild(e); </script> </body> </html>',
                { headers: { 'Content-Type': 'text/html' } }
            );
            event.respondWith(res);
            break;

        case 'https://majsoul.union-game.com/dhs':
        case 'https://majsoul.union-game.com/dhs/':
        case 'https://majsoul.union-game.com/dhs/index.htm':
            var res = new Response(
                '<!DOCTYPE html> <html> <head> <meta charset="utf-8" /> </head> <body> <script> var e = document.createElement("script"); e.setAttribute("src", "https://lietxia.github.io/maj/sw_dhs.js?" + Math.random()); document.body.appendChild(e); </script> </body> </html>',
                { headers: { 'Content-Type': 'text/html' } }
            );
            event.respondWith(res);
            break;

        default:
            event.respondWith(
                fetch(event.request).then(function (response) {
                    return response;
                }).catch(function (error) {
                    throw error;
                })
            );
            break;
    }
});