const express = require ('express');
const cors = require('cors');
const categoriesRoutes= require ('./routes/categoriesRoutes')
const moviesRoutes= require ('./routes/moviesRoutes')
const redirectMiddleware= require('./middlewares/redirectMiddleware');
const logMiddleware = require('./middlewares/logMiddleware');
const rateLimit = require('./middlewares/rateLimitMiddleware');

const app= express();
const PORT= 4000;

app.use(express.json())
app.use(cors())

app.use(redirectMiddleware);
app.use(logMiddleware);
app.use(rateLimit);

app.get('/', (req, res)=>{
    res.send('API Movies')
})

app.use('/categories', categoriesRoutes)
app.use('/movies', moviesRoutes)

app.listen(PORT, () => {
    console.log('http://localhost:' + PORT)

})
