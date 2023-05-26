//  //Controllo ruolo utente che di default è user//
//  const isAuthored = (req, res, next) => {
//     const { role } = req.body

// //se utente nel body è diverso da admin non può effettuare questa richiesta//
//      if (role !== 'admin') {
//          return res.status(400).send({
//              message: 'You need to be an admin to perform this request'
//          })
//      }

//     next()
//  }

//  export default isAuthored;

//Per ora non utilizzato//