function getRandomPoins(iTotal, iNeed){
	var arr = [];
	var newArr = [];
	for(var i=0;i<iTotal;i++){
		arr.push(i);
	}
	for(var i=0;i<iNeed; i++){
		newArr.push( arr.splice( parseInt(Math.random()*arr.length) , 1) );
	}
	return newArr;
}


self.onmessage = function(ev){
	var points = getRandomPoins(ev.data.iTotal, ev.data.iNeed);
	self.postMessage(points);
}