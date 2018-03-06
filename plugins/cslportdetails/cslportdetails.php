<?php
/*
Plugin Name:  CSL Portfolio Detail Display
Plugin URI:   https://concordservicing.com
Description:  Display the details of a selected portfolio
Version:      0.0.1
Author:       Jon Catlin
Author URI:   https://concordservicing.com
License:      
License URI:  
Text Domain:  concordservicing
Domain Path:  /languages
*/

require_once plugin_dir_path( __FILE__ ) . 'includes/csl_portdetails_display.php';

function cslportdetails_install() {
	echo '<p>in Install</p>';
}

function cslportdetails_uninstall() {
	echo '<p>in Uninstall</p>';
}

register_activation_hook( __FILE__, 'cslportdetails_install' );
register_deactivation_hook( __FILE__, 'cslportdetails_uninstall');



