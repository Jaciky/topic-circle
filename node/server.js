var http = require('http');
var fs = require('fs');

for(var i=1;i <= 100;i++){
	var url = "http://res.imtt.qq.com/tagapp/v1/img/qqface/"+i+".png";
	getImg(url,i);

}


function getImg(url,num){
	console.log("正在下载qq表情");
	http.get(url,function(request){
		request.setEncoding("binary");
		var imgUrl = "";

		request.on("data",function(req){
			imgUrl+= req;
		})
		request.on("end",function(){
			fs.writeFileSync('../images/qq/single/bq'+num+".png",imgUrl,"binary")
		})
	})
	console.log("下载qq表情完成");

}
