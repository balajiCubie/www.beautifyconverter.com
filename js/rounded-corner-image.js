function $_(e){return document.getElementById(e)}function do_round_img(){img&&canvas&&($_("radius")||($_("radius").value="0"),libcanvas.pasteImg(canvas,img),libcanvas.roundCanvas(canvas,$_("radius").value),$_("download_btn").href=libcanvas.downloadablePng(canvas),$("#download_btn").removeClass("hide"),$("#result").removeClass("hide"))}function on_upload_img(){var e=$_("upimage").files[0];return/image\/\w+/.test(e.type)?void readImage(e,function(e){img=e,canvas=libcanvas.createCanvasBasedOnImg(img),0!=$_("prev").childNodes.length&&$_("prev").removeChild($_("prev").childNodes[0]),$_("prev").appendChild(canvas),$_("prev").childNodes[0].style["max-width"]="100%",do_round_img(),$("html, body").animate({scrollTop:$("h1").offset().top-10},600)}):(alert("Check the file is a picture"),!1)}var canvas,img,readImage=function(e,a){var n=new FileReader;n.addEventListener("loadend",function(e){if(e.target.readyState==FileReader.DONE){var n=new Image;n.src=e.target.result,n.onload=function(){a(n)}}},!1),n.readAsDataURL(e)};window.onload=function(){"undefined"==typeof FileReader&&(alert("Sorry you browser don't support FileReader, please update you browser!"),$_("upimage").disabled=!0)},this.libcanvas=this.exports=function(){var e={};return e.createCanvasBasedOnImg=function(a){var n=document.createElement("canvas");return n.width=a.width,n.height=a.height,e.pasteImg(n,a),n},e.pasteImg=function(e,a){e.getContext("2d").globalCompositeOperation="copy",e.getContext("2d").drawImage(a,0,0)},e.downloadablePng=function(e){return e.toDataURL("image/png").replace("image/png","image/octet-stream")},e.downloadAsPng=function(a){window.location.href=e.downloadablePng(a)},e.roundCanvas=function(a,n){n=n,e.cutRoundedRect(a.getContext("2d"),n,0,0,a.width,a.height)},e.cutRoundedRect=function(e,a,n,t,o,i){var d=n,r=t,l=n+o,s=t+i;e.globalCompositeOperation="destination-in",e.fillStyle="black",e.beginPath(),e.moveTo(d+a,r),e.lineTo(l-a,r),e.quadraticCurveTo(l,r,l,r+a),e.lineTo(l,s-a),e.quadraticCurveTo(l,s,l-a,s),e.lineTo(d+a,s),e.quadraticCurveTo(d,s,d,s-a),e.lineTo(d,r+a),e.quadraticCurveTo(d,r,d+a,r),e.fill()},e}();