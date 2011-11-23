//javascript class 
// var ticker = new ConcreteTicker();
function ConcreteTicker(bID,objName){ 
	this.bID=bID;
	this.cTickerName=objName;
	this.pos=0; 
	this.init=function(){ 
		this.tickerDisplay=$('#tickerDisplay'+this.bID);
		this.tickerDisplayTxt=this.tickerDisplay.find('.txt'); 
		this.tickerDisplayTxt.get(0).tickerObj=this;
		this.tickerDisplayTxt.mouseover(function(){
			if(!this.tickerObj.paused){
				this.tickerObj.pauseLink.click();
				this.hoverPause=1;
			}
		});
		this.tickerDisplayTxt.mouseout(function(){
			if(this.hoverPause){
				setTimeout(this.tickerObj.cTickerName+'.playLink.click();',700)
				this.hoverPause=0;
			}
		}); 		
		
		var listItems=[]; 	
		$('#tickerItems'+this.bID+' .tickerItem').each(function(){
			var tickerItem=$(this);
			var title = tickerItem.find('.tickerTitle').html();
			var url = tickerItem.find('.tickerLink').html();
			var newWin = tickerItem.find('.tickerNewWin').html();
			listItems.push({
				title:title,
				url:url,
				newWin:newWin
			})
		});
		this.listItems=listItems;
		if(this.listItems.length>0){ 
			setTimeout(this.cTickerName+'.nextItem()',100);
			var nextLink=this.tickerDisplay.find('.next');
			nextLink.get(0).tickerObj=this;
			nextLink.click(function(){
				this.tickerObj.nextItem();
			});
			var prevLink=this.tickerDisplay.find('.prev')
			prevLink.get(0).tickerObj=this;
			prevLink.click(function(){ 
				this.tickerObj.pos=this.tickerObj.pos-2;
				if(this.tickerObj.pos<0) this.tickerObj.pos=this.tickerObj.pos+this.tickerObj.listItems.length;
				this.tickerObj.nextItem();
			});
			this.pauseLink=this.tickerDisplay.find('.pause');
			this.pauseLink.get(0).tickerObj=this;
			this.pauseLink.click(function(){ 
				clearTimeout(this.tickerObj.timer);
				this.tickerObj.playLink.css('display','inline');
				this.tickerObj.pauseLink.css('display','none');
				this.tickerObj.paused=1;
				this.tickerObj.tickerDisplayTxt.html(this.tickerObj.tickerDisplayTxt.html()+this.tickerObj.textToType);
				this.tickerObj.textToType='';
			});
			this.playLink=this.tickerDisplay.find('.play');
			this.playLink.get(0).tickerObj=this;
			this.playLink.click(function(){ 
				this.tickerObj.playLink.css('display','none');
				this.tickerObj.pauseLink.css('display','inline');
				clearTimeout(this.tickerObj.timer);
				if(this.tickerObj.paused)
					this.tickerObj.tickerDisplayTxt.html(''); 
				this.tickerObj.paused=0;				
				this.tickerObj.nextItem();				
			}); 
		}else{
			this.tickerDisplay.find('.noResults').css('display','block'); 
		}
		return;
	}
	this.nextItem=function(){ 
		clearTimeout(this.timer);
		this.tickerDisplayTxt.html(''); 	
		this.textToType=this.escapeHTML(this.listItems[this.pos].title);
		this.currentLink=this.listItems[this.pos].url;
		this.newWin=this.listItems[this.pos].newWin;
		var a=this.tickerDisplayTxt.get(0).parentNode;
		a.href=this.currentLink;
		a.target=(this.newWin==1)?'_blank':'_self';
		if(this.paused){
			this.tickerDisplayTxt.html(this.textToType);
		}else{				
			this.typeLetter();
		}
		this.pos++;
		if(this.pos>=this.listItems.length) this.pos=0;		
	}
	this.typeLetter=function(){		
		//does it still have letters left to type?
		if( this.textToType.length ){
			var newLetter=this.textToType.substring(0,1);
			this.textToType=this.textToType.substring(1);
			this.tickerDisplayTxt.html( this.tickerDisplayTxt.html() + newLetter ); 
			this.timer=setTimeout(this.cTickerName+'.typeLetter()',50);			
	
		//no more letters, start a new story item
		}else this.timer=setTimeout(this.cTickerName+'.nextItem()',1500);
	} 
	this.go2Link=function(){
		clearTimeout(this.timer); 			
		this.pauseLink.click();
		$(this.tickerDisplayTxt.get(0).parentNode).click() 
		//if(!this.newWin) window.location=this.currentLink;
		//else window.open(this.currentLink,'c5tickerWin'+Math.floor(Math.random()*100),'width=700,height=500,resizable=yes,scrollbars=yes,toolbar=yes,location=yes,menubar=yes,directories=yes');
	} 
	this.escapeHTML=function(str){
	   return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'); 
	} 
}
