<template>
  <div>
    <div id="map" :style="{ height: mapHeight + 'px' }"></div>
  </div>
</template>

<script>
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from "ol/Map";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import VectorSource from 'ol/source/Vector';
 import {Text, Fill, Stroke, Style} from 'ol/style';
 import {defaults} from 'ol/control';

export default {
  name: "night",
  data() {
    return {
      mapHeight: 500,
      map:{},
    }
  },
  created() {
    this.mapHeight = window.innerHeight;
  },
  mounted() {
    this.map = new Map({
      controls:defaults({
        attribution: false,
        rotate: false,
        zoom: false
      }),
      target: "map",
      layers: [
        new TileLayer({
          source: new XYZ({
              url: 'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=bc1039e48ae2d6e8ee53afdb8a603e96',
              crossOrigin: 'anonymous',
              
          })
        })
      ],
      view: new View({
        center: [119.6114, 32.8403],
        projection: 'EPSG:4326',
        zoom: 15,
        minZoom:2,
        maxZoom: 18
      })
    });

  },
  methods: {
  }

}
</script>

<style scoped>
#map {
  width: 100%;
  height: 500px;
}
</style>