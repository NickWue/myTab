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