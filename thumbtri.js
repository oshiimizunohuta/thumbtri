/**
 * thumbtri.js
 * Since 2014-07-22 16:18:22
 * @author しふたろう
 * ver 0.01
 */
var recter = {}, trimer = {};
var canvasWidth = 980, canvasHeight = 800;
var thumbBoxWidth = 100, thumbBoxHeight = 100;
//TODO 選択範囲の移動
$(function()
{
	var jqLayer = $('#rectLayer')
		, img = new Image();
		;
	trimer.canvas = $('#trimBox').get(0);
	trimer.context = trimer.canvas.getContext('2d');

	recter.canvas = $('#rectLayer').get(0);
	recter.context = recter.canvas.getContext('2d');
	recter.context.clearRect(0, 0, recter.canvas.width, recter.canvas.height);
	recter.mouseDown = false;
	recter.startX = -1;
	recter.startY = -1;
	recter.endX = -1;
	recter.endY = -1;
	recter.ext = false;
	
	$('canvas').attr('width', canvasWidth).attr('height', canvasHeight);
	$('#thumbScraps').find('p').eq(0).css('height', thumbBoxHeight);
	
	bgFill(canvasWidth, canvasHeight);
	
	$(window).keydown(function(e)
	{
		recter.ext = event.shiftKey;
		if(recter.ext){return false}
		return true;
	});
	$(window).keyup(function(e)
	{
		recter.ext = event.shiftKey;
		if(recter.ext){return false}
		return true;
	});
	$('#rectLayer').mousedown(function(e)
	{
		var img, pos = mousePosition(e, $(this))
			, w = recter.endX - recter.startX, h = recter.endY - recter.startY
			, panta, url
			;
		recter.mouseDown = true;
			
		if(pos.x < recter.endX && pos.x > recter.startX && pos.y < recter.endY && pos.y > recter.startY){
			img = trimer.context.getImageData(recter.startX, recter.startY, w, h);
			if(thumbBoxWidth > w || thumbBoxHeight > h){
				recter.canvas.setAttribute('width', thumbBoxWidth + 'px'); recter.canvas.setAttribute('height', thumbBoxHeight + 'px');
				recter.context.putImageData(img, 0,0);
				recter.context.drawImage(recter.canvas, 0, 0, w, h, 0, 0, thumbBoxWidth, thumbBoxHeight);
	//			img = recter.context.getImageData(0, 0, thumbBoxWidth, thumbBoxHeight);
			}else{
				recter.canvas.setAttribute('width', w + 'px'); recter.canvas.setAttribute('height', h + 'px');
				recter.context.putImageData(img, 0,0);
				recter.context.drawImage(recter.canvas, 0, 0, thumbBoxWidth, thumbBoxHeight);
				img = recter.context.getImageData(0, 0, thumbBoxWidth, thumbBoxHeight);
				recter.canvas.setAttribute('width', thumbBoxWidth + 'px'); recter.canvas.setAttribute('height', thumbBoxHeight + 'px');
				recter.context.putImageData(img, 0,0);
			}

			panta = $('#thumbScraps').find('p').eq(0);
			url = recter.ext ? recter.canvas.toDataURL('image/jpeg') : recter.canvas.toDataURL();
			panta.append('<a href="' + url + '" target="_blank"><img src="' + url + '" height="' + thumbBoxHeight + '" /></a>');
			
			recter.canvas.setAttribute('width', canvasWidth + 'px'); recter.canvas.setAttribute('height', canvasHeight + 'px');
		}
		recter.startX = pos.x;
		recter.startY = pos.y;
		
	});
	jqLayer.mouseup(function(e)
	{
		recter.mouseDown = false;
		var w = Math.abs(recter.endX - recter.startX), h = Math.abs(recter.endY - recter.startY)
		
	});
	jqLayer.mousemove(function(e)
	{
		var mdown = recter.mouseDown
			, pos = mousePosition(e, $(this))
			, ctx = recter.context
			, cvs = recter.canvas
			, w = Math.abs(recter.startX - pos.x), h = Math.abs(recter.startY - pos.y)
			, set = w > h ? w : h
			, lineColor_1 = 'rgb(255, 224, 224)', lineColor_2 = 'rgb(64, 32, 32)'
			;
		if(!mdown){return;}
		recter.endX = pos.x < recter.startX ? recter.startX - set : recter.startX + set;
		recter.endY = pos.y < recter.startY ? recter.startY - set : recter.startY + set;
		ctx.strokeStyle = ((pos.x * pos.y) | 0) % 2 == 1 ? lineColor_2 : lineColor_1;
		ctx.clearRect(0, 0, cvs.width, cvs.height);
		ctx.strokeRect(recter.startX, recter.startY, recter.endX - recter.startX, recter.endY - recter.startY);
		
	});
	
	
	function dragoverFile(e)
	{
		e.preventDefault();
	}
	function dropFile(e)
	{
		var i, data = e.dataTransfer
			, reader = new FileReader()
			, arrowTypes = ['image/png', 'image/jpeg', 'image/gif'];
		e.preventDefault();
		for(i = 0; i < data.files.length; i++){
			if(arrowTypes.indexOf(data.files[i].type) == -1){
				return;
			}
			reader.readAsDataURL(data.files[i]);
		}
		reader.onload = function(e){
			var img = new Image();
			img.src = e.target.result;
			img.onload = function(){
				loadCanvas(img);
			}
		};
	}

	recter.canvas.ondrop = dropFile;
	recter.canvas.ondragover= dragoverFile;
});

function loadCanvas(img)
{
	var  cWidth = trimer.canvas.width, iWidth = img.width
		, cHeight = trimer.canvas.height, iHeight = img.height
		, widthRate = cWidth / iWidth
		, heightRate = cHeight / iHeight
		, drawWidth = cWidth 
		, drawHeight = (iHeight * widthRate) | 0
		, drawX = 0, drawY = 0
	;
	bgFill(cWidth, cHeight);

	if(drawHeight > cHeight){
		drawHeight = cHeight;
		drawWidth = (iWidth * heightRate) | 0
	}	
	drawX = ((cWidth - drawWidth) / 2) | 0;
	drawY = ((cHeight - drawHeight) / 2) | 0;
	
	trimer.context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
	// trimer.context.putImageData(img, 0, 0);
}

function bgFill(w, h)
{
	var 
	i, j, bg1 = 'rgb(96, 96, 96)', bg2 = 'rgb(128, 128, 128)', text = 'rgb(224, 224, 248)'

	for(j = 0; j < h; j += 20){
		for(i = 0; i < w; i += 20){
			trimer.context.fillStyle = ((j + i)  / 20) % 2 == 0 ? bg1 : bg2;
			trimer.context.fillRect(i, j, 20 , 20);
		}
	}
	trimer.context.textBaseline = 'middle';
	trimer.context.textAlign = 'center';
	trimer.context.fillStyle = text;
	trimer.context.font = ' 400 48px Unknown Font, sans-serif';
	trimer.context.fillText('ここに画像をドロップ！', canvasWidth / 2, canvasHeight / 2, 960, 40);
}
function mousePosition(event, obj)
{
	var mdown = recter.mouseDown
		 canvasPos = obj.get(0).getBoundingClientRect();
		 
	return{
		x:event.clientX - canvasPos.left,
		y:event.clientY - canvasPos.top
	};
}