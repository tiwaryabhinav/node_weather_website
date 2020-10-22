const form=document.querySelector('form');
const input=document.querySelector('input');
const p1=document.getElementById('msg1');
const p2=document.getElementById('msg2');
p1.textContent='';
p2.textContent='';
form.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const val=input.value;
    p1.textContent='Loading';
    p2.textContent='';
    const url='/products?search='+val;
    fetch(url).then((res)=>{
        res.json().then((data)=>{
            if(data.error)
            {
                p1.textContent=data.error;
                p2.textContent='';
            }
            else
            {
                p1.textContent='Location is '+data.location;
                //console.log(data.location);
                //console.log(data.information);
                p2.textContent='Temparature at '+data.location+' is '+data.information.temperature+' degree celcius and pressure is '+data.information.pressure+" millibar";
                //console.log(data.information.temperature);
                //console.log(data.information.pressure);
            }
        })
    })
})