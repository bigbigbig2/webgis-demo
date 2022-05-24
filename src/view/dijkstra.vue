<template>
<div v-loading="loading"
      element-loading-text="Loading..."
      element-loading-background="rgba(0, 0, 0, 0.8)">
    <div id="map" class="map" :style="{height:this.height}" >
      <el-collapse class="collapse" v-model="activeNames" accordion style="color:#2A2B2E;">
        <el-collapse-item title="控制面板" name="1">
          <template #title>
              <p style="margin-left:10px">use && tip</p>
              <el-icon><InfoFilled /></el-icon>
          </template>
          <div style="margin-left:10px">
            通过依次鼠标选取起点与终点：   <el-switch v-model="value1" /> 
          </div>
          <div style="margin-left:10px">
            路径搜索： <el-button round size="small"><el-icon><Search /></el-icon></el-button>
          </div>
          <div style="margin-left:10px">
            清空路径： <el-button round  size="small"><el-icon><DeleteFilled /></el-icon></el-button>
          </div>
          <br>
          <div style="margin-left:10px">
            说明：Consistent with real life: in line with the process and logic of real
            life, and comply with languages and habits that the users are used to;
          </div>
          <br>
          <div style="margin-left:10px">
            关于：Consistent with real life: in line with the process and logic of real
            life, and comply with languages and habits that the users are used to;
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
 </div>
</template>

<script>
import TileLayer from 'ol/layer/Tile';
// import VectorLayer from 'ol/layer/Vector';
import Map from "ol/Map";
import View from "ol/View";
import Feature from 'ol/Feature';
import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import {transform} from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Text, Fill, Stroke, Style} from 'ol/style';
import Point from 'ol/geom/Point';
import { InfoFilled,Search,DeleteFilled} from "@element-plus/icons-vue";

import OSM from 'ol/source/OSM';

import { ElMessageBox, ElMessage } from 'element-plus'

export default {
  name: "dijkstra",
  components:{InfoFilled,Search,DeleteFilled},
  data() {
    return {
      map:{},
      height:(window.innerHeight) + 'px',
      loading:false,
      vectorLayer:{},
      activeNames:1,
      value1:false,
      result:null,
      startPoint:null,
      endPoint:null,
      vectorLayer:null,
      
    }
  },
  created() {},
  mounted() {
    this.map = this.initMap();
    this.startPoint=new Feature() //起点要素
    this.endPoint=new Feature()  //终点要素
    // 用于包含起始点要素和目标点要素的图层
    this.vectorLayer = new VectorLayer({
        source: new VectorSource({
            features: [this.startPoint, this.endPoint]
        })
    });
    this.map.addLayer(this.vectorLayer);

    this.map.on('click', (event)=>{
      if(this.startPoint.getGeometry() == null){
        // 设置起始点要素的坐标信息
        this.startPoint.setGeometry(new Point(event.coordinate));
      }else if(this.endPoint.getGeometry()==null){
        // 设置目标点要素的坐标信息
        this.endPoint.setGeometry(new Point(event.coordinate));
        var startCoord = this.startPoint.getGeometry().getCoordinates();
        var destCoord = this.endPoint.getGeometry().getCoordinates();
        // 设置GeoServer的SQL视图的请求参数
        var viewparams = [
                'x1:' + startCoord[0], 'y1:' + startCoord[1],
                'x2:' + destCoord[0], 'y2:' + destCoord[1]
        ];
        viewparams = viewparams.join(';');
      }
      // 向GeoServer发送WMS请求，并将结果路径渲染出来
      this.result = new ImageLayer({
          source:new ImageWMS({
              url: 'http://localhost:8080/geoserver/shenzhen/wms',
              params: {
                  LAYERS: 'shenzhen:shenzhen',
                  FORMAT: 'image/png',
                  viewparams: viewparams
              }
          })
      });
      this.map.addLayer(this.result);
    })


  },
  methods: {
    initMap(){
      var baseLayer = new TileLayer({
        source:new OSM({})
      })
      var map = new Map({
        target:"map",
        layers:[baseLayer],
        view:new View({
          center: transform([114.078161, 22.628408], 'EPSG:4326', 'EPSG:3857'),
          projection: 'EPSG:3857',
          zoom:12
        })
      })
      return map;
    },
    // addVector(){
    //   var startPoint=new Feature() //起点要素
    //   var destPoint=new Feature()  //终点要素
    //   // 用于包含起始点要素和目标点要素的图层
    //   const vectorLayer = new VectorLayer({
    //       source: new VectorSource({
    //           features: [startPoint, destPoint]
    //       })
    //   });
    //   this.map.addLayer(vectorLayer);
    // },
    // main(){      
    //     this.map.on('click', (event)=>{
    //       if(this.startPoint.getGeometry()==null){
    //         // 设置起始点要素的坐标信息
    //         startPoint.setGeometry(new Point(event.coordinate));
    //       }else if(this.endPoint.getGeometry()==null){
    //         // 设置目标点要素的坐标信息
    //         destPoint.setGeometry(new ol.geom.Point(event.coordinate));
    //         var startCoord = startPoint.getGeometry().getCoordinates();
    //         var destCoord = destPoint.getGeometry().getCoordinates();
    //         // 设置GeoServer的SQL视图的请求参数
    //         var viewparams = [
    //                 'x1:' + startCoord[0], 'y1:' + startCoord[1],
    //                 'x2:' + destCoord[0], 'y2:' + destCoord[1]
    //         ];
    //         viewparams = viewparams.join(';');
    //       }
    //       // 向GeoServer发送WMS请求，并将结果路径渲染出来
    //       result = new ImageLayer({
    //           source: ImageWMS({
    //               url: 'http://localhost:8080/geoserver/shenzhen/wms',
    //               params: {
    //                   LAYERS: 'shenzhen:shenzhen',
    //                   FORMAT: 'image/png',
    //                   viewparams: viewparams
    //               }
    //           })
    //       });
    //       this.map.addLayer(result);
    //     })
    // }

    
  }     
}
</script>

<style lang="scss">
.map {
  height: 900px;
  width: 100%;
  .collapse {
    position: absolute;
    z-index: 10;
    color:#2A2B2E;
    width:400px;
    top:10px;
    right:10px;
  }
}
</style>