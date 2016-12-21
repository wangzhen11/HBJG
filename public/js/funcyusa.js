var regTel=/^1[0-9]{10}$/,//验证手机号
    regMail=/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,//验证邮箱
    regCn=/^[\u4E00-\u9FA5]{2,4}$/,//验证中文名字
    regName=/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/,//用户名验证
    regPass=/^[a-zA-Z0-9]{6,10}$/;//密码验证
var one=true,timer=null;
//随机验证码
function rand() {
    var i=0, t='';
    do {
        var tempNum=Math.floor(Math.random()*123);
        if ((48<=tempNum&&tempNum<=57)||(65<=tempNum&&tempNum<=90)||(97<=tempNum&&tempNum<=122)){
            t+= String.fromCharCode(tempNum);
            i++;
        }
    }while (i<4);
    return t;
};
$('#seccode').text(rand());
$('#changeA').click(function () {
   $('#seccode').text(rand());
});
//失去焦点事件
$('input,textarea').blur(function () {
    $(this).css('border','1px solid #6892B1');
    if($(this).is('#mName')){
        if($('#mName').val()!=''){
            if(!(regCn.test($('#mName').val()))){
                $('#nameC').text('请输入2-4个汉字').css('color','red');
                $(this).css('border','1px solid #BD362F');
                return false;
            }else if(regCn){
                $('#nameC').text('√').css('color','#333');
                return true;
            }
        }else {
            $('#nameC').text('*').css('color','red');
        }
    }
    if($(this).is('#mMail')){
        if($('#mMail').val()!=''){
            if(!(regMail.test($('#mMail').val()))){
                $('#mailC').text('请输入正确邮箱').css('color','red');
                $(this).css('border','1px solid #BD362F');
                return false;
            }else if(regMail){
                $('#mailC').text('√').css('color','#333');
                return true;
            }
        }else {
            $('#mailC').text('');
        }
    }
    if($(this).is('#mNum')){
        if($('#mNum').val()!=''){
            if(!(regTel.test($('#mNum').val()))){
                $('#telC').text('请输入正确手机号').css('color','red');
                $(this).css('border','1px solid #BD362F');
                return false;
            }else if(regTel){
                $('#telC').text('√').css('color','#333');
                return true;
            }
        }else {
            $('#telC').text('*').css('color','red');
        }
    }
    if($(this).is('#mCheck')){
        if($('#mCheck').val()!=''){
            if($('#mCheck').val()!=$('#seccode').text().toLowerCase()){
                $('#codeC').text('*').css('color','red');
                $('#mCheck').css('border','1px solid red');
                return false;
            }else if($('#seccode').text().toLowerCase()==$('#mCheck').val()){
                $('#codeC').text('√').css('color','#333');
                return true;
            }
        }else {
            $('#codeC').text('*').css('color','red');
        }
    }
    if($(this).is('#reMail')){
        if($('#reMail').val()!=''){
            if(!(regMail.test($('#reMail').val()))){
                $('#mailLabel').text('×').css('color','red');
                $(this).css('border','1px solid #BD362F');
                return false;
            }else if(regMail){
                $('#mailLabel').text('√').css('color','#fff');
                return true;
            }
        }else {
            $('#mailLabel').text('*').css('color','#fff');
        }
    }
    if($(this).is('#rePass')){
        if($('#rePass').val()!=''){
            if(!(regPass.test($('#rePass').val()))){
                $('#passLabelN').text('×').css('color','red');
                $(this).css('border','1px solid #BD362F');
                return false;
            }else if(regPass){
                $('#passLabelN').text('√').css('color','#fff');
                return true;
            }
        }else {
            $('#passLabelN').text('*').css('color','#fff');
        }
    }
    if($(this).is('#loMail')){
        if($('#loMail').val()!=''){
            if(!(regName.test($('#loMail').val()))){
                $('#mailLabelS').text('×').css('color','red');
                $(this).css('border','1px solid #BD362F');
                return false;
            }else if(regName){
                $('#mailLabelS').text('√').css('color','#fff');
                return true;
            }
        }else {
            $('#mailLabelS').text('*').css('color','#fff');
        }
    }
    if($(this).is('#loPass')){
        if($('#loPass').val()!=''){
            if(!(regPass.test($('#loPass').val()))){
                $('#passLabelS').text('×').css('color','red');
                $(this).css('border','1px solid #BD362F');
                return false;
            }else if(regPass){
                $('#passLabelS').text('√').css('color','#fff');
                return true;
            }
        }else {
            $('#passLabelS').text('*').css('color','#fff');
        }
    }
});
//获得焦点事件
$('input,textarea').focus(function () {
    $(this).css('border','1px solid #0f67ff');
   if($(this).is('#mName')){
       $('#nameC').text('请输入2-4个汉字').css('color','#333');
   }
   if($(this).is('#mMail')){
       $('#mailC').text('请输入常用邮箱').css('color','#333');
   }
   if($(this).is('#mNum')){
       $('#telC').text('输入11位手机号').css('color','#333');
   }
   if($(this).is('#mCheck')){
       if($('#mCheck').val()=='请输入验证码'){
           $('#mCheck').val('').css('color','#333');
       }
   }
   if($(this).is('#mArea')){
       if($('#mArea').val()=='请输入您要留言的内容！'){
           $('#mArea').val('').css('color','#333');
       }
   }
});
//提交验证
$('#mSub').click(function () {
    if(regCn.test($('#mName').val()) && regTel.test($('#mNum').val()) && $('#mArea').val()!=''){
        swal({
                title: "确定提交留言?",
                text: "您的留言将会展示在留言区内，您可以选择删除!",
                cancelButtonText: "取 消",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "提 交",
                closeOnConfirm: false
            },
            function(){
                swal("提交成功!", "您的留言已交由审核!", "success");
                var myDate=new Date(),
                    year=myDate.getFullYear(),
                    month=myDate.getMonth()+1,
                    date=myDate.getDate(),
                    h=myDate.getHours(),
                    m=myDate.getMinutes(),
                    s=myDate.getSeconds();
                var now=year+'/'+month+'/'+date+' '+h+':'+m+':'+s;
                var mList='<div class="messageList clearFloat"><div class="meShowL"><img src="public/images/headerDefeaut.jpg"></div><div class="meShowR"><div class="mShowH clearFloat"><span class="nameShow">'+$('#mName').val()+'</span><span class="dateShow">'+now+'</span></div><div class="mShowB"><p class="conShow">'+$('#mArea').val()+'</p><span class="mDel">删除</span></div></div></div>';
                $('.messShow').append(mList);
            });
        return false;
    }else {
        if($('#mName').val()==''){
            $('#nameC').text('请填写姓名').css('color','red');
        }
        if($('#mNum').val()==''){
            $('#telC').text('请填写手机号').css('color','red');
        }
        if($('#mCheck').val()==''){
            $('#mCheck').val('请输入验证码').css('color','red');
        }
        if($('#mArea').val()==''){
            $('#mArea').val('请输入您要留言的内容！').css('color','red');
        }
        return false;
    }
});
$('#reSub').click(function () {
    if(regMail.test($('#reMail').val()) && regPass.test($('#rePass').val())){
        swal({
            title: "登录成功!",
            text: "几秒钟后自动跳转回之前页，如未跳转，请点击这里!",
            timer: 3000,
            showConfirmButton: false
        });
        return false;
    }else {
        if ($('#reMail').val()==''){
            $('#mailLabel').text('×').css('color','red');
        }
        if($('#rePass').val()==''){
            $('#passLabelN').text('×').css('color','red');
        }
        return false;
    }
});
$('#suSub').click(function () {
    if(regName.test($('#loMail').val()) && regPass.test($('#loPass').val())){
        swal({
            title: "登录成功!",
            text: "几秒钟后自动跳转回之前页，如未跳转，请点击这里!",
            timer: 3000,
            showConfirmButton: false
        });
        return false;
    }else {
        if ($('#loMail').val()==''){
            $('#mailLabelS').text('×').css('color','red');
        }
        if($('#loPass').val()==''){
            $('#passLabelS').text('×').css('color','red');
        }
        return false;
    }
});
//输入框字数提示
$('#mArea').on('keyup blur',function () {
    var area=$(this);
    var max=parseInt(area.attr('maxlength'),10);//转化为10进制
    if (max>0){
        if (area.val().length > max) { //textarea的文本长度大于maxlength
            area.val(area.val().substr(0, max)); //截断textarea的文本重新赋值
        }
        var already=area.val().length,left=max-already;
        $('#readyN').text(already);
        $('#leftN').text(left);
    }
});
//删除留言信息
$('.messShow').on('click','.mDel',function (e) {
    swal({
            title: "确定要删除吗?",
            text: "您的留言将会被彻底删除，无法恢复!",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "是，删除",
            cancelButtonText: "不，留着",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function(isConfirm){
            if (isConfirm) {
                swal("删除成功!", "您的留言已经永远的消失了!", "success");
                $(e.target).parents('.messageList').remove();
            } else {
                swal("取消删除!", "您的留言依然停留在原地!", "error");
            }
        });
});
//登录页面的选项卡
$('.user').click(function () {
    $('.login').hide().eq($(this).index()).show();
    $(this).addClass('uActive').siblings().removeClass('uActive');
});
//自定义倒计时
$('#getSmsCode').click(function () {
    if(one){
        getcode();
    }
    function sendCode(){
        if(onceGetTime > 1){
            onceGetTime--;
            $('#getSmsCode').text(onceGetTime+"s"+"后重新获取");
            timer=setTimeout(arguments.callee,1000);
            $('#getSmsCode').css({
                cursor:'default',
                background:'#ccc'
            })
            one=false;
        }else{
            $('#getSmsCode').html("再次获取密保");
            $('#getSmsCode').css({
                cursor:'pointer',
                background:'rgba(255, 248, 253, 0.86)'
            })
            one=true;
        }
    }
    function getcode(){
        onceGetTime=60;
        sendCode();
    }
});













