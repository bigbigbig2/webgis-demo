<template>
  <div div id="map" class="map" :style="{height:this.height}">
    <!--
    <input type="button" value="查询" @click="queryWfs" />
    <input id="select" type="checkbox" value="select" />选择
    <input id="modify" type="checkbox" value="modify" />编辑
    <input id="save" type="button" value="保存" onclick="onSave();" />
    -->
    <el-button class="option" type="primary" style="margin-left: 16px" @click="drawer = true">
      操作
    </el-button>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <span>Hi there!</span>
    </el-drawer>
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
import Modify from 'ol/interaction/Modify';
import { ElMessageBox, ElMessage } from 'element-plus'

export default {
  name: "night",
  data() {
    return {
      map:{},
      height:(window.innerHeight) + 'px',
      wfsVectorLayer:null,
      modifiedFeatures:null,
      drawer:false,
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
      // var roadLayer = new VectorLayer({
      //   source: new VectorSource({
      //     format: new GeoJSON(),
      //     url:'http://localhost:8080/geoserver/wfs?service=wfs&version=1.1.0&request=GetFeature&typeNames=webgis_demo:gz_small&outputFormat=application/json&srsname=EPSG:4326'
      //   }),
      //   style: function(feature, resolution) {
      //     return new Style({
      //       stroke: new Stroke({
      //         color: 'orange',
      //         width: 1
      //       })
      //     });
      //   }
        
      // })
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
      //实现重新查询功能
      if(this.wfsVectorLayer){
        this.map.removeLayer(wfsVectorLayer);
      }
      this.wfsVectorLayer = new VectorLayer({
        source: new VectorSource({
          format: new GeoJSON(),
          url:'http://localhost:8080/geoserver/wfs?service=wfs&version=1.1.0&request=GetFeature&typeNames=webgis_demo:gz_small&outputFormat=application/json&srsname=EPSG:4326'
        }),
        style: function(feature, resolution) {
          return new Style({
            stroke: new Stroke({
              color: 'orange',
              width: 2
            })
          });
        }
      })
      this.map.addLayer(wfsVectorLayer);
    }
  }
      
}
</script>

<style scoped>
.map {
  height: 900px;
  width: 100%;
}
.option{
  position: absolute;
  z-index:10;
  right:10px;
  top:10px;
}

</style>