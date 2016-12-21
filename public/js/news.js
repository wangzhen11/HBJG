//新闻小滚动
(function (obj) {
    var scrollTimer = null;
    obj.hover(function() {
        clearInterval(scrollTimer);
    }, function() {
        scrollTimer=setInterval(function() {
            scrollNews();
        },2000);
    }).trigger("mouseleave");
    function scrollNews() {
        var self = obj.find("ul");
        var lineHeight = self.find("li:first").height();
        self.animate({
            "marginTop": -lineHeight + "px"
        }, 600, function() {
            self.css({
                marginTop: 0
            }).find("li:first").appendTo(self);
        })
    }
})($(".newWrap"));
//新闻超过一定字数以省略号显示
function cut(text) {
    text.each(function(){
        var maxwidth=55;
        if($(this).text().length>maxwidth){
            $(this).text($(this).text().substring(0,maxwidth));
            $(this).html($(this).html()+'... ...');
        }
    });
}
cut($('.newsOver'));
//新闻选项卡
(function (btn,content) {
    content.first().show();
    btn.mouseover(function () {
        $(this).addClass('newsActive').siblings().removeClass('newsActive');
        content.hide().eq($(this).index()).show();
    });
})($('#newsBtn li'),$('.numList'));
//新闻页的ajax加载更多
(function () {
    var counter=0,pageStart=0,pageSize=2;
    /*加载更多的点击事件*/
    $(document).on('click','#loadMore',function () {
        pageStart=counter*pageSize;
        counter ++;
        getData(pageStart,pageSize);
    });
    function getData(offset,size) {
        $.ajax({
            type:'GET',
            url:'public/json/news.json',
            dataType:'json',
            success:function (reponse) {
                var data = reponse.news;
                var sum = data.length,result='';
                if(sum - offset < size ){
                    size = sum - offset;
                }
                for(var i=offset; i< (offset+size); i++){
                    result+='<div class="otherList clearFloat"><div class="otherImg"><img src="'+data[i].img+'"></div><div class="otherText clearFloat"><h4>'+data[i].title+'</h4><div class="share"><span class="showDate">'+data[i].date+'</span><ul class="shareMeth"><li><a href="javascript:;"></a></li><li><a href="javascript:;"></a></li><li><a href="javascript:;"></a></li></ul></div><p class="newsOver">'+data[i].content+'</p></div></div>';
                }
                /*插入节点*/
                $('.otherLeft').append(result);
                /*按钮的隐藏*/
                if ( (offset + size) >= sum){
                    $("#loadMore").hide();
                }else{
                    $("#loadMore").show();
                }
                /*限制显示字数*/
                cut($('.newsOver'));
            },
            error:function () {
                alert('检查是否在服务器环境下或数据已损坏！');
            }
        });
    }
})();
