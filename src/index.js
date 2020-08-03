import "../node_modules/ol/ol.css";
import "./styles/page.css";
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import * as util from './modules/utils.js'
import {LayerObject} from './modules/layer.js';
import vertexShader from './shaders/vertex.shader';
import fragmentShader from './shaders/fragment.shader';
import finalVertex from './shaders/finalVertex.shader';
import finalFragment from './shaders/finalFragment.shader';
import {WebGLCanvas} from './modules/webgl.js';


const testMapView = new View({
    center: [-7337.954715, 6709336.594760],
    zoom: 7,
})

const testWMS = new TileWMS({
    url: "https://services.sentinel-hub.com/ogc/wms/061d4336-8ed1-44a5-811e-65eea5ee06c4",
    params: {
        'LAYERS': "NDVI", 
        'TILED': true, 
        'FORMAT': 'image/png',
        'showLogo': false,
        'CRS': "EPSG:3857",
    },
    attribution: "test",
    crossOrigin: "anonymous",
});

const testMapLayer1 = new TileLayer({
    source: testWMS,
    visible: true,
    title: "Sentinel testing",
    opacity: 1,
    minZoom: 6,
});

const testMapLayer2 = new TileLayer({
    source: testWMS,
    visible: true,
    title: "Sentinel testing",
    opacity: 1,
    minZoom: 6,
});

var webgl = new WebGLCanvas("canvas_map", vertexShader, finalVertex, finalFragment);
var testLayerObject = new LayerObject(testMapLayer1, testMapView);
testLayerObject.addShader(fragmentShader);
testLayerObject.addShader(fragmentShader);
webgl.activateLayer(testLayerObject);

testLayerObject.olMap.on("postrender", () => {
    webgl.runAttachedPrograms([{
        uniforms: {
            u_multiplier: [0.5, 0.3, 1, 1],
        },
    },{
        uniforms: {
            u_multiplier: [1, 1, 0.9, 1],
        },
    },
    ])
})


