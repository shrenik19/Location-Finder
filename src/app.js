const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');


const app = express();

//defines path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
hbs.registerPartials(partialsPath);

//steup handlebars engine and view location
app.set('view engine','hbs');
app.set('views', viewsPath);


//setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req,res) =>{
    res.render('index' ,{
        title: 'Location Finder App',
        name: 'Shrenik'
    });
});

app.get('/help', (req,res) =>{
    res.render('help',{
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Shrenik'      
    });
});

app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Shrenik'
    });
});

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address to search'
        });
    }

    geocode(req.query.address,(err,{longitude,latitude,location} = {}) =>{
        if(err)
            return res.send({
                error:err
            });
        res.send({
            location,
            longitude,
            latitude
        });
    });
});

//Query Srting use as localhost:3000/products?key1=value1&key2=value2
app.get('/products', (req,res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req,res) =>{
    res.render('404', {
        title: 404,
        name: 'Shrenik',
        errorMsg: 'Help article not found'
    });
});

app.get('*', (req,res) =>{
    res.render('404', {
        title: 404,
        name: 'Shrenik',
        errorMsg: '404 Page not found'
    });
});

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});