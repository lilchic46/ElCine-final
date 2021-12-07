function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i].trim();
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

var fullHeight = function () {

	$('.js-fullheight').css('height', $(window).height());
	$(window).resize(function () {
		$('.js-fullheight').css('height', $(window).height());
	});

};

$(document).ready(function () {
	"use strict";
	fullHeight();

	$(".toggle-password").click(function () {
		$(this).toggleClass("fa-eye fa-eye-slash");
		var input = $($(this).attr("toggle"));
		if (input.attr("type") == "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});

	$("#btnSignIn").click(function () {
		var formData = {
			username: $("#username").val(),
			password: $("#password").val(),
		}
		$.ajax({
			type: "POST",
			beforeSend: function (xhr) {
				xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
			},
			url: "/api/signin/",
			data: formData,
			dataType: "json",
			encode: true
		}).done(function (response) {
			console.log(response)
			if (response.status == 0) {
				window.location = window.location.protocol + "//" + window.location.host +"/browse";
			}else{
				$('#message').css("color", "red");
				$('#message').html(response.message)
			}
		})
	})

	$("#btnSignUp").click(function () {
		var formData = {
			username: $("#username").val(),
			email: $("#email").val(),
			password1: $("#password1").val(),
			password2: $("#password2").val()
		}
		$.ajax({
			type: "POST",
			beforeSend: function (xhr) {
				xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
			},
			url: "/api/signup/",
			data: formData,
			dataType: "json",
			encode: true
		}).done(function (response) {
			if (response.status == 0) {
				window.location =  window.location = window.location.protocol + "//" + window.location.host +"/signin";
			}else{
				$('#message').css("color", "red");
				$('#message').html(response.message)			}
		})
	})


});
