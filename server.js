import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import {shortUrl,getOriginalUrl} from './Controllers/url.js';
const app=express();

app.use(express.static(path.join(path.resolve(),'public')));
app.use(express.urlencoded({extended:true}));
 mongoose.connect('mongodb+srv://sc9411963207:UmtKUR1mawImPw3S@cluster0.mskoz.mongodb.net/',{
    DbName:'test',
 }).then(()=>{
    console.log('connected to database');
 }).catch((err)=>{
    console.log(err);
 });


app.get('/',(req,res)=>{
   const shortUrl = req.query.shortUrl || null;
    res.render('index.ejs', {shortUrl});
})
//shortening the url logic
app.post('/form',shortUrl)

//dynamic routing:when you click on short url you directly reach to original url page
app.get("/:shortCode", getOriginalUrl);


const port=3000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})