setSlip($('#navSlip'),$('.navList li'),10,$('.navBig .active'));
setSlip($('#navSlip_1'),$('.navRight ul li'),16,$('.navLittle .active'));
foc($('#indexSh'));
shade($('.childOne'),36);
shade($('.btnClick'),25);
abr($('#abrWrap ul li'),$('#abrText ul li'),$('.abrPre'),$('.abrNext'));
abr($('#abrWrapB ul li'),$('#abrTextB ul li'),$('.abrPreB'),$('.abrNextB'));
//banner图上的字儿
(function (text) {
    text.css({opacity:1, transform:'translate(0)'});
})($('.animateText'));
//导航滑块
function setSlip(slip,nav,padding,index) {
    var a=index.parent().index(),w=nav.eq(a).width(),b=2*a+1;
    slip.width(nav.children().width());
    slip.css('left',parseInt(nav.eq(a).position().left)+padding*b+'px');
    nav.hover(function () {
        if(slip.css('display')=='none'){
            slip.show();
            nav.children().removeClass('active');
        }
        if(navigator.userAgent.indexOf("MSIE")!=-1){
            //IE浏览器下体验animate
            slip.stop().animate({
                left:parseInt($(this).position().left)+padding+'px'
            },300)
        }else {
            //非IE下体验css3
            slip.stop().css('left',parseInt($(this).position().left)+padding+'px')
        }
    },function () {
        if(navigator.userAgent.indexOf("MSIE")!=-1){
            slip.animate({
                left:a*w+b*padding+'px'
            },300);
        }else {
            slip.css('left',a*w+b*padding+'px');
        }
    })
}
//输入框焦点事件
function foc(input) {
    var value=input.val();
    input.focus(function () {
        if($(this).val()==value){
            $(this).val('');
        }
    });
    input.blur(function () {
        if($(this).val()==""){
            $(this).val(value)
        }
    });
}
//跟随鼠标方向的滑块
function shade(parent,hc) {
    parent.on('mouseenter mouseleave',function (e) {
        var w=$(this).width(),
            h=$(this).height(),
            x=(e.pageX-this.offsetLeft-(w/2))*(w>h?(h/w):1),
            y=(e.pageY-this.offsetTop-(h/2))*(h>w?(w/h):1);
        var dirNum=Math.round((((Math.atan2(y,x)*(180/Math.PI))+180)/90)+3)%4;//根据鼠标的x，y随机出现0,1,2,3（来判断方向）
        console.log(x);
        var eventType=e.type;
        var aPos=[{left:0,bottom:2*hc+'px'},{left:w,bottom:0},{left:0,bottom:-2*hc+'px'},{left:-w,bottom:0}];//不同方向的动作放在一个数组里，用随机出来的的下标来取值
        if(eventType == 'mouseenter'){
            $(this).find('em').css(aPos[dirNum]).stop(true,true).animate({left:0,bottom:0},500);
        }else{
            $(this).find('em').stop(true,true).animate(aPos[dirNum],500);
        }
    });
}
//首页轮播
(function (parent,next,pre,btn,bate) {
    var timer=null,
        pIn=0,
        t=3000;
    var cloneS=parent.children().first().clone();//克隆了第一个li
    parent.append(cloneS);//放在了ul的最后
    var picW=parent.children().width(),
        size=parent.children().size();
    parent.width(picW*(size+1));
    btn.first().css('background','#076CE0');
    ht(parent.children());
    ht(pre);
    ht(next);
    ht(btn);
    timer=setInterval(function () {
        pIn++;
        move();
    },t);//轮播动起来
    function ht(area) {
        area.hover(function () {
            clearInterval(timer);
        },function () {
            timer=setInterval(function () {
                pIn++;
                move();
            },t);
        });
    }//悬停动画
    btn.hover(function () {
        var index=$(this).index();
        pIn=index;               //将当前index给全局的索引，否则鼠标离开后会恢复到先前的索引
        parent.stop().animate({ left: -index * picW}, 1200);
        bate.css('right','-50%').eq(pIn-1).css('right','10%');
        $(this).css('background','#307994').siblings().css('background','#ddd');
    });//按钮动作
    pre.click(function () {
        pIn--;
        move();
    });//向左
    next.click(function () {
        pIn++;
        move();
    });//向右
    function move() {
        if(pIn==size){
            parent.css('left',0);
            pIn=1;
        }
        if(pIn==-1){
            parent.css('left',-(size-1)*picW);
            pIn=size-2;
        }
        bate.css('right','-50%').eq(pIn-1).css('right','10%');
        parent.stop().animate({left:-pIn*picW},1200);
        if(pIn==size-1){
            btn.eq(0).css('background','#076CE0').siblings().css('background','#ddd');
        }else {
            btn.eq(pIn).css('background','#076CE0').siblings().css('background','#ddd');
        }
    }
})($('#wrapFocus'),$('#wrapNext'),$('#wrapPre'),$('ul#wrapBtn li'),$('.bannerText'));
//回到顶部
(function (btn) {
    $(window).scroll(function(){
        if ($(window).scrollTop()>400){
            btn.fadeIn(800);
        } else {
            btn.fadeOut(1000);
        }
    });//按钮消失和出现
    btn.click(function(){
        $('body,html').animate({scrollTop:0},1000);
        return false;
    });
})($('#goTop'));
//工程案例展示图的跳转效果
(function (show,showName,text) {
    var timer=null,i=1,t=3200;
    run(0,800);
    timer=setInterval(jump,t);
    show.hover(function () {
        clearInterval(timer);
        run($(this).index(showName),400);
    },function () {
        i=$(this).index(showName)+1;
        timer=setInterval(jump,t);
    });
    //定时执行
    function jump() {
        run(i,1200);
        i>=show.length-1?i=0:i++;
    }
    //切换效果
    function run(index,speed) {
        show.find('span').css('opacity',0).eq(index).css('opacity',1);
        show.find('a').css('background-color','rgba(7,108,224,.25)').eq(index).css('background-color','rgba(0,0,0,.18)');
        text.stop().fadeOut(0).eq(index).fadeIn(speed);
    }
})($('.showContent .showC_1'),'.showContent .showC_1',$('.caseText'));
//折叠导航展示
(function flod(fNav) {
    fNav.first().find('h4').addClass('color');
    fNav.first().find('ul').show();
    fNav.find('h4').click(function(){
        $(this).toggleClass('color').parent().siblings().find('h4').removeClass('color');
        $(this).next().slideToggle(400).parent().siblings().find("ul").slideUp(400);
    })
})($('.showListNav'));
//产品展示的选项卡
(function(btn,box) {
    box.first().fadeIn(1200);
    btn.first().css('box-shadow','0 5px 20px #8A92FF');
    btn.click(function () {
        var index=$(this).index();
        box.stop().fadeOut(400).eq(index).stop().fadeIn(600);
        btn.css('box-shadow','0 0 0 #fff').eq(index).css('box-shadow','0 5px 20px #8A92FF');
    });
})($('.btnClick'),$('.prodShow'));
//弹出层
(function(show,bg,jump,close) {
    show.click(function () {
        bg.fadeIn().css({
            height:$(window).height(),
            top:$(window).scrollTop()
        });
        jump.eq($(this).index('.showOne')).slideDown();
        $('body').css('overflow','hidden');
    });
    close.click(function () {
        jump.slideUp();
        bg.fadeOut(600);
        $('body').css('overflow','auto');
    });
})($('.showOne'),$('.popover'),$('.jumpOne'),$('.proclose'));
/*海外事业选项轮播*/
//选项卡部分
(function (tab,btn) {
    tab.first().show();
    btn.click(function () {
        $(this).addClass('abrActive').siblings().removeClass('abrActive');
        tab.hide().eq($(this).index()).show();
    });
})($('.abrSPic'),$('ul#abrList li'));
//轮播部分
function abr(list,text,pre,next) {
    var arrW=[],arrT=[];
    for(var i=0;i<list.length;i++){
        arrW[i]=list[i].className;
        arrT[i]=text[i].className;
    }
    pre.click(function () {
        arrW.unshift(arrW.pop());
        arrT.unshift(arrT.pop());
        tab();
    });
    next.click(function () {
        arrW.push(arrW.shift());
        arrT.push(arrT.shift());
        tab();
    });
    function tab() {
        for(var i=0;i<list.length;i++){
            list[i].className=arrW[i];
            text[i].className=arrT[i];
        }
    }
}
//关于我们文字折叠效果
(function (content,bg,moreBtn,moreImg) {
    var slideHeight = 200,defHeight = content.height();
    content.css('height' , slideHeight + 'px');
    moreBtn.click(function(){
        var curHeight = content.height();
        if(curHeight == slideHeight){
            content.animate({
                height: defHeight
            }, "normal");
            moreBtn.html('点击隐藏');
            moreImg.css('transform','rotate(180deg)');
            bg.fadeOut();
        }else{
            content.animate({
                height: slideHeight
            }, "normal");
            moreBtn.html('查看更多');
            moreImg.css('transform','rotate(0)');
            bg.fadeIn();
        }
        return false;
    });
})($('.aboIntr'),$('.gradient'),$('#readMore a'),$('#readMore img'));
//领导团队图片折叠
(function () {
    $('.teamImg span').eq(1).hide();
    $('.teamText').first().show();
    $('.teamImg').mouseenter(function () {
        var index=$(this).index();
        if($(this).width()==1200*0.4*0.2){
            $(this).stop().animate({
                'width':'80%',
                'opacity':1
            },400).siblings().stop().animate({
                'width':'20%',
                'opacity':'.7'
            },400);
            $('.teamImg span').fadeOut(400).eq(index).fadeIn(500);
            $('.teamText').hide().eq(index).show();
        }
    });
})();
//全局css3滚轮加载动画
(function (obj){
    var arr=[];//当obj为类数组时
    for(var i=0;i<obj.length;i++){
        arr[i]=obj.eq(i).offset().top;
        obj.eq(i).attr("data-height",arr[i]);
    }
    $(window).on("scroll",function () {//滚动条监听事件
        for(var i=0;i<obj.length;i++){
            if(obj.eq(i).attr("data-height")<$(document).scrollTop()+window.innerHeight-130){
                obj.eq(i).addClass('animated');//添加class
            }
        }
    });
})($('.animationS'));
