import $ from "./lib/lib";

$("button").on("click", function () {
  $("div").eq(0).toggleClass("active");
});

// console.log($("button").html("Segrey"));
$("div").click(function () {
  console.log($(this).index());
});

 console.log($('div').eq(2).find('.some'));

// console.log($(".some").closest(".findmea"));
// console.log($(".findme").siblings());
$(".findme").fadeOut(2000);
$("button").fadeIn(2000);