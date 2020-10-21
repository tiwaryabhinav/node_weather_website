const express=require('express');
const app=express()
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const weather=require('./utils/weather');
const forecast = require('./utils/weather');

const port=process.env.PORT || 3000


//PATHS DEFINING FOR EXPRESS
const public_path=path.join(__dirname,'../public/css');
const view_path=path.join(__dirname,'/template/view')
const partial_path=path.join(__dirname,'/template/partials')


//SETUP HANDLEBAR AND VIEWS LOCATION
app.set('view engine','hbs');
app.set('views',view_path);
hbs.registerPartials(partial_path);

console.log(public_path);
//SETUP EXPRESS DIRECTORY TP WORK
app.use(express.static(public_path));

app.get('',(req,res)=>{
    res.render('index',{
        title:'MAiN PAGE TITLE',
        name:'Abhinav Tiwary'
    })
})




app.get('/help',(req,res)=>{
    res.render('help',{
        name:'HELP PAGE',
        title:'TITLE OF HELP PAGE'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Article Missing',
        name:'Abhinav Tiwary',
        ErrorMessage:'Requested page is not present'
    });
})

app.get('/products',(req,res)=>{

    if(!req.query.search)
    {
        return res.send({
            error:'PLEASE PROVIDE SEARCH CONTENT'
        })
    }
    {
        geocode(req.query.search,(err,data)=>{
            if(err)
            return res.send({
                error:err
            })
            return forecast(data.latitude,data.longitude,(err2,data2)=>{
                if(err2)
                {
                    return res.send({
                        error:err2
                })
                }
                res.send({
                    information:data2,
                    location:req.query.search
                })
            })
        })
    }
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'Error',
        name:'Abhinav Tiwary',
        ErrorMessage:'404 Page Not Found'
    });
})


app.listen(port,()=>{
console.log('Server is established at port '+port);
})