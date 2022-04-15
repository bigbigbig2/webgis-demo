<template>
<div v-loading="loading"
      element-loading-text="Loading..."
      element-loading-background="rgba(0, 0, 0, 0.8)">
    <div id="map" class="map" :style="{height:this.height}" >
        <el-select v-model="cur" class="sel" placeholder="请选中未来时段查看雨情" size="large" @change="this.displayRainPublic(this.cur);">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            />
        </el-select>
    </div>
 </div>
</template>

<script>
import TileLayer from 'ol/layer/Tile';
// import VectorLayer from 'ol/layer/Vector';
import Map from "ol/Map";
import View from "ol/View";
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import {fromLonLat,getTransform} from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Text, Fill, Stroke, Style} from 'ol/style';
import axios from 'axios'

import OSM from 'ol/source/OSM';

import { ElMessageBox, ElMessage } from 'element-plus'

export default {
  name: "night",
  data() {
    return {
      map:{},
      height:(window.innerHeight) + 'px',
      loading:false,
      options:[
        {
            value: 24,
            label: '24小时',
        },
        {
            value: 48,
            label: '48小时',
        },
        {
            value: 72,
            label: '72小时',
        }
      ],
      cur:24,
      //雨水等级
      rainLevel:{
        0: '小雨',
        2.5: '小雨',
        5: '小雨',
        10: '中雨',
        25: '大雨',
        50: '暴雨',
        100: '大暴雨',
        250: '特大暴雨'
      },
      vectorLayer:{},
      loading:false
    }
  },
  created() {},
  mounted() {
    this.vectorLayer=new VectorLayer({
        source: new VectorSource(),
        style: (feature) =>{
            // 根据参数自定义显示label和图层颜色，使得不同雨量级别的Feature显示不同颜色
            let style = this.genStyle(feature.get('color'));
            return style;
        }
    });
    this.map = this.initMap();
    this.displayRainPublic(this.cur);

  },
  methods: {
    initMap(){
      var baseLayer = new TileLayer({
        source:new OSM({})
      })
      var map = new Map({
        target:"map",
        layers:[baseLayer,this.vectorLayer],
        view:new View({
          center: fromLonLat([104.06, 30.67]),
          zoom: 4,
          minZoom:1,
          maxZoom:18
        })
      })
      return map;
    },
    genStyle(g){
        //根据雨量大小定义矢量图层显示样式
        var style = new Style({
            fill: new Fill({
            color: 'rgba(' + g + ', 0.6)'
            }),
            stroke: new Stroke({
                color: '#319FD3',
                width: 1
            })
        });
        return style;      
    },
    //获取雨水数据并渲染
    displayRainPublic(a){
      this.loading = true;
      axios({
      url: 'http://typhoon.zjwater.gov.cn/Api/LeastRain/' + a,
      method:'get',
      responseType: 'json',
      jsonp: 'callback',
      }).then(a=>{
        console.log(a);
        var b, c, d, e, f, g;
          this.vectorLayer.getSource().clear();
          //根据获取的数据解析数据
          for (b = JSON.parse(a.data.contours), c = 0; c < b.length; c++) {
            for (d = [], e = b[c], f = 0; f < e.latAndLong.length; f++) {
              d.push([e.latAndLong[f][1], e.latAndLong[f][0]]);
            }
            g = b[c].color.substring(0, b[c].color.lastIndexOf(','));
            var polygon = new Polygon([d]);
            polygon.applyTransform(getTransform('EPSG:4326', 'EPSG:3857'));
            var feature = new Feature({
              geometry: polygon,
              rainLevel: this.rainLevel[e.symbol],
              color: g
            });
            this.vectorLayer.getSource().addFeature(feature);
          }
          const key = this.vectorLayer.on('postrender',()=>{
            this.loading = false;
            //注销事件，不然放大地图什么它都会重新渲染，都会调用这个函数巨多次
            ElMessage({
              type: 'success',
              message: '数据来源中央气象台，发布时间'+a.data.time,
            })    
            this.vectorLayer.un(key.type, key.listener)
          })
      })
    }
    
  }     
}
</script>

<style scoped>
.map {
  height: 900px;
  width: 100%;
}
.sel{
    position: absolute;
    right:35px;
    top:19px;
    z-index: 10;
    color:#fff;
}

</style>