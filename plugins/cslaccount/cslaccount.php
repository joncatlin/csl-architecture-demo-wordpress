<?php
/*
Plugin Name:  CSL Account Display
Plugin URI:   https://concordservicing.com
Description:  Display accounts owned by a user.
Version:      0.0.1
Author:       Jon Catlin
Author URI:   https://concordservicing.com
License:      
License URI:  
Text Domain:  concordservicing
Domain Path:  /languages
*/

require_once plugin_dir_path( __FILE__ ) . 'includes/csl_account_display.php';

function cslaccount_install() {
	echo '<p>in Install</p>';
}

function cslaccount_uninstall() {
	echo '<p>in Uninstall</p>';
}

register_activation_hook( __FILE__, 'cslaccount_install' );
register_deactivation_hook( __FILE__, 'cslaccount_uninstall');



