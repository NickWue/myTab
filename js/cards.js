/* ALL CARDS IN ONE FILE */
allcards = 'Bookmarks,apps,Wecker,RecentlyClosed,Weather,News,Gmail,Facebook,Joke,Notes'.split(",");

// Apps
function apps(){
	this.headline = 'Apps';
	this.content = '';
	this.showsettings = false;
	this.permission = 'management';
	this.origin = '';
	this.init = function(){
		chrome.management.getAll(function(data){
			for (i=1;i<=data.length-1;i++){
				if (data[i].type == 'hosted_app'){
					$('#apps .content').append("<li><a href='"+data[i].appLaunchUrl+"'><img width='16' src='"+data[i].icons[0].url+"'/>"+data[i].name+"</a></li>");		
				}	
			}
		});
	}
}

//Bookmarks
function bookmarks(){
	this.headline = getmsg("bookmarks");
	this.content = getmsg("no_bookmarks");
	this.showsettings = false;
	this.permission = 'bookmarks';
	this.origin = '';
	this.init = function(){
		$('#bookmarks .content').html('');
		chrome.bookmarks.getTree(function(list){	
	
			
			for (a=0;a<=list[0].children.length-1;a++){
				if (typeof(list[0].children[a].children) != 'undefined'){
					for (b=0;b<=list[0].children[a].children.length;b++){
						if (typeof(list[0].children[a].children[b]) != 'undefined'){
							if (typeof(list[0].children[a].children[b].children) == 'undefined'){
								$('#bookmarks .content').append('<li><a href="'+list[0].children[a].children[b].url+'"><img src="chrome://favicon/'+list[0].children[a].children[b].url+'" width="25"/>&nbsp;'+ list[0].children[a].children[b].title+'&nbsp;</a></li>');
							}
						}	
					}
				}	
			}
		});
	}
}

//Facebook
function facebook(){
	this.headline = 'Facebook Newsstream';
	this.content = getmsg("karte_muss_eingestellt_werden");
	this.showsettings = true;
	this.permission = '';
	this.origin = 'https://www.facebook.com/*';
	this.init = function(){
		if (typeof(localStorage['facebooknumbershow']) == 'undefined'){
			localStorage['facebooknumbershow'] = 10;
			localStorage['facebookrss'] = '';
		}
		notifcounter = 0;
		if (localStorage['facebookrss'] != ''){
			$("#facebook .content").html('');
			for (var i = 0; i <= localStorage['facebooknumbershow']; i++){
				$("#facebook .content").css('min-height',$("#facebook .content").height()+33);
			}
			$.get(localStorage['facebookrss'], function(XMLmediaArray){
				$(XMLmediaArray).find("item").each(function(){	
					if (notifcounter < localStorage['facebooknumbershow']){
						var $myMedia = $(this);
				 
						var title = $(this).find("title").text();
						var link = $(this).find("link").text();
			 
						$("#facebook .content").append('<li><a href="'+link+'">'+title+'</a></li>');
					}
					notifcounter++;
				});
			}).fail(function() {
				$("#facebook .content").html(getmsg("falscher_link"));
			});
		}	
	}
	this.settings = function(){
		return '<span> '+getmsg("link_zu_benachrichtiung")+' </span><input class="facebookrssinput" type="text" value="'+localStorage['facebookrss']+'"/><a target="_blank" href="https://www.facebook.com/help/212445198787494"> '+getmsg("link_source")+' </a><br/><span> Anzahl Benachrichtigungen</span><input type="text" class="facebooknumbershowinput" value="'+localStorage['facebooknumbershow']+'"/>';
	}
	this.apply = function(){
		localStorage['facebookrss'] = $('.facebookrssinput').val();
		localStorage['facebooknumbershow'] = $('.facebooknumbershowinput').val();	
	}
}

//GMail
function gmail(){
	this.headline = 'GMail '+getmsg("unread");
	this.content = '<a href="https://mail.google.com" class="unread_gmail">'+getmsg("laden")+'</a>';
	this.showsettings = false;
	this.permission = '';
	this.origin = 'https://mail.google.com/mail';
	this.init = function(){
		$.get("https://mail.google.com/mail/feed/atom", function(XMLmediaArray){
			$(XMLmediaArray).find("fullcount").each(function(){	
				$('#gmail .content .unread_gmail').html($(this).text()).addClass('maincolor');
				$('#gmail .content .unread_gmail').addClass('notifthere');
			});
			$(XMLmediaArray).find("entry").each(function(){
				$('#gmail .content').append('<li><a href="'+$(this).find("link").attr("href")+'">'+$(this).find("title").text()+'</a></li>');
			});
		}).fail(function() {
			$("#gmail .content .unread_gmail").html(getmsg("gmailerror"));
		});	
	}
}

