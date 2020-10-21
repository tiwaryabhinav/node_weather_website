const request=require('request');
/*
let url='https://api.mapbox.com/geocoding/v5/mapbox.places/New%20Delhi.json?access_token=pk.eyJ1IjoidGl3YXJ5YWJoaW5hdiIsImEiOiJja2cwdmVpNXcwMnc4MnNuMWc1NWg1OWUzIn0._7zlNRKMm3h_gMzGnlQDzw&limit=1'

request({url:url,json:true},(error,response)=>{
    console.log(response.body.features[0].center);
})
*/
const geocode=function(address,callback)
{
    let url2='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidGl3YXJ5YWJoaW5hdiIsImEiOiJja2cwdmVpNXcwMnc4MnNuMWc1NWg1OWUzIn0._7zlNRKMm3h_gMzGnlQDzw&limit=1'
    request({url:url2,json:true},(err,response)=>{
        if(err)
        {
            callback('Unable to Connect to Network',undefined);
        }
        else if(response.body.features.length===0)
        {
            callback('Unable to get location',undefined);
        }
        else
        {
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            });
        }
    })
}

/*geocode('New Delhi',(err,data)=>{
    if(err)
    console.log(err);
    else
    console.log(data);
})*/

module.exports=geocode;

