## 本地运行

前提：安装node，yarn

安装依赖

```
yarn
```

vite服务器运行

```
yarn dev
```

已完成部分截图：

## 地球存的夜晚

![Snipaste_2022-03-23_20-20-34](https://gitee.com/dan_but/image2/raw/master/img/Snipaste_2022-03-23_20-20-34.png)

卷帘的左侧为2012年的地球夜间灯光数据，右侧为2016年的地球夜间灯光数据，可以拖动拖动卷帘条拖动对比探索🌍🌎🌏，数据来源于NASA。

上面openlayers中和下面cesium加载的为发布到geoserver中的wms。

![Snipaste_2022-03-23_20-20-53](https://gitee.com/dan_but/image2/raw/master/img/Snipaste_2022-03-23_20-20-53.png)

## 通过WFS增删改查要素

shp数据存储于postgresql/postgis，在geoserver连接postgis发布图层，供给openlayers调用（openlayers不支持shpfile，需通过api转成geoJSON）

通过WFS查询要素GIF如下：

查询要素（情况1：未加载）

![featureQuery1](https://cdn.jsdelivr.net/gh/bigbigbig2/image2/img/featureQuery1.gif)

查询要素（情况2：已加载）

![featureQuery2](https://cdn.jsdelivr.net/gh/bigbigbig2/image2/img/featureQuery2.gif)

## 

