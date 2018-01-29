<?php
/*
Plugin Name:  CSL Service Message
Plugin URI:   https://concordservicing.com
Description:  Display service messages to users.
Version:      0.0.1
Author:       Jon Catlin
Author URI:   https://concordservicing.com
License:      
License URI:  
Text Domain:  concordservicing
Domain Path:  /languages
*/

require_once plugin_dir_path( __FILE__ ) . 'includes/csl_message.php';

function cslmsg_install() {
	echo '<p>in Install</p>';
}

function cslmsg_uninstall() {
	echo '<p>in Uninstall</p>';
}

register_activation_hook( __FILE__, 'cslmsg_install' );
register_deactivation_hook( __FILE__, 'cslmsg_uninstall');



