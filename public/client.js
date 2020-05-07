const publicVapidKey = 'BPagLHQ02-MGluayylhkvmk3FFAdsHtjFaM_cjSxE89e4E5TVIO-DSjrrpQY0iBpbnowYNGDWqqodzZ4WJ41zr4';

if ('serviceWorker' in navigator) {
  console.log('Registering service worker');

  send().catch(error => console.error(error));
}

async function send() {
  console.log('Registering service worker');
  const registration = await navigator.serviceWorker.register('/worker.js',{
    scope: '/'});
  console.log('Registered service worker');

  console.log('Registering push');
  const subscription = await registration.pushManager.
    subscribe({
      userVisibleOnly: true,
      // The `urlBase64ToUint8Array()` function is the same as in
      // https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
  console.log('Registered push');

  console.log('Sending push');
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('Sent push');
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const vapidPublicKey = 'BPagLHQ02-MGluayylhkvmk3FFAdsHtjFaM_cjSxE89e4E5TVIO-DSjrrpQY0iBpbnowYNGDWqqodzZ4WJ41zr4';
const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: convertedVapidKey
});