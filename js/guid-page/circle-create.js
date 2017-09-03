$(function(){

	//开启轮播
    var  swpier = new Swiper('.swiper-container',{})

    //选择圈子类型
    selectType();
    //取消返回上一步
    $('.J_prev').click(function(){
    	if(swpier.realIndex == 0){
    		window.history.back(-1);
    	}
    	swpier.slidePrev();
    	setHeader(swpier,$(this));
    })
    //下一步
    $('.J_next').click(function(){
    	if(!verify(swpier)) return;
    	swpier.slideNext();
    	setHeader(swpier,$(this));

    })
    
    //圈子权限相关功能
    permission();
    //上传图片
    uploadImg();
})


//设置头部信息
function setHeader(mySwiper,current){
	//判断如果点击创建的时候跳转
	if(current.text() == "创建"){
		window.location.href = "circle-finish.html";
	}
	if(mySwiper.realIndex == 0){
 		$(".common-header h4").text("选择圈类型");
	}
	if(mySwiper.realIndex == 1){
		$(".common-header h4").text("创建圈子");
		$(".J_next").text("下一步");
	}
	if(mySwiper.realIndex == 2){
		$(".J_next").text("创建");
	}
}

//圈子权限相关功能
function  permission(){
	//权限的选择
	var $allLi = $(".circlePermission li");
	$(".circlePermission").on('click','li',function(){
		var $current = $(this);
		if(!$current.hasClass("active")){
			$allLi.removeClass('active');
			$current.addClass('active');
			if($current.index() == 1){
				$('.circleConceal').show();
			}else{
				$('.circleConceal').hide();
			}
		}
	})
	//设置你的圈子可被搜索到
	$(".circleConceal-check").on('click',function(){
		var $current = $(this);
		if(!$current.hasClass("checked")){
			$current.addClass('checked');
		}else{
			$current.removeClass('checked');
		}
	})
}

//选择圈子类型
function  selectType(){
	var $circleTypeList = $(".circleTypeList");
	$circleTypeList.on('click','li',function(){
		var $current = $(this);
		if(!$current.hasClass("active")){
			$circleTypeList.find("li").removeClass("active");
			$current.addClass("active");
		}
	})
}

//上传图片
function uploadImg(){
	var nd_file = document.querySelector("#J_file");
	var nd_picture  =document.querySelector(".uploadingAvatar-picture"); 
	nd_file.onchange  = function(){
		var cur =  this.files[0];
		var readFile = new FileReader();
		readFile.onload = function(e){
			nd_picture.style.backgroundImage = "url("+e.target.result+")";
		}
		readFile.readAsDataURL(cur); 
	}
}

//当前内容验证
function verify(swpier){
	var status = false;
	if(swpier.realIndex == 0 ){
		$(".circleTypeList li").each(function(index,ele){
			if($(ele).hasClass("active")){
				status = true;
			}
		})
		if(!status){
			$(".J_promptInfo").find("span").text("一定要选择分类哦").end().fadeIn().fadeOut(1500);
		}
	}
	if(swpier.realIndex == 1 ){
		//获取上传图片
		var $picture = $(".uploadingAvatar-picture");
		//获取圈子名称
		var $circleName = $(".J_circleName");
		//获取圈子介绍
		var $circleIntroduce  = $(".J_circleIntroduce");
		if($picture.css("backgroundImage") == "none"){
			$(".J_promptInfo").find("span").text("一定要选择圈子头像哦").end().fadeIn().fadeOut(1500);
		}else if($.trim($circleName.val()) == ""){
			$(".J_promptInfo").find("span").text("一定要填写圈子名称哦").end().fadeIn().fadeOut(1500);
		}else if($.trim($circleIntroduce.val())  == ""){
			$(".J_promptInfo").find("span").text("一定要填写圈子简介哦").end().fadeIn().fadeOut(1500);
		}else{
			status = true;
		}
	}

	status = swpier.realIndex == 2 ? true : status;
	return status;
}