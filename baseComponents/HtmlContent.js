export const HtmlContent = {
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Map</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css" />
    <style>
        #map { height: 100vh; width: 100%; }
         /* Map styles */
    
            /* Streets style */
            .leaflet-container.streets {
                background-color: #f8f8f8;
            }
    
            /* Satellite style */
            .leaflet-container.satellite {
                background-color: #000;
            }
    
            /* Hybrid style */
            .leaflet-container.hybrid {
                background-color: #0a0a0a;
            }
    
            /* Terrain style */
            .leaflet-container.terrain {
                background-color: #d8cfc4;
            }
    
            .leaflet-top.leaflet-left {
                top: 10px;
                left: 10px;
            }
    </style>
</head>
<body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>
    <script>
         const staticLocation = [17.4418, 78.3480]; 
        const map = L.map('map',{attributionControl: false,zoomControl: true,}).setView(staticLocation, 18);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);
        let circle;
        let staticMarker;
        let line;
        let routingControl;

       
         staticMarker = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3426/3426997.png',
    iconSize: [30, 30],
    iconAnchor: [20, 40], 
    popupAnchor: [0, -40]
});
staticMarker = L.marker(staticLocation, { icon: staticMarker })
    .addTo(map)
    .bindPopup('<b>Crime Location</b>');
       
        window.MapController = (netInfo) => {
            const policeLocation = [netInfo.latitude, netInfo.longitude];
            const policeIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/5600/5600529.png', 
    iconSize: [30, 30],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});
            if (!circle) {
                circle = L.marker(policeLocation, { icon: policeIcon })
            .addTo(map)
            .bindPopup('<b>Your Location</b>');
            } else {
                circle.setLatLng(policeLocation);
            }

            
            if (routingControl) {
                map.removeControl(routingControl); 
            }

           
            routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(policeLocation),
                    L.latLng(staticLocation)
                ],
                routeWhileDragging: false,
                createMarker: function() { return null; },
                showAlternatives: false ,
                show: false
            }).addTo(map);

            map.setView(policeLocation, 18);
            //window.ReactNativeWebView.postMessage(JSON.stringify(netInfo));
        };
        window.updateStaticLocation = (newLocation) => {
            // Update the staticLocation coordinates
            staticLocation[0] = newLocation.latitude;
            staticLocation[1] = newLocation.longitude;

            // Move the staticMarker to the new staticLocation
            if (staticMarker) {
                staticMarker.setLatLng([newLocation.latitude, newLocation.longitude]);
            }

            // Optionally, update routing control if needed
            if (routingControl) {
                routingControl.setWaypoints([
                    L.latLng(circle.getLatLng()), // Current location of police
                    L.latLng(staticLocation)      // Updated static location
                ]);
            }

            // Optionally, you can update map view
            map.setView([newLocation.latitude, newLocation.longitude], 18);
           // window.ReactNativeWebView.postMessage(JSON.stringify(newLocation));
        };
        
        window.spotPoliceLocation = (newLocation) => {
            map.setView([newLocation.latitude, newLocation.longitude], 18);
        }


        window.spotCrimeLocation = (newLocation) => {
    map.setView([newLocation.latitude, newLocation.longitude], 18);
    const crimePopupContent = ``
        <div style="overflow-x:auto;">
            <table border="1" style="width:100%; border-collapse: collapse;">
                <tr><th colspan="2" style="text-align: center; background: #f2f2f2;">Crime Details</th></tr>
                <tr><td><b>Report ID</b></td><td>${newLocation.report_id}</td></tr>
                <tr><td><b>Date</b></td><td>${new Date(newLocation.created_date).toLocaleDateString()}</td></tr>
                <tr><td><b>Time</b></td><td>${newLocation.created_time}</td></tr>
                <tr><td><b>Location</b></td><td>${newLocation.crime_location}</td></tr>
                <tr><td><b>Registered By</b></td><td>${newLocation.registered_by_name} (${newLocation.register_phone})</td></tr>
                <tr><td><b>Status</b></td><td>${newLocation.status}</td></tr>
                <tr><td><b>Suspect Gender</b></td><td>${newLocation.suspect_gender}</td></tr>
                <tr><td><b>Crime Remarks</b></td><td>${newLocation.crimeremarks}</td></tr>
                <tr><td><b>Image</b></td><td><a href="${newLocation.image}" target="_blank">View Image</a></td></tr>
            </table>
        </div>
    ``;

  
    if (staticMarker) {
        staticMarker
            .setLatLng([newLocation.latitude, newLocation.longitude])
            .bindPopup(crimePopupContent)
            .openPopup("crime location");
    }

    window.ReactNativeWebView.postMessage(JSON.stringify(newLocation));
};

    </script>