//Joke
function joke(){
	this.headline = getmsg('joke_headline');
	this.content = '';
	this.showsettings = 'reload';
	this.permission = '';
	this.origin = 'https://api.icndb.com/jokes/random';
	this.init = function(){
		$("#joke .content").css('min-height',75);

		$.get("http://api.icndb.com/jokes/random", function(data){
			$('#joke .content').html(data.value.joke);
		});
	}
	$('#joke .reloadcard').click(function(){
		thiscard['joke'].init();
	});		
}

//News
function news(){
	this.headline = getmsg("topnews");
	this.content = '';
	this.showsettings = false;
	this.permission = '';
	this.origin = 'https://news.google.com/*';
	this.init = function(){
		for (var i = 0; i <= 10; i++){
			$("#news .content").css('min-height',$("#news .content").height()+40);
		}
		$.get("https://news.google.com/news/feeds?output=rss&hl="+navigator.language, function(XMLmediaArray){
			$(XMLmediaArray).find("item").each(function(){ 
				$("#news .content").append('<li><a href="'+$(this).find("link").text()+'">'+$(this).find("title").text()+'</a></li>');
			});
		});
	}
}

//Nocards
function nocards(){
	this.headline = getmsg("noch_keine_cards_headline");
	this.content = getmsg("noch_keine_cards");
	this.showsettings = false;
	this.permission = '';
	this.origin = '';
	this.init = function(){
		if (typeof(localStorage['show-nocards']) == 'undefined') localStorage['show-nocards'] = true;
		$('#nocards').click(function(){ tabpage.togglechangemode();});
		$('#nocards').append('<a href="#" id="dont-show-nocards" style="z-index:500">'+getmsg('dont_show_hinweis')+'</a>');
		$('#dont-show-nocards').click(function(){
			localStorage['show-nocards'] = false;
			$('#nocards').hide();
		});
		if (localStorage['show-nocards'] == 'false'){
			$('#nocards').hide();
		}	
	}
}

//Notes
function notes(){
	this.headline = getmsg("notes");
	this.content = getmsg("notes_content");
	this.showsettings = 'plus';
	this.permission = '';
	this.origin = '';
	this.init = function(){
		if (typeof(localStorage['allnotes']) == 'undefined') localStorage['allnotes'] = '';
		$('#notes').height(70);
		allnotes = localStorage['allnotes'].split(",");
		if (allnotes.length > 1){
			anzahlapplynotes = 0;
			$('#notes .content').html('');
			for (z=0;z<=allnotes.length;z++){
				if (typeof(allnotes[z]) != 'undefined' && allnotes[z] != ''){
					$('#notes .content').append('<p class="class'+z+'" id="notes'+z+'"><span class="realcontent">'+allnotes[z]+'</span><span class="deleat" title="notiz löschen">x</span></p>');
					anzahlapplynotes++;
					if (anzahlapplynotes > 4 && anzahlapplynotes < 7){
						$('#notes').height($('#notes').height()+29);
					}
				}
			}
			if (anzahlapplynotes == 0) $('#notes .content').html(this.content);
		}
		else{
			$('#notes .content').html(getmsg("notes_content"));
		}
		$('#notes .content .deleat').click( function() {
			console.log($(this).parent().attr('id'));
			thiscard['notes'].deleat($(this).parent().attr('id'));
			thiscard['notes'].init();
		});	
	}
	this.settings = function(){
		return '<input type="text" class="newnoteinput" placeholder="'+getmsg("new_note")+'"/><p>'+getmsg("new_note_explain")+'</p>';
		$('.avgrund-popin .buttons a').first().click(function(){
			thiscard['notes'].apply();
			thiscard['notes'].init();
		});
		
	}
	this.apply = function(){
		localStorage['allnotes'] = $('.newnoteinput').val()+','+localStorage['allnotes'];
	}
	this.deleat = function(classname){
		localStorage['allnotes'] = localStorage['allnotes'].replace($('#'+classname+' .realcontent').html()+',',"");
	}
}


//Recentlyclosed
function recentlyclosed(){
	this.headline = getmsg("recentlyclosed");
	this.content = '';
	this.showsettings = false;
	this.permission = 'history';
	this.origin = '';
	this.init = function(){
		
		chrome.history.search({text:'',maxResults:100}, function(callback){
			for (i=0;i<=callback.length-1;i++){
				if (callback[i].url.indexOf('www') != -1){
					title = callback[i].url.substring(callback[i].url.indexOf('www.')+4,callback[i].url.length);
				}
				else{
					if (callback[i].url.indexOf('://') == -1) title = callback[i].url;
					else title = callback[i].url.substring(callback[i].url.indexOf('://')+3,callback[i].url.length);	
				}	
				if(title.length > 34) title = title.substring(0,30)+'...';
				$('#recentlyclosed .content').append("<li><a href='"+callback[i].url+"'><img src='chrome://favicon/"+callback[i].url+"'/>"+title+"</a></li>");		
			}	
		});
		$('#recentlyclosed').height(382);
		$('#recentlyclosed .content').prepend("<li><a id='showhistory' href='#'>Gesamten Verlauf anzeigen</a></li>");
		$('#showhistory').click(function(){
			chrome.tabs.create({url:'chrome://history/'});
		});
	}
}

