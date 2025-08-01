var google;

function initMap() {
    var myLatlng = new google.maps.LatLng(40.69847032728747, -73.9514422416687);

    var mapOptions = {
        zoom: 7,
        center: myLatlng,
        scrollwheel: false,
        styles: [
            {
                featureType: "administrative.country",
                elementType: "geometry",
                stylers: [
                    { visibility: "simplified" },
                    { hue: "#ff0000" }
                ]
            }
        ]
    };

    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);

    var addresses = ['New York'];
    var apiKey = 'AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s';

    for (var x = 0; x < addresses.length; x++) {
        (function(address) {
            $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key=' + apiKey, function (data) {
                if (data.status === "OK" && data.results.length > 0) {
                    var p = data.results[0].geometry.location;
                    var latlng = new google.maps.LatLng(p.lat, p.lng);
                    new google.maps.Marker({
                        position: latlng,
                        map: map,
                        icon: 'images/loc.png'
                    });
                } else {
                    console.error('Geocode error for address:', address, data.status);
                }
            });
        })(addresses[x]); // Use IIFE to capture address variable
    }
}
