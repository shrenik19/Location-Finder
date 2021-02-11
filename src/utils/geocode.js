const request = require('request');

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2hyZW5pay1kYWxhbCIsImEiOiJja2t6ZGs1ZHIwbDd4MnVwZzB4eDF0azZ4In0.IKU8cj4eCba4YaRJfh5irw';

    request({url, json: true}, (err, { body }) => {
        if(err){
            callback('Unable to connect to location services.',undefined);
        }
        else if(body.features.length === 0){
            callback('Try Searching another location.',undefined);
        }
        else{
            callback(undefined,{
                latitude: body.features[1].center[1],
                longitude: body.features[1].center[0],
                location: body.features[1].place_name
            });
        }
    });
};

module.exports = geocode;