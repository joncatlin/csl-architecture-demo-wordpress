<?php
/*
Plugin Name:  CSL Make A Payment
Plugin URI:   https://concordservicing.com
Description:  Allow a user to make a payment
Version:      0.0.1
Author:       Jon Catlin
Author URI:   https://concordservicing.com
License:      
License URI:  
Text Domain:  concordservicing
Domain Path:  /languages
*/

require_once plugin_dir_path( __FILE__ ) . 'includes/csl_payment.php';

function cslpayment_install() {
	echo '<p>in Install</p>';
}

function cslpayment_uninstall() {
	echo '<p>in Uninstall</p>';
}

register_activation_hook( __FILE__, 'cslpayment_install' );
register_deactivation_hook( __FILE__, 'cslpayment_uninstall');



