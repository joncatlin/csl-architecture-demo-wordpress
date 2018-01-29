<?php 
// The widget class
class CSL_Payment extends WP_Widget {
	
	// Main constructor
	public function __construct() {

		parent::__construct(
				'cslpayment',
				esc_html__( 'CSL Make A Payment', 'text_domain' ),
				array(
						'customize_selective_refresh' => true,
						'description' => esc_html__( 'Allow a user to make a payment.', 'text_domain' ),
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
		?>		
		<div style="height: 200px;">
			<p>Make a payment widget here</p>
		</div>
		<?php 		

		// WordPress core after_widget hook (always include )
		echo $after_widget;
	}
}

// Register the widget
function cslpayment_register_widget() {
	register_widget( 'CSL_Payment' );
}

add_action( 'widgets_init', 'cslpayment_register_widget' );





