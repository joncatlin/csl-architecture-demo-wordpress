<?php
/*
Plugin Name:  CSL Portfolio Display
Plugin URI:   https://concordservicing.com
Description:  Display available portfolios for a given user
Version:      0.0.1
Author:       Jon Catlin
Author URI:   https://concordservicing.com
License:      
License URI:  
Text Domain:  concordservicing
Domain Path:  /languages
*/

require_once plugin_dir_path( __FILE__ ) . 'includes/csl_portfolios_display.php';

function cslportfolios_install() {
	echo '<p>in Install</p>';
}

function cslportfolios_uninstall() {
	echo '<p>in Uninstall</p>';
}

register_activation_hook( __FILE__, 'cslportfolios_install' );
register_deactivation_hook( __FILE__, 'cslportfolios_uninstall');



