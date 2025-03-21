let timer;

self.addEventListener('install', (event) => {
  console.log('service worker installed');
});
self.addEventListener('activate', (event) => {
  console.log('service worker activated');
});
self.addEventListener('message', (e) => {
  if (e.data === 'start') {
    !!timer && clearInterval(timer);
    let from = +new Date();
    let prev = +new Date();
    timer = setInterval(() => {
      const now = +new Date();
      const interval = now - prev;
      prev = now;
      e.source.postMessage({ interval, elapsed: now - from });
    }, 10);
  }
  if (e.data === 'stop') {
    !!timer && clearInterval(timer);
    timer = null;
  }
});
