self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("message", ({ data, source: { id } }) => {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      if (client.id !== id || Boolean(data.shouldBePosted))
        client.postMessage(data);
    });
  });
});
