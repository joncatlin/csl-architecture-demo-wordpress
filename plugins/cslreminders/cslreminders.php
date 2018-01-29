<?php
/*
Plugin Name:  CSL Reminders and Alerts
Plugin URI:   https://concordservicing.com
Description:  Set reminders and alert methods.
Version:      0.0.1
Author:       Jon Catlin
Author URI:   https://concordservicing.com
License:      
License URI:  
Text Domain:  concordservicing
Domain Path:  /languages
*/

require_once plugin_dir_path( __FILE__ ) . 'includes/csl_reminders.php';

function cslreminders_install() {
	echo '<p>in Install</p>';
}

function cslreminders_uninstall() {
	echo '<p>in Uninstall</p>';
}

register_activation_hook( __FILE__, 'cslreminders_install' );
register_deactivation_hook( __FILE__, 'cslreminders_uninstall');



