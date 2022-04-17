<template>
<div class="container">
    <div id="cesiumContainer" :style="{height:this.height}"></div>
</div>
</template>
<script>
// import { Viewer } from 'cesium';
import * as Cesium from 'cesium';
export default{
    name:'3D',
    data() {
    return {
        height:(window.innerHeight) + 'px'
    }
    },
    mounted() {
        const viewer = new Cesium.Viewer('cesiumContainer',{
            animation:false, //动画小控件
            baseLayerPicker: false, //图层选择器
            fullscreenButton:false, 
            geocoder:false, //查询按钮
            infoBox:false,
            sceneModePicker:false,
            timeline:false,
            selectionIndicator:false,
        
        });
        // console.log(height)
        // 加载geoserver发布的WMS服务
        var earthNight = new Cesium.WebMapServiceImageryProvider({
            url:'http://124.221.72.79:8080/geoserver/webgis_demo/wms',
            layers:'webgis_demo:2016',
            parameters:{
                service: 'WMS',
                format:'image/png8',
                transparent:true,
            }
            
        });
        viewer.imageryLayers.addImageryProvider(earthNight)
    },
}
</script>

<style>
html,
body,
#cesiumContainer {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>