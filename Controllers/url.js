import {Url} from '../Models/Url.js';
import shortid from 'shortid';
export const shortUrl=async(req,res)=>{
    const longUrl=req.body.longUrl;
    const shortCode=shortid.generate();
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const shortUrl = `${baseUrl}/${shortCode}`;


    //save to data base
    const newurl=new Url({shortCode,longUrl});
    await newurl.save();
    console.log("data is saved");
    
   res.render('index.ejs',{shortUrl});
    // res.redirect(`/?shortUrl=${shortUrl}`);
}


export const getOriginalUrl = async (req,res) =>{
    const shortCode=req.params.shortCode;
    //find data in database
    const OriginalUrl=await Url.findOne({shortCode});
    if(OriginalUrl){
        res.redirect(OriginalUrl.longUrl);
    }else{
        res.status(404).send("Not found");
    }
    
    
  
  }