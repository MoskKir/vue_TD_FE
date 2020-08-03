<template>
    <div class="map-container">
        <div id="map"></div>
    </div>
    
</template>

<script>
import * as MapBoxClass from 'mapbox-gl/dist/mapbox-gl.js';
MapBoxClass.accessToken = 'pk.eyJ1IjoibW9za2FsZXZpY2giLCJhIjoiY2tkOGpkejVoMDVsczJ6bzFwN3JlcWdleiJ9.BPJATv3yOVNPi_Jx7y7TvQ';
import vironitLogo from '../assets/vironit-logo.png';

export default {
    data: () => ({
        map: null,
    }),
    mounted() {
        this.map = new MapBoxClass.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v10',
            center: [27.577528953552246, 53.91891122792043],
            zoom: 15.5,
            pitch: 45,
            bearing: -17.6,
            antialias: true
        });

        this.map.on('load', () => {
            let layers = this.map.getStyle().layers;
            
            let labelLayerId;

            for (let i = 0; i < layers.length; i++) {
                if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                    labelLayerId = layers[i].id;
                    break;
                }
            }
            
            this.map.addLayer({
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',   
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'height']
                    ],
                    'fill-extrusion-base': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'min_height']
                    ],
                    'fill-extrusion-opacity': 0.6
                }
            },labelLayerId);

            //---------------- add logo to map ----------------------

            this.map.loadImage(
                vironitLogo,
                (error, image) => {
                    if(error) throw new Error(error);
                    this.map.addImage('companyLogo', image);
                    this.map.addSource('point', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': [
                                    {
                                        'type': 'Feature',
                                        'geometry': {
                                            'type': 'Point',
                                            'coordinates': [27.57699251174927, 53.921779741783155]
                                        }
                                    }
                            ]
                        }
                    })
                    this.map.addLayer({
                        'id': 'points',
                        'type': 'symbol',
                        'source': 'point',
                        'layout': {
                            'icon-image': 'companyLogo',
                            'icon-size': 0.4
                        }
                    })
                }
            );
        })


    } 

    
}
</script>

<style lang="scss" scoped>
.map-container {    
    background-color: white;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.mapboxgl-map {
    height: 70vh;
}
</style>