<?php 
// The widget class
class CSL_Account_Display extends WP_Widget {
	
	// Main constructor
	public function __construct() {

		parent::__construct(
				'cslaccount',
				esc_html__( 'CSL Display Accounts', 'text_domain' ),
				array(
						'customize_selective_refresh' => true,
						'description' => esc_html__( 'Display the set of accounts a user has. Allows them to see details associated with each account.', 'text_domain' ),
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
		<div style="height: 100px;">
			<p>Account Display widget here</p>
		</div>
		<?php 		

		// WordPress core after_widget hook (always include )
		echo $after_widget;
	}
}

// Register the widget
function csl_account_display_register_widget() {
	register_widget( 'CSL_Account_Display' );
}

add_action( 'widgets_init', 'csl_account_display_register_widget' );





