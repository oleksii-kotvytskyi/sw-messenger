self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("message", ({ data, source: { id } }) => {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      console.log("CHECK", client.id, id);
      if (client.id !== id) client.postMessage(data);
    });
  });
});
