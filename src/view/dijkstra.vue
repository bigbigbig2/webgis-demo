<template>
<div id="map" class="map" :style="{height:this.height}">
</div>

</template>

<script>
import TileLayer from 'ol/layer/Tile';
// import VectorLayer from 'ol/layer/Vector';
import Map from "ol/Map";
import View from "ol/View";
import TileWMS from 'ol/source/TileWMS';
import {defaults} from 'ol/control';
import { ElMessageBox, ElMessage } from 'element-plus'

export default {
  name: "night",
  data() {
    return {
      map:{},
      height:(window.innerHeight) + 'px'
    }
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {}
      
}
</script>

<style scoped>
.map {
  height: 900px;
  width: 100%;
}
</style>