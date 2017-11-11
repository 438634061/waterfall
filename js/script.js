window.onload=function(){
	waterfall('main','box');
	var dataInt={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"}]};
	window.onscroll=function(){
		if(checkScrollSlide){
			var oParent=document.getElementById('main');
			//将数据块渲染到页面的尾部
			for(var i=0;i<dataInt.data.length;i++){
				var oBox=document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg=document.createElement('img');
				oImg.src="img/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
	}
}
function waterfall(parent,box){
	var oParent = document.getElementById(parent);  //取出父元素main
	var oBoxs = getByClass(oParent,box);
	
//计算整个页面显示的列数
    var oBoxW =oBoxs[1].offsetWidth;
    var cols=Math.floor(document.body.clientWidth/oBoxW);   //floor对数向下取余，页面大小除以一个图片大小,取当前列数
    oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';  //当前页面宽度
    var hArr=[];  //存放高的数组
    for(var i=0;i<oBoxs.length;i++){   //oBoxs.length数组长度
    	if(i<cols){
    		hArr.push(oBoxs[i].offsetHeight);  //遍历高度并且压到数组hArr中
    	}else{
    		var minH=Math.min.apply(this,hArr);  //存hArr中最小的值组成的数组
    		var index=getMinhIndex(hArr,minH);   //将minH中的数组和hArr对比然后取出minH所对应的索引
    		oBoxs[i].style.position='absolute';
    		oBoxs[i].style.top=minH+'px';
    		oBoxs[i].style.left=oBoxW*index+'px';
    		hArr[index]+=oBoxs[i].offsetHeight;
    	}
    }
 
}
//根据class获取元素
function getByClass(parent,clsName){
	var boxArr = new Array();  //存储获取到的所有的class的数组
	oElements = parent.getElementsByTagName('*');
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className==clsName){
			boxArr.push(oElements[i]);
		}
	}                          
	return boxArr;
}
function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}
//检测是否具备加载数据块的条件
function checkScrollSlide(){
	var oParent=document.getElementById('main');
	var oBoxs=getByClass(oParent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
    var height=document.body.clientHeight || document.documentElement.clientHeight;
    return(lastBoxH<scrollTop+height)?true:false;
}
