<script src="/js/lib/jquery-2.0.0.min.js"></script>
<script src="./thumbtri.js"></script>
<div>
	<div align="center" style="padding-top:30px;">
		<div class="mainbox">
			<div class="pictBox"></div>
		</div>
		<div style="position:relative; width:960px; height:800px; margin: 0 auto;">
			<canvas style="position:absolute; left:0; top:0;" id="trimBox" width="960" height="800"></canvas>
			<canvas style="position:absolute; left:0; top:0;" id="rectLayer" width="960" height="800"></canvas>
		</div>
		<div id="thumbScraps" style="background: hsla(180, 80%, 40%, 0.6); overflow-x:scroll; overflow-y:hidden; position:fixed; bottom:0; left:0; width:100%; height:120px; "><p style="white-space: nowrap;"></p></div>
	</div>
</div>