const isEmpty=value=>value===null|| value===undefined || typeof(value)=="object" && Object.keys(value).length===0 //objetvide
 ||typeof(value)=='string' && value.trim().length===0 //chaine formé des espaces


module.exports= isEmpty