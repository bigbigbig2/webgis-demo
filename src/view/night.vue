<template>
<div id="map" class="map" :style="{height:this.height}">
    <div id="swipeContainer" >
        <div id="swipeDiv">
            <div class="handle"></div>
        </div>
    </div>
</div>

</template>

<script>
import TileLayer from 'ol/layer/Tile';
import Map from "ol/Map";
import View from "ol/View";
import WMTS from 'ol/source/WMTS';
import Projection from 'ol/proj/Projection';
import {defaults} from 'ol/control';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { ElMessageBox, ElMessage } from 'element-plus'

export default {
  name: "night",
  data() {
    return {
      map:{},
      height:(window.innerHeight) + 'px',
      gridNames:['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6'],
      resolutions:[0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125]

    }
  },
  created() {
    
  },
  mounted() {
    this.map =this.initMap();
    this.initSwipeDom(this.map);
    this.swipeLayer(this.map);
    this.messageBox()
    
  },
  methods: {
    initMap(){
      var twelve = new TileLayer({
        // source: new OSM(),
        // source: new TileWMS({
        //     url:'http://124.221.72.79:8080/geoserver/webgis_demo/wms',
        //     params:{
        //       "FORMAT":"image/png8",
        //       'VERSION':'1.1.1',
        //       'LAYERS':'webgis_demo:2012',
        //       'tiled':true
        //     },
        // })
        source:new WMTS({
          url: 'http://124.221.72.79:8080/geoserver/gwc/service/wmts',
          layer:'webgis_demo:2012',
          matrixSet: 'EPSG:4326',
          format: 'image/png',
          projection: new Projection({
            code: 'EPSG:4326',//投影编码
            units: 'degrees',
            axisOrientation: 'neu'
          }),
          tileGrid:new WMTSTileGrid({
                tileSize: [256, 256],
                extent: [-180.0, -90.0, 180.0, 90.0],//范围,这里使用的默认的EPSG4326策略，参考相关配置即可
                origin: [-180.0, 90.0], //原点，左上角
                resolutions: this.resolutions, //瓦片地图分辨率
                matrixIds: this.gridNames, // Name
          }),
          attributions:'<a type="info" href="https://earthobservatory.nasa.gov/features/NightLights">Data from NASA</a> '

        })

      })
      var sixteen = new TileLayer({
            // source: new TileWMS({
            //     url:'http://124.221.72.79:8080/geoserver/webgis_demo/wms',
            //     params:{
            //       "FORMAT":"image/png8",
            //       'VERSION':'1.1.1',
            //       'LAYERS':'webgis_demo:2016',
            //       'tiled':true
            //     },
            //     attributions:
            //     '<a type="info" href="https://earthobservatory.nasa.gov/features/NightLights">Data from NASA</a> ' 
            // })
            source:new WMTS({
              url: 'http://124.221.72.79:8080/geoserver/gwc/service/wmts',
              layer:'webgis_demo:2016',
              matrixSet: 'EPSG:4326',
              format: 'image/png',
              projection: new Projection({
                code: 'EPSG:4326',//投影编码
                units: 'degrees',//单位
                axisOrientation: 'neu' //轴方向
              }),
              tileGrid:new WMTSTileGrid({
                    tileSize: [256, 256],
                    extent: [-180.0, -90.0, 180.0, 90.0],//范围,这里使用的默认的EPSG4326策略，参考相关配置即可
                    origin: [-180.0, 90.0], //原点，左上角
                    resolutions: this.resolutions, //瓦片地图分辨率
                    matrixIds: this.gridNames, // 矩阵ID，就是瓦片坐标系z维度各个层级的标识
              }),
            attributions:'<a type="info" href="https://earthobservatory.nasa.gov/features/NightLights">Data from NASA</a> '
            })
      })
      var map = new Map({
        controls:defaults({
            attribution: true,
            rotate: false,
            zoom: false
        }),
        target: "map",
        layers: [twelve,sixteen],
        view: new View({
          center: [0, 0],
          projection: 'EPSG:4326',
          zoom: 1,
          minZoom:0,
          maxZoom: 6
        }),
        controls:defaults({
            attribution: true,
            rotate: false,
            zoom: false
        }),
      });
      return map
    },
    initSwipeDom(map) {
        var swipe = document.getElementById("swipeContainer");
        var obj = {};
        //onmousedown按下鼠标触发
        swipe.onmousedown = function(event) {
            var e = event || window.event; 
            // 鼠标点击元素那一刻相对于元素左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
            obj.diffX = e.clientX - this.offsetLeft;
            document.onmousemove = function(event) {
                var e = event || window.event;
                var moveX = e.clientX - obj.diffX;
                if (moveX < 0) {
                    moveX = 0
                } else if (moveX > window.innerWidth - swipe.offsetWidth) {
                    moveX = window.innerWidth - swipe.offsetWidth
                }
                swipe.style.left = moveX + 'px';
                
                //重新渲染图层
                map.render();
            };
            document.onmouseup = function() {
                this.onmousemove = null;
                this.onmouseup = null;
            }
        };
    },
    swipeLayer(map){
      var layers = map.getLayers();
        var topLayer = layers.item(layers.getLength() - 1);
        topLayer.on('prerender', function(event) {
            var swipe = document.getElementById("swipeContainer");
            var ctx = event.context;
            //计算图层在canvas画布上需要显示的范围
            var mapSize = map.getSize();
            var height = event.context.canvas.height;
            var width = event.context.canvas.width;
            var swipeWidth = swipe.offsetLeft*width/mapSize[0];
            var tl = [swipeWidth,0];
            var tr = [width,0];
            var bl = [swipeWidth,height];
            var br = [width,height];

            ctx.save();
            //绘制裁剪路径
            ctx.beginPath();
            ctx.moveTo(tl[0], tl[1]);
            ctx.lineTo(bl[0], bl[1]);
            ctx.lineTo(br[0], br[1]);
            ctx.lineTo(tr[0], tr[1]);
            ctx.closePath();
            //裁剪，裁剪路径以外的部分不会绘制在canvas上下文中
            ctx.clip();
        });
        topLayer.on('postrender', function(event) {
            var ctx = event.context;
            ctx.restore();
        });
    },
    messageBox(){
       ElMessageBox.alert(
        '<p style="font-size:18px">卷帘的左侧为2012年的地球夜间灯光数据，右侧为2016年的地球夜间灯光数据，可以拖动拖动卷帘条拖动对比探索🌍🌎🌏┏ (゜ω゜)=☞</p>',
        '一只提示',
        {
          dangerouslyUseHTMLString: true,
        }
      )
    }
  },
}
</script>

