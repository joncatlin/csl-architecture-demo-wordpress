<?php 
// The widget class
class CSL_Reminders extends WP_Widget {
	
	// Main constructor
	public function __construct() {

		parent::__construct(
				'cslreminders',
				esc_html__( 'CSL Reminders', 'text_domain' ),
				array(
						'customize_selective_refresh' => true,
						'description' => esc_html__( 'Set reminder and alert frequency, as well as other options.', 'text_domain' ),
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
			<p>Set reminders and alerts here.</p>
		</div>
		<?php 		

		// WordPress core after_widget hook (always include )
		echo $after_widget;
	}
}

// Register the widget
function cslreminders_register_widget() {
	register_widget( 'CSL_Reminders' );
}

add_action( 'widgets_init', 'cslreminders_register_widget' );





