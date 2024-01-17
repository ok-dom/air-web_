// Для простоты будем использовать кнопку. 
// На боевой версии лучше использовать события.
var subscriptionButton = document.getElementById('subscriptionButton');

// Поскольку объект подписки требуется в нескольких местах, давайте создадим метод,
// который возвращает Promise.
function getSubscription() {
  return navigator.serviceWorker.ready
    .then(function(registration) {
      return registration.pushManager.getSubscription();
    });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/air-web_/service-worker.js')
    .then(function() {
      console.log('SW registered');
      subscriptionButton.removeAttribute('disabled');
    });
  getSubscription()
    .then(function(subscription) {
      if (subscription) {
        console.log('Already invaded', subscription.endpoint);
        setUnsubscribeButton();
      } else {
        setSubscribeButton();
      }
    });
}

// Получить «registration» от SW и создать новую
// подписку с помощью `registration.pushManager.subscribe`.
// Затем зарегистрировать новую подписку, отправив POST-запрос.
function subscribe() {
  navigator.serviceWorker.ready.then(function(registration) {
    return registration.pushManager.subscribe({ userVisibleOnly: true });
  }).then(function(subscription) {
    console.log('Legilimens!', subscription.endpoint);
    return fetch('register', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        endpoint: subscription.endpoint
      })
    });
  }).then(setUnsubscribeButton);
}

// Получить существующую подписку от SW,
// отменить подписку (`subscription.unsubscribe ()`) и 
// отменить регистрацию на сервере с помощью POST-запроса 
// для прекращения отправки push-сообщений.
function unsubscribe() {
  getSubscription().then(function(subscription) {
    return subscription.unsubscribe()
      .then(function() {
        console.log('Unsubscribed', subscription.endpoint);
        return fetch('unregister', {
          method: 'post',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            endpoint: subscription.endpoint
          })
        });
      });
  }).then(setSubscribeButton);
}

// Для демонстрации (или тренировок). Изменяем текст кнопки.
function setSubscribeButton() {
  subscriptionButton.onclick = subscribe;
  subscriptionButton.textContent = 'Open mind!';
}

function setUnsubscribeButton() {
  subscriptionButton.onclick = unsubscribe;
  subscriptionButton.textContent = 'Protego!';
}
