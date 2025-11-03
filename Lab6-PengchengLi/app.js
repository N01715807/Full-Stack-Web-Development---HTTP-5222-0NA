const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//express
const app = express();

//set
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//pug
const path = require('path');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//health check
app.get('/health',(req,res)=>{
    res.json({ok:true})
})

// get: /
app.get('/',(req,res)=>{
    res.render('index')
});

// get: /library/:id
app.get('/library/:id',(req,res)=>{
    res.render('library', { id: req.params.id })
});

//PORT
const PORT = process.env.PORT || 3000;
(async()=>{
    try{
        app.listen(PORT,()=>{
            console.log(`http://localhost:${PORT}`);
        });
    }catch(err){
        console.error('Startup error:', err.message)
        process.exit(1);
    }
})();