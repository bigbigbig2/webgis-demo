<template>
    <div id="map" class="map" :style="{height:this.height}" v-loading="loading">
      <el-button type="info" class="serach" @click="queryWfs">
          要素查询 <el-icon><search /></el-icon>
      </el-button>
    </div>

</template>

<script>
import TileLayer from 'ol/layer/Tile';
// import VectorLayer from 'ol/layer/Vector';
import Map from "ol/Map";
import View from "ol/View";
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import { defaults, ZoomToExtent,Rotate } from 'ol/control'
import { Search} from "@element-plus/icons-vue";

import { ElMessageBox, ElMessage } from 'element-plus'

export default {
  name: "night",
  components:{Search},
  data() {
    return {
      map:{},
      height:(window.innerHeight) + 'px',
      loading:false,
    }
  },
  created() {},
  mounted() {
    this.map = this.initMap();
  },
  methods: {
    initMap(){
      var baseLayer = new TileLayer({
        source:new XYZ({
          url: 'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=bc1039e48ae2d6e8ee53afdb8a603e96',
        })
      })
      var map = new Map({
        target:"map",
        layers:[baseLayer],
        view:new View({
          center: [113.325127,23.108964],
          projection: 'EPSG:4326',
          zoom: 15,
          minZoom:1,
          maxZoom:18
        })
      })
      return map;
    },
    queryWfs(){
      this.loading=true;
      var roadLayer =new VectorLayer({
        source: new VectorSource({
          format: new GeoJSON(),
          url:'http://localhost:8080/geoserver/wfs?service=wfs&version=1.1.0&request=GetFeature&typeNames=webgis_demo:gz_small&outputFormat=application/json&srsname=EPSG:4326'
        }),
        style: function(feature, resolution) {
          return new Style({
            stroke: new Stroke({
              color: 'orange',
              width: 1
            })
          });
        }    
      })
      this.map.addLayer(roadLayer);
      
      
    }
  }
      
}
</script>

<style scoped>
.map {
  height: 900px;
  width: 100%;
}
.serach {
  position: absolute;
  right:15px;
  bottom:15px;
  z-index: 10;
  color:aliceblue;
}
button.el-button.el-button--info.serach {
    color: #fff;
    background-color: #2A2B2E;
    border: none;
}

</style>