const logger = (req, res, next) => {
  //destrutturiamo metodi dalla req.
  const { url, ip, method } = req;
  //console.log per autenticazione ip//
  console.log(
    `${new Date().toISOString()} Effettuata richiesta ${method} all'endpoint ${url} da indirizzo ${ip}`
  );
//Procedi con la richiesta//
  next();
};

export default logger;
