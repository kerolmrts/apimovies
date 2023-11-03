module.exports= (req, res, next)=>{
     if(req.url === '/filmes'){
        console.log('Redirecionamento')
    return res.redirect(301, '/filmes')
    }
    next();
}
