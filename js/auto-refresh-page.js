function refresh() {
  if (run) {
    var t = $("#url").val(),
      r = $("#frame");
    r.attr("src", t);
    var e = $("#times");
    e.val(parseInt(e.val()) + 1),
      $("html, body").animate({ scrollTop: $("h1").offset().top - 10 }, 600);
  }
}
function startRefresh() {
  run = !0;
  try {
    startButton.hide(), endButton.show();
    var t = parseInt($("#frequency").val());
    refresh(), (timer = setInterval("refresh()", 1e3 * t));
  } catch (r) {
    startButton.show(), endButton.hide(), alert("Setting error!");
  }
}
function endRefresh() {
  (run = !1),
    clearInterval(timer),
    startButton.show(),
    endButton.hide(),
    $("html, body").animate({ scrollTop: $("html").offset().top - 10 }, 600);
}
var run = !1,
  timer,
  startButton,
  endButton;
$(document).ready(function () {
  (startButton = $("#startButton")), (endButton = $("#endButton"));
});
