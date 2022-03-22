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
// import VectorLayer from 'ol/layer/Vector';
import Map from "ol/Map";
import View from "ol/View";
import TileWMS from 'ol/source/TileWMS';
import VectorSource from 'ol/source/Vector';
import {Text, Fill, Stroke, Style} from 'ol/style';
import {defaults} from 'ol/control';
 import {getRenderPixel} from 'ol/render';
 import OSM from 'ol/source/OSM';

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
    this.map =this.initMap();
    this.initSwipeDom(this.map);
    this.swipeLayer(this.map);
    
    
  },
  methods: {
    initMap(){
      var twelve = new TileLayer({
        // source: new OSM(),
        source: new TileWMS({
            url:'http://localhost:8080/geoserver/earth_night/wms',
            params:{
              "FORMAT":"image/png8",
              'VERSION':'1.1.1',
              'LAYERS':'earth_night:2012',
            },
            attributions:'<a href="https://earthobservatory.nasa.gov/features/NightLights">© Data by NASA</a> '
            
            
        })
      })
      var sixteen = new TileLayer({
            source: new TileWMS({
                url:'http://localhost:8080/geoserver/earth_night/wms',
                params:{
                  "FORMAT":"image/png8",
                  'VERSION':'1.1.1',
                  'LAYERS':'earth_night:2016',
                },
                attributions:
                '<a href="https://earthobservatory.nasa.gov/features/NightLights">© Data by NASA</a> ' 
                  
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
          maxZoom: 7
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