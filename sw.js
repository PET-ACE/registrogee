/**
 * Service Worker App 2 - Notificações
 * Status: Confirmado e 100% Atualizado com as novas credenciais pontoweb-dc8dd
 */

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCu4xZukurVuasaxXa_FPaDE5_QkYppMEU",
  authDomain: "gee-pet-ace.firebaseapp.com",
  projectId: "gee-pet-ace",
  storageBucket: "gee-pet-ace.firebasestorage.app",
  messagingSenderId: "219235891976",
  appId: "1:219235891976:web:3237b3bd58d9a8c5e9cabd"
};

try {
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  console.log('[SW-Alertas] Firebase inicializado com sucesso.');

  // Trata e renderiza a notificação recebida em background
  messaging.onBackgroundMessage((payload) => {
    console.log('[SW-Alertas] Mensagem recebida no background:', payload);
    
    const notificationTitle = payload.data?.title || payload.notification?.title || 'Nova Notificação';
    const notificationOptions = {
      body: payload.data?.body || payload.notification?.body || '',
      icon: 'https://github.com/luizhenrinq1-svg/testepontoweb/blob/main/Icone.png?raw=true',
      vibrate: [200, 100, 200],
      data: payload.data
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (e) {
  console.error('[SW-Alertas] Erro ao inicializar Firebase:', e);
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type: 'window'}).then( windowClients => {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./index.html');
    })
  );
});
