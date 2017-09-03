
/**
 * qq表情功能封装
 * @type {Object}
 */
var oEmoji  = {
	emojiItem:["[/微笑]", "[/撇嘴]", "[/色]", "[/发呆]", "[/得意]", "[/流泪]", "[/害羞]", "[/闭嘴]", "[/睡]", "[/大哭]", "[/尴尬]", "[/发怒]", "[/调皮]", "[/呲牙]", "[/惊讶]", "[/难过]", "[/酷]", "[/冷汗]", "[/抓狂]", "[/吐]", "[/偷笑]", "[/可爱]", "[/白眼]", "[/傲慢]", "[/饥饿]", "[/困]", "[/惊恐]", "[/流汗]", "[/憨笑]", "[/大兵]", "[/奋斗]", "[/咒骂]", "[/疑问]", "[/嘘]", "[/晕]", "[/折磨]", "[/衰]", "[/骷髅]", "[/敲打]", "[/再见]", "[/擦汗]", "[/抠鼻]", "[/鼓掌]", "[/糗大了]", "[/坏笑]", "[/左哼哼]", "[/右哼哼]", "[/哈欠]", "[/鄙视]", "[/委屈]", "[/快哭了]", "[/阴险]", "[/亲亲]", "[/吓]", "[/可怜]", "[/菜刀]", "[/西瓜]", "[/啤酒]", "[/篮球]", "[/乒乓]", "[/咖啡]", "[/饭]", "[/猪头]", "[/玫瑰]", "[/凋谢]", "[/示爱]", "[/爱心]", "[/心碎]", "[/蛋糕]", "[/闪电]", "[/炸弹]", "[/刀]", "[/足球]", "[/瓢虫]", "[/便便]", "[/月亮]", "[/太阳]", "[/礼物]", "[/拥抱]", "[/强]", "[/弱]", "[/握手]", "[/胜利]", "[/抱拳]", "[/勾引]", "[/拳头]", "[/差劲]", "[/爱你]", "[/NO]", "[/OK]", "[/爱情]", "[/飞吻]", "[/跳跳]", "[/发抖]", "[/怄火]", "[/转圈]", "[/磕头]", "[/回头]", "[/跳绳]", "[/挥手]"],
	//初始化对象
	init:function(data){
		this.renderEmoji(data);
	},
	//渲染表情数据
	renderEmoji:function(data){
		var emojiHTML = '<ul class="swiper-slide">';
	    this.emojiItem.forEach(function(value,index){
	    	if( ((index+1)%20) === 0 && index > 0){
	    		emojiHTML += "<li data-val="+value+"></li>"
	    		emojiHTML += "<li class=\"J_deleteEmoji\"></li>"
	    		if( (index+1) != oEmoji.emojiItem.length){
	    			emojiHTML +="</ul>"
	    			emojiHTML +='<ul class="swiper-slide">';
	    		}
	    	}else{
	    		emojiHTML += "<li data-val="+value+"></li>"
	    	}
	    })
	    emojiHTML += "</ul>"; 
	    data.bindEmoji.innerHTML =  emojiHTML;
	    this.emojiEvent(data);
	},
	//表情绑定选中事件
	emojiEvent:function(data){
		data.bindEmoji.onclick = function(ev){
			var ev = ev || window.event;
			var _target =  ev.target || ev.srcElement;
			if(_target.className.indexOf("J_deleteEmoji") != -1){
				data.addEmoji.value = oEmoji.deleteEmoji(data.addEmoji.value);
			}else{
				data.addEmoji.value = (data.addEmoji.value + _target.getAttribute("data-val")); 
			}
		}
	},
	//删除表情
	deleteEmoji:function(val){
		var lastStr = val.charAt(val.length-1);
		if(lastStr == "]"){
			//如果存在表情先默认删除最后一个元素
			val = val.substring(0,val.length-1);
			//拿到最后的字符
			lastStr = val.charAt(val.length-1);
			while(lastStr != "["){
				val = val.substring(0,val.length-1);
				lastStr = val.charAt(val.length-1);
				if(lastStr == ""){
					break;
				}
			};
		}
		val = val.substring(0,val.length-1);
		return val;
	}
}


/**
 * 上传图片功能
 */

var uploadPicture = {
	//加载图片
	loadingImg :"../images/icon/loading.png",
	//初始化
	init:function(gather){
		gather.nodeFile.onchange = function(){
			uploadPicture.getPictureUrl(this,gather.nodeInsert);
		}
	},
	//获取图片
	getPictureUrl:function(cur,nodeInsert){
		//插入动态加载图
		var nd_div = document.createElement("div");
		nd_div.className = "showPicture loading";
		nodeInsert.insertBefore(nd_div,nodeInsert.children[nodeInsert.children.length-1]);

		var cur =  cur.files[0];
		var readFile = new FileReader();
		readFile.onload = function(e){
			setTimeout(function(){
				var nd_showPicture = nodeInsert.querySelectorAll(".showPicture");
				var nd_end = nd_showPicture[(nd_showPicture.length)-1];
				nd_end.style.backgroundImage = "url("+e.target.result+")";
			  	nd_end.className = "showPicture";
			},2000)
			
		}
		readFile.readAsDataURL(cur); 
	}

}