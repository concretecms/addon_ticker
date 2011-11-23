<?php 

defined('C5_EXECUTE') or die(_("Access Denied."));

class TickerPackage extends Package {

	protected $pkgHandle = 'ticker';
	protected $appVersionRequired = '5.3.1';
	
	public function getPackageDescription() {
		return t('Provides templates for turning RSS Displayer and Pagelist blocks into an animated ticker.');
	}
	
	public function getPackageName() {
		return t('Ticker');
	}
	
	public function install() {
		parent::install();
	}

}

?>
