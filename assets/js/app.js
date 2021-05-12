// Website Theme related settings
let stroke_color;
if((theme === null && prefersDarkScheme.matches) || theme === "dark")
{
    stroke_color='#fff';
}
else
{
    stroke_color='#111';
}
dark_mode_switch();
animate_containers();
// Theme settings end here

let mousePressed = false;
let lastX, lastY;
let ctx;
const stroke_width=10;

window.onload=function()
{
    // Theme related settings
    nav_menu();
    filter_projects();
    LazyLoad();
    // Theme settings end here

    Init();
}
function Init()
{
    ctx = document.getElementById('draw').getContext("2d");
    let draw=document.getElementById("draw");
    draw.addEventListener("mousedown", (e)=>{
        mousePressed = true;
        Draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop, false);
    });
    draw.addEventListener("mousemove", (e)=>{
        if (mousePressed) {
            Draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop, true);
        }
    });
    draw.addEventListener("mouseup", (e)=>{
        mousePressed = false;
    });
    draw.addEventListener("mouseleave", (e)=>{
        mousePressed = false;
    });
    document.getElementById("clear").addEventListener("click", (e)=>{
        clear();
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
  feed.setTransform(1, 0, 0, 1, 0, 0);
  feed.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  removeDataFromGraph(graph);
  addDataToGraph(graph,[]);
  predictbar.innerHTML="Predicted Digit = NaN".toString();
}