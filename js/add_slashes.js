var options = { input: false };
var zone = new FileDrop("code", options);
zone.event("send", function (files) {
  files.each(function (file) {
    file.readData(
      function (str) {
        zone.el.value = str;
      },
      function (e) {
        alert("Terrible error!");
      },
      "text"
    );
  });
});
function scroll_to_el() {
  $("html, body").animate({ scrollTop: $("#temp").offset().top - 10 }, 600);
}
function scroll_to_top() {
  $("html, body").animate({ scrollTop: $("html").offset().top - 10 }, 600);
}
function con(t) {
  var t = document.getElementById("code").value;
  var c = $("#code").val();
  if (c.length <= 0 || c === "Please enter code") {
    $("#code")
      .focus()
      .val("Please enter code")
      .parents("div.form-group")
      .addClass("has-error");
    return false;
  } else {
    $("#code").parents("div.form-group").removeClass("has-error");
  }
  t = (t + "").replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
  document.getElementById("packer").value = t;
  scroll_to_el();
  $("#res").show();
}
$("#clear").click(function (e) {
  e.preventDefault();
  scroll_to_top();
  $("#code").val("");
  $("#packer").val("");
  $("#code").parents("div.form-group").removeClass("has-error");
  $("#res").hide();
});
function demo() {
  var c = "";
  $("#code").val(c);
  con(t);
}
