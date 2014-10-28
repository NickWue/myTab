$(document).ready(function(){
	firststart();
	initevents();
	thiscard = new Array();
	
	tabpage = new newtabpage;
	tabpage.init();
	
	if (localStorage['starts']++ % 50 == 0) initcard('support');
		
	$('.lang-str').each(function(){
		$(this).html(getmsg($(this).attr('str')));
	});	
	
	refreshClock();
	setInterval(refreshClock, 1000);
	
	jscss();
});

function newtabpage(){
	this.init = function(){
		this.changemode = false;
		new gnMenu(document.getElementById( 'gn-menu' ));
		
		this.loadtopsites();
		this.initcards();
		
		barrier = false;
	}

	this.initcards = function(){
		this.activecards = localStorage["activatedcards"].split(" ");
		
		for (i=0;i<=this.activecards.length-1;i++){
			if (this.activecards[i].length > 1) initcard(this.activecards[i]);	
		}
		
		if ($('.card').length == 0) initcard('nocards');
		else shapeit();

		this.refreshavaiblecards(); 		
	}
	this.loadtopsites =function(){
		chrome.topSites.get (function(urls) {
			for (i=0;i<=($(window).height()/46)-6;i++){
				$('nav ul.gn-menu .alllinks').append("<li><a href="+urls[i].url+" class='gn-icon'><img width='20px' src='chrome://favicon/"+urls[i].url+"'/>"+(urls[i].title.length >20?urls[i].title.substring(0,20)+'...' : urls[i].title)+"</a></li>");
			}
		});	
	}
	this.refreshavaiblecards = function(){	
		$('#settingsbar .addnewcard').html('');
		this.activecards = localStorage["activatedcards"].split(" ");
		for (i=0;i<=allcards.length-1;i++){
			if(this.activecards.indexOf(allcards[i].toLowerCase()) < 0) $('#settingsbar .addnewcard').append('<li><a href="#" card="'+allcards[i]+'">'+(getmsg(allcards[i]).length>0?getmsg(allcards[i]):allcards[i])+'</a></li>');
		}
		if ($('.addnewcard li').length == 0) $('#settingsbar .addnewcard').append('<p>'+getmsg("no_new_cards")+'</p>');
		$('.addnewcard a').click(function(){
			tabpage.changeactivecards('add',$(this).attr('card').toLowerCase());
			return false;
		});
	}
	this.changeactivecards = function(action,value){
		activestring = localStorage["activatedcards"];
		if (action == 'add'){
			if (localStorage["activatedcards"].length < 1) $('#nocards').remove();
			if (activestring.indexOf(value) == -1){
				localStorage["activatedcards"] = activestring+' '+value;	
				initcard(value);					
				shapeit();
			}
		} else {
			if (activestring.indexOf(value) != -1){
				localStorage["activatedcards"] = activestring.replace(value,'').replace('  ',' ').trim();
				$('#'+value).remove();
				shapeit();
			}	
			if (localStorage["activatedcards"].length < 1) initcard('nocards',false);
		}
		tabpage.refreshavaiblecards();
	}
	this.togglechangemode =  function(){
		if (typeof(sso) == typeof(ss) && typeof(ss) != 'undefined'){
			sso.enableDrag =  !this.changemode;
			ss.trigger('ss-destroy');
			shapeit();
		}	
		$('#body .movebodyy').toggle().css('left','300px');
		$( "#body" ).attr('class',(this.changemode?'':'changemode')).draggable({ 
			axis: "y",
			cursor:"n-resize",
			handle: ".movebodyy",
			stop: function() {
				localStorage['body-padding-top'] = $('#body').position().top;
			}
		});
		/* drag and remove wird per anpassung im shapeshift in plugins.js übernommen */
		$('#settingsbar').toggle("slide",{direction: 'right'},800);
		$('#customize-icons').toggle('clip',600);
		$('#card-slider ul li').css('cursor',(this.changemode?'default':'move'));
		this.changemode = !this.changemode;
	}
}