<style scoped>
.map {
  height: 900px;
  width: 100%;
  position: relative;
}
#swipeContainer {
  position: absolute;
  opacity: 0.8;
  width: 0.625rem;
  height: 100%;
  /* margin: 0 auto; */
  top: 0;
  left: 50%;
  background-color: rgba(50, 50, 50, 0.75);
  cursor: col-resize;
  z-index: 2;
}

#swipeContainer:hover {
  opacity: 0.5;
}

#swipeDiv {
  border: solid 0.5px #ffffff;
  height: 100%;
  width: 0px;
  margin: 0 auto;
}

#swipeDiv .handle {
  width: 51px;
  height: 24px;
  margin-top: -12px;
  margin-left: -20px;
  top: 50%;
  left: 0;
  position: absolute;
  z-index: 30;
  font-family: "CalciteWebCoreIcons";
  speak: none;
  font-size: 12px;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-indent: 0;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: black;
  color: white;
  opacity: 0.6;
}

*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.handle:before {
  margin: 0 18px 0 5px;
  content: "\0399\0399\0399";
  width: 20px;
  height: 24px;
  line-height: 2;
}

.handle:after {
  content: "\0399\0399\0399";
  width: 20px;
  height: 24px;
  line-height: 2;
}
button {
  display: none;
}
</style>