var mousePressed = false;
var lastX, lastY;
var ctx;
var stroke_color='#000000';
var stroke_width=10;
function InitThis()
{
  ctx = document.getElementById('draw').getContext("2d");
  result=document.getElementById('result');
  $('#draw').mousedown(function (e) {
      mousePressed = true;
      Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
  });
  $('#draw').mousemove(function (e) {
      if (mousePressed) {
          Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
      }
  });
  $('#draw').mouseup(function (e) {
      mousePressed = false;
  });
   $('#draw').mouseleave(function (e) {
      mousePressed = false;
  });
  $('#clear').click(function(){
    clear();
  });
  $('#predict').click(function(){
    predict();
  });
}
function Draw(x, y, isDown)
{
  if (isDown)
  {
      ctx.beginPath();
      ctx.strokeStyle = stroke_color;
      ctx.lineWidth = stroke_width;
      ctx.lineJoin = "round";
      ctx.lineCap="round";
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
  }
  lastX = x; lastY = y;
}
function clear()
{
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
   result.innerHTML="Pixel Array Length: NAN";
}
function predict()
{
  let data=ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height).data;
  let inputs=[];
  for(var i=3;i<data.length;i=i+4)
  {
    inputs.push(data[i]/255.0);
  }
  result.innerHTML="Pixel Array Length: "+inputs.length.toString();
}