//Support
function support(){
	this.headline = 'Support myTab';
	this.content = getmsg("spenden")+'<h2>'+getmsg('share')+'</h2><a href="http://www.facebook.com/share.php?u=https://goo.gl/VRsFZ2"><img src="images/icons/facebook.png"/></a><a href="https://plus.google.com/share?https://goo.gl/VRsFZ2"><img src="images/icons/google+.png"/></a><a href="http://twitter.com/home?status=https://goo.gl/VRsFZ2"><img src="images/icons/twitter.png"/></a><a href="http://www.linkedin.com/shareArticle?mini=true&url=https://goo.gl/VRsFZ2"><img src="images/icons/linkedin.png"/></a><a href="http://reddit.com/submit?url=https://goo.gl/VRsFZ2"><img src="images/icons/reddit.png"/></a><h2> '+getmsg('donate')+' </h2><form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="PR6DB6ES5SF5U"><input type="image" src="https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online."><img alt="" border="0" src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif" width="1" height="1"></form><h2><a href="http://goo.gl/oIIHkt">'+getmsg('bewerten')+'</a></h2><h2> Develope myTab with me!</h2> Develop your own cards, or translate myTab into your own language.<a href="https://github.com/NickWue/myTab"> myTab is Open Source on Github! </a>';
	this.permission = '';
	this.origin = '';
	this.init = function(){
		
	}	
}

//Weather
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


//Wecker
function wecker(){
	this.headline = getmsg('wecker');
	this.content = '<form action="" method="" id="jsalarmclock"><div class="leftcolumn">'+getmsg('set_alarm')+':</div> <span><select></select>H.</span> <span><select></select>Min.</span> <span><select></select>Sec.</span><div class="leftcolumn">'+getmsg("page_to_launch")+'</div> <input type="text" id="musicloc" value="http://www.youtube.com/watch?v=XsMFkegNUAA" /> <span><div class="achtung"> '+getmsg("wecker_warning")+'</div></span><div class="buttons"><a href="#" class="icon-checkmark" id="setalarm"> '+getmsg('set_alarm')+' </a><a href="#" id="resetalarm" class="icon-close avgrund-close"> Reset </a></div></form>';
	this.showsettings = false;
	this.permission = '';
	this.origin = '';
	this.init = function(){
		jsalarm.init();		
	}
}
jsalarm={
	padfield:function(f){
		return (f<10)? "0"+f : f
	},
	showcurrenttime:function(){
		if (typeof this.hourwake!="undefined"){ //if alarm is set
			if ($('#date').html()==(this.hourwake+":"+this.minutewake+":"+this.secondwake)){
				clearInterval(jsalarm.timer);
				window.location=document.getElementById("musicloc").value;
			}
		}
	},
	init:function(){
		var dateobj=new Date();
		this.submitref=document.getElementById("setalarm");
		this.submitref.onclick=function(){
			jsalarm.setalarm();
			$(this).html("Alarm Set");
			this.disabled=true;
			return false;
		}
		this.resetref=document.getElementById("resetalarm");
		this.resetref.onclick=function(){
		jsalarm.submitref.disabled=false;
		jsalarm.hourwake=undefined;
		jsalarm.hourselect.disabled=false;
		jsalarm.minuteselect.disabled=false;
		jsalarm.secondselect.disabled=false;
		return false;
		}
		var selections=document.getElementsByTagName("select");
		this.hourselect=selections[0];
		this.minuteselect=selections[1];
		this.secondselect=selections[2];
		for (var i=0; i<60; i++){
			if (i<24) //If still within range of hours field: 0-23
			this.hourselect[i]=new Option(this.padfield(i), this.padfield(i), false, dateobj.getHours()==i);
			this.minuteselect[i]=new Option(this.padfield(i), this.padfield(i), false, dateobj.getMinutes()==i);
			this.secondselect[i]=new Option(this.padfield(i), this.padfield(i), false, dateobj.getSeconds()==i);
		}
		jsalarm.showcurrenttime();
		jsalarm.timer=setInterval(function(){jsalarm.showcurrenttime()}, 1000);
	},
	setalarm:function(){
		this.hourwake=this.hourselect.options[this.hourselect.selectedIndex].value
		this.minutewake=this.minuteselect.options[this.minuteselect.selectedIndex].value
		this.secondwake=this.secondselect.options[this.secondselect.selectedIndex].value
		this.hourselect.disabled=true
		this.minuteselect.disabled=true
		this.secondselect.disabled=true
	}
}