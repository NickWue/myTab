
function weather(){
	this.headline = getmsg("wetter");
	this.content = getmsg("laden");
	this.showsettings = true;
	this.permission = '';
	this.origin = 'http://api.openweathermap.org/*';
	this.init = function(){
		self = this;
		if (typeof(localStorage["location"]) == 'undefined') localStorage["location"] = 'new york';
		if (typeof(localStorage["units"]) == 'undefined') localStorage["units"] = 'metric';
		$.ajax({
			url: "http://api.openweathermap.org/data/2.5/weather?q="+localStorage["location"]+'&units='+localStorage["units"]+'&lang='+getmsg("lang_name"),
			dataType: 'JSON',
			success: function(data){
				if (typeof(data.main) == 'undefined'){
					$("#weather .content").html('<div style="color:red">'+data.cod+'//'+data.message);
				}	
				else{
					zeichen = (localStorage["units"]=='metric'?'C':'F');
					$('#weather .headline').append(' '+getmsg("for")+'  '+data.name);					
					$('#weather .content').html('<h2>'+Math.round(data.main.temp)+'&deg;'+zeichen+'</h2><table border="0"><tr><td>'+getmsg("wettertyp")+'</td><td>'+data.weather[0].description+'</td></tr><tr><td>'+getmsg("luftfeuchtigkeit")+'</td><td>'+data.main.humidity+'%</td></tr><tr><td>'+getmsg("max_temp")+'</td><td>'+data.main.temp_max+'&deg;'+zeichen+'</td></tr><tr><td>'+getmsg("min_temp")+'</td><td>'+data.main.temp_min+'&deg;'+zeichen+'</td></tr><tr><td>'+getmsg("more_infos")+'</td><td><a href="http://openweathermap.org/city/'+data.id+'">'+getmsg("more_infos")+'</a></td></tr></table>');
					$('#weather h2').addClass('maincolor');
				}	
			},
			error:function(){
				$("#weather .content").html(getmsg("weather_error"));
				window.setTimeout(function(){thiscard['weather'].init();},2000);
			}
		});	
	}
	this.settings = function(){	
		return '<input type="text" id="location" value="'+localStorage["location"]+'" placeholder="'+getmsg("ort_eingeben")+'"/><br/><h3> Units </h3><input type="radio" name="units" '+(localStorage["units"]=='metric'?'checked':'')+' value="metric"/>Celius <br/><input type="radio" '+(localStorage["units"]=='imperial'?'checked':'')+' name="units" value="imperial"/>Fahrenheit <br/>';
	}
	this.apply = function(plz){
		localStorage["location"] = $('#weather #location').val();
		localStorage["units"] = $('#weather input[name="units"]:checked').val();
	}
}
