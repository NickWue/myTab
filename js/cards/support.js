function support(){
	this.headline = 'Support myTab';
	this.content = getmsg("spenden")+'<h2>'+getmsg('share')+'</h2><a href="http://www.facebook.com/share.php?u=http://goo.gl/oIIHkt"><img src="images/icons/facebook.png"/></a><a href="https://plus.google.com/share?http://goo.gl/oIIHkt"><img src="images/icons/google+.png"/></a><a href="http://twitter.com/home?status=http://nickw.de/goo.gl/oIIHkt"><img src="images/icons/twitter.png"/></a><a href="http://www.linkedin.com/shareArticle?mini=true&url=http://goo.gl/oIIHkt"><img src="images/icons/linkedin.png"/></a><a href="http://reddit.com/submit?url=http://nickw.de/goo.gl/oIIHkt"><img src="images/icons/reddit.png"/></a><h2> '+getmsg('donate')+' </h2><form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="PR6DB6ES5SF5U"><input type="image" src="https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online."><img alt="" border="0" src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif" width="1" height="1"></form><h2><a href="http://goo.gl/oIIHkt">'+getmsg('bewerten')+'</a></h2>';
	this.permission = '';
	this.origin = '';
	this.init = function(){
		
	}	
}