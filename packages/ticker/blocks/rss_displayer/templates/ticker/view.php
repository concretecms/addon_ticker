<?php  
$rssObj=$controller;
$textHelper = Loader::helper("text"); 

if( strlen($errorMsg)>0 ){
	echo $errorMsg;
}else{ ?>

<style>
</style>

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
	<?php  foreach($posts as $itemNumber=>$item) { 	 
		if( intval($itemNumber) >= intval($rssObj->itemsToDisplay) ) break; ?>		
		<div class="tickerItem"> 
			<div class="tickerNewWin"><?php echo intval($rssObj->launchInNewWindow) ?></div> 	
			<div class="tickerTitle"><?php echo  html_entity_decode($item->get_title()); ?></div> 			
			<div class="tickerLink" ><?php echo   $item->get_permalink() ; ?></div>
			<div class="tickerDate"><?php echo  $item->get_date('F jS'); ?></div> 
		</div> 	
	<?php   }  ?> 	
</div>
<script>
ticker<?php echo intval($bID) ?> = new ConcreteTicker(<?php echo intval($bID)?>,'ticker<?php echo intval($bID) ?>');
ticker<?php echo intval($bID) ?>.init();
</script>

<?php  } ?>