<?php 
// The widget class
class CSL_Message extends WP_Widget {
	
	// Main constructor
	public function __construct() {

		parent::__construct(
				'cslmsg',
				esc_html__( 'CSL Service Message Display', 'text_domain' ),
				array(
						'customize_selective_refresh' => true,
						'description' => esc_html__( 'Display Concord service messages to users.', 'text_domain' ),
				)
		);
	}
	
	
	// The widget form (for the backend )
	public function form( $instance ) {
		/* ... */
	}
	
	// Update widget settings
	public function update( $new_instance, $old_instance ) {
		/* ... */
	}
	
	// Display the widget
	public function widget( $args, $instance ) {
		extract( $args );

		// WordPress core before_widget hook (always include )
		echo $before_widget;
		
		// Display the output from the widget
		//<div class="widget-text wp_widget_plugin_box">
		
		?>		
		<p class="cslmsg" id="cslmsg-message">Default Message</p>
		<script>
			var counter = 1;
			var messages = ["Welcome to Concord message widget. This widget displays a series of messages that could come from any source.", 
				"Please be aware that our system is undergoing maintenance at 8pm this evening.",
				"Did you know that Concord's new TrueBI service is due for launch in early 2018. Check out this new service at <a>www.concordservicing.com/TrueBI</a>"];
			document.getElementById("cslmsg-message").innerHTML = messages[0];
			
			var x = setInterval(function() {
				document.getElementById("cslmsg-message").innerHTML = messages[counter % messages.length];
				counter++;
			}, 7000);
		</script>
		<?php 		

		// WordPress core after_widget hook (always include )
		echo $after_widget;
	}
}

// Register the widget
function cslmsg_register_widget() {
	register_widget( 'CSL_Message' );
}

add_action( 'widgets_init', 'cslmsg_register_widget' );





