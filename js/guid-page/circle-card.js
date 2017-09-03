$(function(){

	//根据内容判断是否可以发布内容
	contentJudge();
	//qq表情功能
	oEmoji.init({
		//绑定表情的对象
		bindEmoji:document.querySelector(".swiper-wrapper"),
		//添加表情对象
		addEmoji:document.querySelector('#J_txt')
	});

	//取消退出
	quit();
	//打开话题页
	$(".J_topic").on('click',function(){
		$(".addTopic").show();
	})

	//选择话题
	selectTopic();
	//取消选择话题
	$(".J_cancelTopic").on("click",function(){
		$(".addTopic").hide();
	})
	emojiShow();
})


//根据输入内容判断是否可以发表帖子
function contentJudge(){
	$(".input-editor").keydown(function(){
		var $current = $(this);
		setTimeout(function(){
			if($current.val().length > 2){
				$(".header-right").addClass("theme-green");
			}else {
				$(".header-right").removeClass("theme-green");
			}
		})
		
	})
}


//隐藏显示表情
function emojiShow(){
	$(".J_emoji").on('click',function(){
		var $current = $(this);
		if(!$current.hasClass('active')){
			$current.addClass("active");
			$(".swiper-container").show();
		}else{
			$current.removeClass("active");
			$(".swiper-container").hide();
		}
		//开启轮播
		var mySwiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination', 		 //分页器，指示slide的数量和当前活动的slide
	        paginationHide :true,  					 //默认分页器会一直显示。这个选项设置为true时点击Swiper会隐藏/显示分页器。
	        paginationClickable: true,  			 //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
		})
	})

}

//退出功能
function quit(){
	$(".J_cancel").on('click',function(){
		if($(".layer").css('display') == "block"){
			$(".layer").hide();
		}else{
			$(".layer").show();
		}
		
	})
}

//选择话题
function selectTopic(){
	$(".J_addTopicList").on("click",'li',function(){
		var $editor = $(".input-editor");
		var $current = $(this);
		$(".addTopic").hide();
		$editor.val( $editor.val().trim() + "#"+$current.text().trim()+"#");
	})
}