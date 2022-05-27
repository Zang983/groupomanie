const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
   
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'AuheoO11nNej47Gr,eiUHog@ru::ohga5');
    const userId = decodedToken.userId;
    req.auth = { userId };  
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Id de l\'utilisateur invalide';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête invalide.')
    });
  }
};