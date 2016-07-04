﻿function changePage(){var a=window.location.hash.replace("#","");a=a.split("&");if(a[0]=="orderInfo"){$("#wst-page1").addClass("wst-page1");$("#wst-page2").show();$("#wst-footer").hide();getOrderInfo()}else{if(a[0]=="getAddress"){$("#wst-page1").addClass("wst-page1");$("#wst-page2").show();$("#wst-footer").hide();getAddress(a[1])}else{$(".save-area").show();$("#wst-page1").show();$("#wst-page2").addClass("wst-page2");setTimeout(function(){$("body").removeClass("ajaxpage-active")},100);setTimeout(function(){$("#wst-footer").show();$("#wst-page1").removeClass("wst-page1");$("#wst-page2").css("display","none");$(document).scrollTop(0)},500)}}}function getAddress(a){$("#wst-default-loading").modal();$.post(WST.U("WebApp/UsersAddress/getUserAddressForOrder"),{},function(b){var d=WST.toJson(b);var e=Handlebars.compile($("#addressForOrder").text());Handlebars.registerHelper("compare",function(g,h,f){if(g==h){return f.fn(this)}else{return f.inverse(this)}});var c=e({addressList:d,addressIdSelected:a});$("#wst-page2").html(c);$("#wst-default-loading").modal("close");$("body").addClass("ajaxpage-active");setTimeout(function(){$(".save-area").hide();$("#wst-page1").hide();$("#wst-page2").removeClass("wst-page2");$(document).scrollTop(0)},300);b=e=d=c=null})}function changeAddress(d,b,f,g,c,a){$(d).children("div.select-icon").html('<i class="am-icon-check usersex-check"></i>');$(d).siblings().children("div.select-icon").html("");var e='<a href="#getAddress&'+b+'"><div class="am-g am-g-collapse settlement"><div class="am-u-sm-11">'+f+" &nbsp; "+g+"<br>"+c+" &nbsp; "+a+'</div><div class="am-u-sm-1" style="text-align:right;padding-top:7px;"><i class="am-icon-angle-right am-icon-sm"></i></div></div></a>';$("#addressSelected").html(e);$("#addressId").val(b);window.location.hash="back"}function getOrderInfo(){$("#wst-default-loading").modal();$.post(WST.U("WebApp/Payments/getPayType"),{},function(b){var o=WST.toJson(b);if(o){var q=o;var x=Handlebars.compile($("#invoiceInfo").text());Handlebars.registerHelper("compare",function(z,A,i){if(z==A){return i.fn(this)}else{return i.inverse(this)}});var f=[];var e=$(".order-goods-img").length;var m=0;var l=0;for(var k=0;k<e;k++){var g=$(".order-goods-img").eq(k);var d=g.attr("src");var u=g.siblings(".shopName").val();var n=g.siblings(".isInvoice").val();f.push({goodsImg:d,shopName:u,isInvoice:n});if(n==0){m++}}if(m==e){l=1}var p=JSON.parse(storageGetItem("orderInfo"));p=p?p:{};for(var k in q){q[k].index=k;q[k].payId=p.payId}var j={payInfo:q,orderInfo:p,deliveryType:p.deliveryType?p.deliveryType:0,invoiceClientStatus:l,goodslist:f};var h=x(j);$("#wst-page2").html(h);$("#wst-default-loading").modal("close");$(".save-area").hide();$("body").addClass("ajaxpage-active");setTimeout(function(){$(".save-area").hide();$("#wst-page1").hide();$("#wst-page2").removeClass("wst-page2");$(document).scrollTop(0)},300);var r="";var v=0;var c=3;var w=getTimeOneHourLater();if(w>95){v=1;c=4;w=0}var s=p.reachDate;var t=p.reachTime;for(var k=v;k<c;k++){var y=getRelatedDate(k);r+='<option name="reachDate[]"';r+=(s==y)?" selected":"";r+=">"+y+"</option>"}$("#requireDate").html(r);var a=getRelatedDate(0);if(!s||s==a){createRequireTime(w,t)}else{createRequireTime(0,t)}j=p=f=x=h=r=null}else{wstMsg("请先选择支付方式")}})}function getTimeOneHourLater(){var c=new Date();var a=c.getHours();var b=c.getMinutes();return a*4+(Math.ceil(b/15))+4}function getRelatedDate(b){var a=new Date();a.setDate(a.getDate()+b);var c=a.getMonth()+1;return a.getFullYear()+"-"+(c>=10?c:"0"+c)+"-"+(a.getDate()>=10?a.getDate():"0"+a.getDate())}function changeRequireDate(b){var c=getTimeOneHourLater();var a=getRelatedDate(0);if(a!=$(b).val()){c=0}createRequireTime(c)}function createRequireTime(d,c){var b="";for(var a=d;a<=96;a++){if(times[a]){b+='<option name="reachTime[]"';b+=(c==times[a])?" selected":"";b+=">"+times[a]+"</option>"}}$("#requireTime").html(b)}function changePayType(a){$(a).addClass("active").parent().siblings(".paytype-wrapper").children(".paytype").removeClass("active")}function changeDeliveryType(a){$(a).addClass("active").parent().siblings(".deliverytype-wrapper").children(".paytype").removeClass("active")}function saveOrderInfo(){var e=$(".paytype-wrapper button.active");var a=$(".deliverytype-wrapper button.active");var b=a.attr("deliverytypeValue");$("#payType").html(e.html());if(b==1){$("#deliveryType").html("自提");$("#deliveryTotalMoney").html("0.00")}else{$("#deliveryType").html("不自提");$("#deliveryTotalMoney").html(Number($("#totalDeliveryMoneyHidden").val()).toFixed(2))}calculateTotalMoney();var c=$("#invoiceClient").val();if(c==""){$("#isInvoice").html("不开发票")}else{$("#isInvoice").html("开发票")}var d={payType:e.attr("isOnline"),payId:e.attr("payId"),deliveryType:b,isSelf:b,invoiceClient:c,orderRemarks:$("#orderRemarks").val(),reachDate:$("#requireDate").val(),reachTime:$("#requireTime").val(),requireTime:$("#requireDate").val()+" "+$("#requireTime").val()+":00"};storageSetItem("orderInfo",JSON.stringify(d));location.hash="#back"}function submitOrders(){var a=$("#addressId").val();if(a==""){wstMsg("请选择收货地址");return false}var b=JSON.parse(storageGetItem("orderInfo"));b=b?b:{};var c={};c.addressId=a;c.payType=b.payType;c.isSelf=b.isSelf;c.invoiceClient=b.invoiceClient;c.orderRemarks=b.orderRemarks;c.requireTime=b.requireTime;c.isScorePay=Number($("#scorePay").val());$.post(WST.U("WebApp/Orders/addOrder"),c,function(d){var e=WST.toJson(d);if(e.status==1){storageRemoveItem("orderInfo");if(c.payType==1){location.href=WST.U("WebApp/Payments/toPay","orderId="+e.orderIds)}else{wstMsg("下单成功");setTimeout(function(){location.href=WST.U("WebApp/Orders/index")},2000)}}else{wstMsg(e.msg)}})}function calculateTotalMoney(){var b=Number($("#totalMoney").html());var a=Number($("#deliveryTotalMoney").html());var d=b+a;if(Number($("#scorePay").val())==1){var c=Number($("#scoreMoney").val());d-=c}$("#payMoney").html(d.toFixed(2))}function addNewAddress(){storageSetItem("targetUrl",location.href);location.href=WST.U("WebApp/UsersAddress/index")}var times=["00:00","00:15","00:30","00:45","01:00","01:15","01:30","01:45","02:00","02:15","02:30","02:45","03:00","03:15","03:30","03:45","04:00","04:15","04:30","04:45","05:00","05:15","05:30","05:45","06:00","06:15","06:30","06:45","07:00","07:15","07:30","07:45","08:00","08:15","08:30","08:45","09:00","09:15","09:30","09:45","10:00","10:15","10:30","10:45","11:00","11:15","11:30","11:45","12:00","12:15","12:30","12:45","13:00","13:15","13:30","13:45","14:00","14:15","14:30","14:45","15:00","15:15","15:30","15:45","16:00","16:15","16:30","16:45","17:00","17:15","17:30","17:45","18:00","18:15","18:30","18:45","19:00","19:15","19:30","19:45","20:00","20:15","20:30","20:45","21:00","21:15","21:30","21:45","22:00","22:15","22:30","22:45","23:00","23:15","23:30","23:45"];$(document).ready(function(){initFooter("cart");var e=0;var f=getTimeOneHourLater();if(f>95){e=1;f=0}var b=getRelatedDate(e);var c=times[f];var d=b+" "+c+":00";var a={addressId:$("#addressId").val(),payType:payType,isSelf:0,requireTime:d};storageSetItem("orderInfo",JSON.stringify(a));$("#scorePayIcon").click(function(){if($(this).attr("class").indexOf("active")!=-1){$(this).addClass("am-icon-circle-thin").removeClass("am-icon-check-circle active");$("#scorePay").val(0)}else{$(this).addClass("am-icon-check-circle active").removeClass("am-icon-circle-thin");$("#scorePay").val(1)}calculateTotalMoney()})});