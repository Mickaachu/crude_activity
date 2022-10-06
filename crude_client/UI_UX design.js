$("#FirstName, #LastName").each(function (type) {
	
	$(this).keypress(function () {
		$(this).parent().addClass("Data");
	});
 
	$(this).blur(function () {
		if ($(this).val() == "") {
			$(this).parent().removeClass("Data");
		}
	});
	
});

$("#Phone, #Address1").each(function (type) {
	
	$(this).focus(function () {
		$(this).parent().addClass("Data");
	});
 
	$(this).blur(function () {
		if ($(this).val() == "") {
			$(this).parent().removeClass("Data");
		}
	});
$("#Address2, #Email").each(function (type) {
	
	$(this).focus(function () {
		$(this).parent().addClass("Data");
	});
 
	$(this).blur(function () {
		if ($(this).val() == "") {
			$(this).parent().removeClass("Data");
		}
	});  
 
	
});
