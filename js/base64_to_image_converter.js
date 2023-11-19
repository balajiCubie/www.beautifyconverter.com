$(document).ready(function (e) {
  $("#clear").click(function (e) {
    e.preventDefault();
    $("#base64_output").val("");
    $("#base64_output").parents("div.form-group").removeClass("has-error");
    $("div.data_out").hide();
    $("div.text-warning").hide();
    $("span.road").hide();
    $("a.btn").hide();
    $("#img_size").hide();
    $("html, body").animate({ scrollTop: $("html").offset().top - 10 }, 600);
  });
  var options = { input: false };
  var zone = new FileDrop("base64_output", options);
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
  $("#convert").click(function (e) {
    e.preventDefault();
    base64_output = $.trim($("#base64_output").val());
    if (base64_output == "") {
      $("#base64_output")
        .focus()
        .parents("div.form-group")
        .addClass("has-error");
      return false;
    } else {
      $("#base64_output").parents("div.form-group").removeClass("has-error");
      $("html, body").animate({ scrollTop: $("h1").offset().top - 10 }, 600);
    }
    if (base64_output.substring(0, 4) != "data") {
      base64_output = "data:image/png;base64," + base64_output;
    }
    $("#download_img").prop("src", base64_output);
    $("#download").prop("href", base64_output);
    $("div.data_out").show();
    $("a.btn").show();
  });
});
function $_(id) {
  return document.getElementById(id);
}
function gen_base64() {
  $_("base64_output").value = "";
  $_("img_size").innerHTML = "";
  $_("img_prev").src = "";
  var file = $_("upload_file").files[0];
  if (!/image\/\w+/.test(file.type)) {
    alert("image");
    return false;
  }
  r = new FileReader();
  r.onload = function () {
    $_("base64_output").value = r.result;
    $_("img_size").innerHTML =
      "   Base64 Image size：" +
      Math.round((r.result.length / 1024) * 1000) / 1000 +
      " KB";
  };
  r.readAsDataURL(file);
}
function test_base64() {
  $_("img_prev").src = "";
  $_("img_prev").src = $_("base64_output").value;
  ss = $("#base64_output").val();
  $_("img_size").innerHTML =
    "    Base64 Image size：" +
    Math.round((ss.length / 1024) * 1000) / 1000 +
    " KB";
}
document.getElementById("upload_file").onchange = function () {
  document.getElementById("update_file_label").innerHTML = this.value;
  gen_base64();
};
window.onload = function () {
  if (typeof FileReader === "undefined") {
    alert("Sorry, don't support FileReader, please change you Browser.");
    $_("upload_file").disabled = true;
  }
};
