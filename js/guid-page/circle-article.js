$(function(){

	//返回上一页
	retrunCancel();
	//删除上传图片
	deletePicture();
	//弹层取消按钮功能
	cancel();
	//打开预览
	preview();
	//返回编辑
	returnEdit();
	//切换模版
	cutTemplate();
})


//上传图片方法
function uploadPicture(cur){
	//获取file下面的对象集合
	var oFiles = cur.files[0];
	//生成图片地址
	var imgURL = window.URL.createObjectURL(oFiles);
	//获取当前父级别
	var  nd_addPicture =  cur.parentNode.parentNode;
	var  nd_clone = nd_addPicture.cloneNode(true);
	//显示上传图片区域
	nd_clone.querySelector(".addPicture-show").style.display = "block";
	//绑定上传图片路径
	nd_clone.querySelector('.J_picture').setAttribute('src',imgURL);
	//动态再添加一个上传图片节点
	document.querySelector(".J_uploadMain").insertBefore(nd_clone,nd_addPicture);
}

//弹出删除图片弹层
function showLayer(cur){
	//拿到当前祖父元素
	var nd_parents = cur.parentNode.parentNode;
	//显示大弹层
	$(".layer").show();
	//隐藏所有弹层
	$(".layer-common-style").hide();
	
	//拿到当前下标
	var nd_addPictureItem =  document.querySelectorAll(".circleArticle-addPicture");
	//拿到当前元素的下标
	var _index = Array.prototype.slice.call(nd_addPictureItem).indexOf(nd_parents);
	//显示对应弹层
	$(".layer-picture").show().attr("data-index",_index);	
}

//删除上传图片
function deletePicture(){
	$(".layer-picture").on('click',".J_deletePicture",function(){
		$(".layer").hide();
		$(".circleArticle-addPicture").eq($(".layer-picture").data("index")).remove();
	})
}

//弹层取消功能
function cancel(){
	$(".J_cancelLayer").on('click',function(){
		$(".layer").hide();
	})
}

//返回上一页取消功能
function retrunCancel(){
	$(".J_cancel").on('click',function(){
		$(".layer").show();
		$(".layer-common-style").hide();
		$(".layer-cancle").show();
	})
}

//打开预览页面
function preview(){
	$(".J_preview").on("click",function(){
		//获取文章标题
		var $title = $.trim($('.circleArticle-title').val());
		//获取文章内容
		var $content = $.trim($(".circleArticle-content").val());
		if($title){
			if($content){
				$(".addPicture-show").each(function(index,ele){
					if($(ele).css('display') == "block"){
						$(".J_contentPage").hide();
						$(".J_previewPage").show();

						//绑定标题
						$(".circleArticlePreview-themeCotent h3").text($title);
						//绑定内容
						$(".themeCotent-detail").text($content);
						//绑定日期
						var sData = new Date().toLocaleDateString();
						sData = sData.split('/');
						$(".theme-gray").text(sData[0]+"年"+sData[1]+"月"+sData[2]+"日");
						//获取图片存放元素
						var $pictureItem = $(".themeCotent-pictureItem");
						var pictureHtml = "";
						//绑定上传图片
						$(".addPicture-show").each(function(index,ele){
							if($(ele).css('display') == "block"){
								console.log("走进来几次");
								pictureHtml += '<img src='+$(ele).find('img').attr('src')+' class="dpImg" />'
											+ '<p>'+$(ele).find("textarea").val()+'</p>';
							}
						})
						$pictureItem.html(pictureHtml);
						return false;
					}else{
						promptInfo("至少选择一张图片");
						return false;
					}
				})
			}else{
				promptInfo("内容不能为空");
			}
		}else{
			promptInfo("标题不能为空");
		}
	})
}
//返回编辑
function returnEdit(){
	$(".J_returnEdit").on("click",function(){
		$(".J_contentPage").show();
		$(".J_previewPage").hide();
	})
}

//切换模版
function cutTemplate(){
	var $template  = $(".J_template");
	//模版内容区域
	var $themeCotent  = $(".circleArticlePreview-themeCotent");
	$template.on('click','li',function(){
		var _current = $(this);
		if(!_current.hasClass('active')){
			$template.find('li').removeClass('active');
			_current.addClass('active');
			if(_current.index() == 1){
				$themeCotent.addClass('themeSpring');
			}else{
				$themeCotent.removeClass('themeSpring');
			}
		}
	})
}

//提示信息功能
function promptInfo(value){
	$(".J_promptInfo").find("span").text(value);
	$(".J_promptInfo").fadeIn().fadeOut(1500);

}