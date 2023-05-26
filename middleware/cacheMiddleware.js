//Salva le cose già viste in un oggetto per non ricaricarle//

const cache = new Map();

// Il map è un oggetto chiave - valore, quindi per identificare la richiesta da chi proviene deve avere un identificativo, per questo si fa tramite indirizzo di richiesta//

const cacheMiddleware = (req, res, next) => {
  const { url } = req;

  const cachedResponse = cache.get(url);
  //se esiste già nell0oggetto questa chiave, riusala//
  if (cachedResponse) {
    return res.send(cachedResponse);
  }
  //Altrimenti
  res.sendReponse = res.send;
  res.send = (body) => {
    //Url=chiave//
    cache.set(url, body);
    res.sendReponse(body);
  };

  next();
};

export default cacheMiddleware;
