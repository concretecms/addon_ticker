<?php  
$rssObj=$controller;
$textHelper = Loader::helper("text"); 

if( strlen($errorMsg)>0 ){
	echo $errorMsg;
}else{ ?>

<div id="tickerDisplay<?php echo  $bID ?>" class="tickerDisplay">
	<div class="controls">
		<div class="next"></div>
		<div class="prev"></div>	
		<div class="pause">&nbsp;</div>
		<div class="play"></div>		
	</div>
	<a href="#"><div class="txt"><span class="noResults"><?php echo t('No Results')?></span></div></a>
</div>

<div id="tickerItems<?php echo  $bID ?>" class="tickerItems"> 
	<?php  for ($i = 0; $i < count($cArray); $i++ ) {  
		$cobj = $cArray[$i]; 
		$title = $cobj->getCollectionName();
		?>		
		<div class="tickerItem"> 
			<div class="tickerTitle"><?php echo  html_entity_decode( $title ); ?></div> 			
			<div class="tickerLink" ><?php echo  $this->url( $nh->getLinkToCollection($cobj) ) ?></div>
			<div class="tickerDate"><?php  ?></div> 
		</div> 	
	<?php   }  ?> 	
</div>
<script>
ticker<?php echo intval($bID) ?> = new ConcreteTicker(<?php echo intval($bID)?>,'ticker<?php echo intval($bID) ?>');
ticker<?php echo intval($bID) ?>.init();
</script>

<?php  } ?>