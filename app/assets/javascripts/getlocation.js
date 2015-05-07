function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			$("#demo").html("Geolocation not supported");
		}
	}
function showPosition(position) {
		var lat = position.coords.latitude
		var lng = position.coords.longitude
		codeLatLng(lat, lng)
	}
function initialize() {
	geocoder = new google.maps.Geocoder();
}

function codeLatLng(lat, lng) {
	var latlng = new google.maps.LatLng(lat, lng);
	geocoder.geocode({'location': latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			console.log(results);
			console.log(results[0].address_components);
			if (results[1]) {
				for (var i=0; i<results[0].address_components.length; i++) {
					for (var b=0; b<results[0].address_components[i].types.length; b++) {
						if (results[0].address_components[i].types[b] == "locality") {
							city = results[0].address_components[i];
							break;
						}

					}

				}
				$("#city").html("You are currently at: "+city.short_name);
				$("#address").html("You're complete address: "+results[0].formatted_address);
				window.location.replace("/welcome/show_weather?city="+city.short_name);
				return false;
			} else {
				alert("no results")
			}
		} else {
			alert("Geocoder failed due to: " + status);
		}
	});
}

function showCurrentWeather(city) {
	$.ajax({
		type: 'GET',
		url: '/welcome/show_weather?city='+city,

	})
}