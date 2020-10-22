const request=require('request');


const forecast=function(latitude,longitude,callback)
{
    let url2='http://api.weatherstack.com/current?access_key=a43f1d734d7ca8d4a2b6bea8d58b0b41&query='+latitude+','+longitude+'&units=m'
    request({url:url2,json:true},(err,response)=>{
        if(err)
        {
            callback('Unable to Connect to Network',undefined);
        }
        else if(response.body.success===false)
        {
            callback('Unable to get location',undefined);
        }
        else
        {
            callback(undefined,{
                temperature:response.body.current.temperature,
                pressure:response.body.current.pressure
            });
        }
    })
}
/*
forecast(28,77,(err,data)=>{
    if(err)
    console.log(err);
    else
    console.log(data);
})
*/
module.exports=forecast;