</body>
</html>
    `,
  };
  
//     html: `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Map</title>
//     <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
//     <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css" />
//     <style>
//         #map { height: 100vh; width: 100%; }
//          /* Map styles */
    
//             /* Streets style */
//             .leaflet-container.streets {
//                 background-color: #f8f8f8;
//             }
    
//             /* Satellite style */
//             .leaflet-container.satellite {
//                 background-color: #000;
//             }
    
//             /* Hybrid style */
//             .leaflet-container.hybrid {
//                 background-color: #0a0a0a;
//             }
    
//             /* Terrain style */
//             .leaflet-container.terrain {
//                 background-color: #d8cfc4;
//             }
    
//             .leaflet-top.leaflet-left {
//                 top: 10px;
//                 left: 10px;
//             }
//     </style>
// </head>
// <body>
//     <div id="map"></div>
//     <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
//     <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>
//     <script>
//          const staticLocation = [17.4418, 78.3480]; 
//         const map = L.map('map').setView(staticLocation, 18);
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             maxZoom: 19,
//         }).addTo(map);
//         let circle;
//         let staticMarker;
//         let line;
//         let routingControl;

       
//         staticMarker = L.circleMarker(staticLocation, {
//             color: 'blue',
//             fillColor: 'blue',
//             fillOpacity: 0.6,
//             radius: 10
//         }).addTo(map).bindPopup('<b>Crime Location</b>');

       
//         window.MapController = (netInfo) => {
//             const policeLocation = [netInfo.latitude, netInfo.longitude];

//             if (!circle) {
//                 circle = L.circleMarker(policeLocation, {
//                     color: 'red',
//                     fillColor: 'red',
//                     fillOpacity: 0.6,
//                     radius: 10
//                 }).addTo(map).bindPopup('<b>Your Location</b>');
//             } else {
//                 circle.setLatLng(policeLocation);
//             }

            
//             if (routingControl) {
//                 map.removeControl(routingControl); 
//             }

           
//             routingControl = L.Routing.control({
//                 waypoints: [
//                     L.latLng(policeLocation),
//                     L.latLng(staticLocation)
//                 ],
//                 routeWhileDragging: false,
//                 createMarker: function() { return null; },
//                 showAlternatives: false ,
//                 show: false
//             }).addTo(map);

//             map.setView(policeLocation, 18);
//             //window.ReactNativeWebView.postMessage(JSON.stringify(netInfo));
//         };
//         window.updateStaticLocation = (newLocation) => {
//             // Update the staticLocation coordinates
//             staticLocation[0] = newLocation.latitude;
//             staticLocation[1] = newLocation.longitude;

//             // Move the staticMarker to the new staticLocation
//             if (staticMarker) {
//                 staticMarker.setLatLng([newLocation.latitude, newLocation.longitude]);
//             }

//             // Optionally, update routing control if needed
//             if (routingControl) {
//                 routingControl.setWaypoints([
//                     L.latLng(circle.getLatLng()), // Current location of police
//                     L.latLng(staticLocation)      // Updated static location
//                 ]);
//             }

//             // Optionally, you can update map view
//             map.setView([newLocation.latitude, newLocation.longitude], 18);
            
//             // Sending updated location info back (if needed)
//            // window.ReactNativeWebView.postMessage(JSON.stringify(newLocation));
//         };
//         window.spotCrimeLocation = (newLocation) => {
//             map.setView([newLocation.latitude, newLocation.longitude], 18);
//         }
//         window.spotPoliceLocation = (newLocation) => {
//             map.setView([newLocation.latitude, newLocation.longitude], 18);
//         }
//     </script>
// </body>
// </html>
//     `,
//   };
  