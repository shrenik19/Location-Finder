console.log('client side JS file is loaded');

// fetch('http://puzzle.mead.io/puzzle').then((res) =>{
//     res.json().then((data)=>{
//         console.log(data);
//     });
// });



const locationForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.getElementById('msgOne');
const msgTwo = document.getElementById('msgTwo');

msgOne.textContent = '';
msgTwo.textContent = '';

locationForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    
    msgOne.textContent = 'Loading...';
    msgTwo.textContent = '';

    fetch('http://localhost:3000/weather?address='+location).then((res) =>{
        res.json().then((data) =>{
            if(data.error)
                msgOne.textContent = data.error;
            else{
                msgOne.textContent = 'Longitude: ' + data.longitude;
                msgTwo.textContent = 'Latitude: ' + data.latitude;
            }
        });
    });
});
