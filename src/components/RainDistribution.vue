<template>
  <div>
    <div id="map" :style="{ height: mapHeight + 'px' }"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { defaults as defaultControls, OverviewMap } from "ol/control";

export default {
  name: "RainDistribution",
  props: {
  },
  data: function() {
    return {
      mapHeight: 500
    };
  },
  created: function() {
    this.mapHeight = window.innerHeight - 60;
  },
  mounted: function() {
    const source = new XYZ({
      url:'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0'
    });
    const overviewMapControl = new OverviewMap({
      layers: [
        new TileLayer({
          source
        })
      ]
    });

    new Map({
      target: "map",
      layers: [
        new TileLayer({
          source
        })
      ],
      controls: defaultControls().extend([overviewMapControl]),
      view: new View({
        center: [104.06, 30.67],
        zoom: 7
      })
    });
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 500px;
}
</style>