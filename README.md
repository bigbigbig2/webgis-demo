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

## 地球村的夜晚

使用`openlayers`调用`geoserver`发布的`WMS`服务

![Snipaste_2022-03-23_20-20-34](https://gitee.com/dan_but/image2/raw/master/img/Snipaste_2022-03-23_20-20-34.png)

卷帘的左侧为2012年的地球夜间灯光数据，右侧为2016年的地球夜间灯光数据，可以拖动拖动卷帘条拖动对比探索🌍🌎🌏，数据来源于NASA。

使用`cesium`加载`geoserver`的`wms`。

![Snipaste_2022-03-23_20-20-53](https://gitee.com/dan_but/image2/raw/master/img/Snipaste_2022-03-23_20-20-53.png)

## 通过WFS查询要素

`shp`数据(下载于`OSM`路网数据）存储于`postgresql/postgis`，在`geoserver`连接`postgis`发布图层，供给openlayers调用（`openlayers`不支持`shpfile`，需通过`api`转成`geoJSON`）

查询要素（情况1：未加载）

![featureQuery1](https://cdn.jsdelivr.net/gh/bigbigbig2/image2/img/featureQuery1.gif)

查询要素（情况2：已加载）

![featureQuery2](https://cdn.jsdelivr.net/gh/bigbigbig2/image2/img/featureQuery2.gif)

## 通过WFS修改要素并保存到数据库

![editFeatures](https://cdn.jsdelivr.net/gh/bigbigbig2/image2/img/editFeatures.gif)

> 为了降低gif文件大小，将浏览器窗口减小和减低了FPS，将就看看≡[。。]≡

## 通过WFS添加要素

![addFeatures](https://cdn.jsdelivr.net/gh/bigbigbig2/image2/img/addFeatures.gif)

由于数据源的原因，无法真正的保存到数据库（偷懒一下，懒得折腾了ψ(._. )>)

## 通过WFS删除要素

![deleteFeatures](https://cdn.jsdelivr.net/gh/bigbigbig2/image2/img/deleteFeatures.gif)

## 雨水分布图

数据：通过axios获取http://typhoon.zjwater.gov.cn/（浙江水利厅）中实时的降雨等值面JSON数据

![rain](https://cdn.jsdelivr.net/gh/bigbigbig2/image2/img/202204152310915.gif)

