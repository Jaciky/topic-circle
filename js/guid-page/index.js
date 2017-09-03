$(function(){

	//导航切换
	var nd_nav = $(".J_nav");
	nd_nav.on("click","li",function(){
		navTab($(this));
	})


})


/**
 * navTab 导航切换方法 
 * cur  当前dom
 */
function navTab(cur){

	if(!cur.hasClass("active")){
		cur.parents().find("li").removeClass("active");
		cur.addClass("active");
		$("section.mt98").hide();
		$("section.mt98").eq(cur.index()).show();
	}

}










