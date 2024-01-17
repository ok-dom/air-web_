self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// Слушаем событие 'push'.
self.addEventListener('push', function(event) {
  event.waitUntil(self.registration.showNotification('Your mind', {
    body: 'Wizard invaded to your mind!'
  }));
});

// Слушаем событие 'pushsubscriptionchange', которое запускается,
// когда истекает срок подписки. 
// Подписываемся снова и регистрируем новую подписку на сервере,
// отправив POST-запрос.
// На боевом приложении скорее всего будет использоваться ID или token
// для идентификации пользователя.
self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('Spell expired');
  event.waitUntil(
    self.registration.pushManager.subscribe({ userVisibleOnly: true })
    .then(function(subscription) {
      console.log('Another invade! Legilimens!', subscription.endpoint);
      return fetch('register', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          endpoint: subscription.endpoint
        })
      });
    })
  );
});
