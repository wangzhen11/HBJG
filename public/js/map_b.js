/*大地图*/
var map_b = new BMap.Map("contactMap");
var point_b = new BMap.Point(114.484078, 38.020616);
map_b.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
map_b.centerAndZoom(point_b, 18);
var marker_b = new BMap.Marker(point_b);  // 创建标注
map_b.addOverlay(marker_b);               // 将标注添加到地图中
marker_b.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
var local = new BMap.LocalSearch(map_b, {
    renderOptions:{map: map_b}
});
local.search("河北建工集团有限公司");
var stCtrl = new BMap.PanoramaControl(); //构造全景控件
stCtrl.setOffset(new BMap.Size(20, 20));
map_b.addControl(stCtrl);//添加全景控件
map_b.addControl(new BMap.NavigationControl());        // 添加平移缩放控件
map_b.addControl(new BMap.ScaleControl());             // 添加比例尺控件
map_b.addControl(new BMap.OverviewMapControl());