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