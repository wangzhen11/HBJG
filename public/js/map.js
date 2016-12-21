var map = new BMap.Map("connect-map");
var point = new BMap.Point(114.484078, 38.020616);
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
map.centerAndZoom(point, 18);
var marker = new BMap.Marker(point);  // 创建标注
map.addOverlay(marker);               // 将标注添加到地图中
marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
var local = new BMap.LocalSearch(map, {
    renderOptions:{map: map}
});
/*小地图*/
