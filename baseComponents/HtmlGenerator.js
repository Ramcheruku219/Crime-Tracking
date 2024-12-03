export const HtmlGenerator = (netInfo, crimeInfo) => {
    return {
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Leaflet Map with Route and Real-Time Tracking</title>
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
            />
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css"
            />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
            />
            <style>
                #map {
                    height: 94vh;
                    width: 100%;
                }
                .info-panel {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    background-color: rgba(255, 255, 255, 0.9);
                    padding: 10px;
                    text-align: center;
                    font-size: 16px;
                    box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.3);
                    display: flex;
                    justify-content: space-between;
                }
                .info-item {
                    flex: 1;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap:10px;
                }
                .info-title {
                    font-weight: bold;
                }
                .icon-image {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }
                .btnCon {
                    position: absolute;
                    left: 20px;
                    bottom: 100px;
                    z-index: 1000;
                    display: flex;
                    gap:10px;
                }
                .button {
                    border: none;
                    padding: 10px;
                    cursor: pointer;
                    border-radius: 5px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .button-crime {
                    bottom: 140px;
                    left: 20px;
                }
                * {
                padding: 0px;
                margin: 0px;
            }
    
            #fullscreen-button {
                position: absolute;
                bottom: 10px;
                left: 10px;
                height: 10px;
                width: 10px;
                z-index: 1000;
                background: white;
                padding: 10px;
                cursor: pointer;
                border-radius: 5px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
            }
    
            .fullscreen {
                width: 100% !important;
                height: 100% !important;
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                z-index: 9999 !important;
            }
    
            .selected {
                border: 2px solid blue;
                /* Change the border color to indicate selection */
            }
    
            #icon {
                height: 25px;
                width: 25px;
                padding: 10px;
                /* background-color: #d8cfc4; */
                border-radius: 5px;
            }
    
            #map-style {
                position: absolute;
                bottom: 10px;
                left: 10px;
                z-index: 1000;
                padding: 5px;
                background-color: white;
                border-radius: 10px;
            }
    
            .leaflet-layer,
            .leaflet-control-zoom-in,
            .leaflet-control-zoom-out,
            .leaflet-control-attribution {
                filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
            }
    
            #directions-button {
                position: absolute;
                left: 10px;
                bottom: 10px;
                z-index: 1000;
                padding: 10px;
                height: 25px;
                width: 25px;
                background-color: white;
                border-radius: 5px;
                cursor: pointer;
                display: none;
            }
    
    
            #loader {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: none;
            }
    
            .loader {
                border: 8px solid #f3f3f3;
                border-radius: 50%;
                border-top: 8px solid #3498db;
                width: 50px;
                height: 50px;
                -webkit-animation: spin 1s linear infinite;
                animation: spin 1s linear infinite;
            }
    
            @-webkit-keyframes spin {
                0% {
                    -webkit-transform: rotate(0deg);
                }
    
                100% {
                    -webkit-transform: rotate(360deg);
                }
            }
    
            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
    
                100% {
                    transform: rotate(360deg);
                }
            }
    
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
        <div class="btnCon">
            <button class="button" onclick="showPoliceLocation()">
                <i class="fas fa-map-marker-alt" style="font-size: 20px; color:red; align-self:center;"></i>
                <p>Police</p>
            </button>
            <button class="button button-crime" onclick="showCrimeLocation()">
                <i class="fas fa-street-view" style="font-size: 20px; color:blue; align-self:center;"></i>
                <p>Crime</p>
            </button>
        </div>
        <div id="map"></div>
        <div class="info-panel">
            <div class="info-item">
                <div class="info-title">Speed</div>
                <div id="speed">0 km/h</div>
            </div>
            <div class="info-item">
                <div class="info-title">Distance</div>
                <div id="distance">Calculating...</div>
            </div>
        </div>

        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>
        <script>
            const crimeLocation = [${crimeInfo.latitude}, ${crimeInfo.longitude}];
            const policeLocation = [${netInfo.latitude}, ${netInfo.longitude}];
            
            const map = L.map('map', { attributionControl: false }).setView(crimeLocation, 13);
            L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
                maxZoom: 20,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
          }).addTo(map);
            
            const crimeIcon = L.divIcon({
                html: '<i class="fas fa-street-view" style="font-size: 20px; color:blue;"></i>',
                className: 'custom-crime-icon',
                iconSize: [30, 30],
                popupAnchor: [0, -15]
            });
            L.marker(crimeLocation, { icon: crimeIcon }).addTo(map).bindPopup('<b>Crime Location</b>').openPopup();

            const policeIcon = L.icon({
                iconUrl: 'https://media.istockphoto.com/id/980818516/photo/indian-police-man-in-uniform.jpg?s=1024x1024&w=is&k=20&c=cSsye50OiTjIZFm2Zmk65RmIGUHNL5tFmbeDUF-9kT8=',
                iconSize: [30, 30],
                className: 'icon-image'
            });
            const policeMarker = L.marker(policeLocation, { icon: policeIcon }).addTo(map);
            
            const routeControl = L.Routing.control({
                waypoints: [L.latLng(policeLocation), L.latLng(crimeLocation)],
                createMarker: () => null,
                routeWhileDragging: false,
                showAlternatives: false
            }).addTo(map);

            routeControl.on('routesfound', (e) => {
                const route = e.routes[0];
                document.getElementById('distance').innerText = (route.summary.totalDistance / 1000).toFixed(2) + ' km';
            });

            let lastLocation = policeLocation;
            let lastTime = Date.now();

            function updateSpeed() {
                const currentTime = Date.now();
                const deltaTime = (currentTime - lastTime) / 1000;
                lastTime = currentTime;

                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const distance = map.distance(lastLocation, [lat, lng]);
                    const speed = (distance / deltaTime) * 3.6;
                    document.getElementById('speed').innerText = speed.toFixed(2) + ' km/h';
                    lastLocation = [lat, lng];
                });
            }

            setInterval(updateSpeed, 3000);

            function showPoliceLocation() {
                map.setView(policeLocation, 18);
            }

            function showCrimeLocation() {
                map.setView(crimeLocation, 18);
            }
        </script>
        </body>
        </html>
        `
    };
};
