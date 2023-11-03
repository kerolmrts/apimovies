const requestCountByIP = {};

const rateLimit = (req, res, next) => {
  const clientIP = req.ip;
  if (requestCountByIP[clientIP]) {
       if (requestCountByIP[clientIP] > 10){ 
      return res.status(429).json({
        error: "Você atingiu o limite máximo de requisições",
      });
    }
    requestCountByIP[clientIP]++; 
  } else{
    requestCountByIP[clientIP]= 1; 
    setTimeout(() =>{
        delete requestCountByIP[clientIP]
     }, 30000) 
  }
  next();
};

module.exports = rateLimit;