function initcard(id){
	thiscard[id] = new window[id];
	if (thiscard[id].permission.length > 2) checkpermission(id,thiscard[id].permission);
	if (thiscard[id].origin.length > 2) checkorigin(id,thiscard[id].origin);
	$('#body #card-slider ul').append('<li class="card deletbar" id="'+id+'"><div class="headline">'+thiscard[id].headline+'</div><div class="content">'+thiscard[id].content+'</div></li>');
	if (thiscard[id].showsettings || thiscard[id].showsettings == 'plus'){
		$('#'+id+' .headline').append('<div class="'+(thiscard[id].showsettings?'settings icon-cog':'plus icon-plus')+'"></div>');
		$('#'+id+' .settings,.plus').click(function(){
			$('#opacity').show();
			
			id = $(this).parent().parent().attr('id');
			oldheight = $('#'+id).height();
			
			thisobject = new window[id];
			
			$('#'+id+' .headline').append(' '+getmsg('settings'));
			$('#'+id+' .content').html($('.card-settings').html());
			
			$('#'+id+' .content .alle_einstellungen').html(thisobject.settings());
			$('#'+id).height(oldheight);
			
			$('#'+id).css('min-height',$('#'+id+' .content').height()+$('#'+id+' .headline').height()+$('#'+id+' .content .buttons a').height()+50);
			
			$('#'+id+' .settings').attr('title','cancel');
			
			$('#'+id+' input:text:first').focus();

			$('#'+id).zIndex(300);
			$('#'+id).css('position','absolute');
			
			$('#'+id+' .content .buttons a').first().click(function(){
				thisobject.apply();
				location.reload();
			});
			$(document).keypress(function(e){	
				if (e.which == 13){
					thisobject.apply();
					location.reload();
				}	
			});
		});	
	}	
	else if (thiscard[id].showsettings == 'reload'){
		$('#'+id+' .headline').append('<div class="reloadcard evershow icon-loop"></div>');
		$('#'+id+' .reload').click(function(){
			thisobject[id].init();
			return false;
		});

	}

	thiscard[id].init();
	if ('support,design'.split(',').indexOf(id) > -1) $('#'+'support,design'.split(',')['support,design'.split(',').indexOf(id)]).zIndex(600);	
	jscss();
}
function shapeit(){
	if ($('#nocards').length == 0){
		if (typeof(sso) == 'undefined'){
			sso = {
				minColumns: 3,
				enableDrag: false,
				animateOnInit: true
			};
		}	
		ss = $('#card-slider ul#cansort').shapeshift(sso);
	}
}

function checkpermission(id,permission){
	chrome.permissions.contains({
        permissions: [permission],
      }, function(result) {
		if (typeof(result) != undefined){
			if (!result) {
				chrome.permissions.request({
					permissions: [permission],
				}, function(granted) {
				// The callback argument will be true if the user granted the permissions.
				if (granted) {
					location.reload();
				}
				});	
			}
		}	
      }); 
}
function checkorigin(id,permission){
	chrome.permissions.contains({
        origins: [permission],
      }, function(result) {
		if (typeof(result) != undefined){
			if (!result) {
				chrome.permissions.request({
					origins: [permission],
				}, function(granted) {
				// The callback argument will be true if the user granted the permissions.
				if (granted) {
					location.reload();
				}
				});	
			}
		}	
      }); 
}

function getTime() {
	var date = new Date();
	return {
		hour: date.getHours(),
		minute: date.getMinutes()
	};
}
function refreshClock() {
	var now = getTime();
	$('#clock').html((now.hour.toString().length == 1?'0'+now.hour:now.hour)+ ":" + (now.minute.toString().length == 1?'0'+now.minute:now.minute));
}
function getmsg(string){
	return chrome.i18n.getMessage(string);
}
function initevents(){
	$(document).ajaxComplete(function(event,request, settings) {
		shapeit();
		jscss();
	});
	$('input#fontsize').change(function(){
		$('.card .content').css('font-size',$(this).val()); 
		localStorage['fontsize'] = $(this).val();
		ss = $('#card-slider ul#cansort').shapeshift(sso);
	});
	$('input#fontsize').val(localStorage['fontsize']);
	$(document).keydown(function(e){
		switch (e.which){
			case 17: 
				if(!barrier) tabpage.togglechangemode();
				barrier = true;
				setTimeout(function(){barrier = false;},1000);
			break;
		}
	});
	
	$('a.link-support').click(function(){
		initcard('support');
		$('#opacity').show();
		shapeit();
		$('#opacity').click(function(){
			$(this).hide();
		});
		return false;
	});	
	
	$('#settings, .link-settings,.settingslink,#changeheader .close,nav .settingslinks,#changeheader,#leave-changemode').click(function(){
		tabpage.togglechangemode();
		return false;
	});

	$('.togglemenustate').click(function(){
		$('.togglemenustate').html(localStorage['menustate']==1?getmsg('showbigdauerhaft'):getmsg('showlitedauerhaft'));
		localStorage['menustate'] = (localStorage['menustate']==1?0:1);
	});
}
function firststart(){
	if (typeof(localStorage['starts']) == 'undefined')localStorage['starts'] = 0;
	if (typeof(localStorage['menustate']) == 'undefined') localStorage['menustate'] = '0';
	if (typeof(localStorage['toggleheader']) == 'undefined') localStorage['toggleheader'] = 'true';
	if (typeof(localStorage["activatedcards"]) == 'undefined') localStorage["activatedcards"] = '';
	if (typeof(localStorage['own-css-data']) == 'undefined') localStorage['own-css-data'] = '';	
	if (typeof(localStorage['body-padding-top']) == 'undefined') localStorage['body-padding-top'] = '15';
	if (typeof(localStorage['fontsize']) == 'undefined') localStorage['fontsize'] = '18';
}
function jscss(){
	var date = new Date();
	day = date.getDate();
	if (day > 20) day = day -11;
	bg = new Image();
	bg.src = 'images/full.bgs/'+day+'.jpg';
	$('body').css('background','url('+bg.src+') no-repeat center center fixed');
	$('body').css('-webkit-background-size','cover');
	$('body').css('background-size','cover');	
	$('.card .content').css('font-size',localStorage['fontsize']); 	
}