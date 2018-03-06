<?php 
// The widget class
class CSL_Portfolios_Display extends WP_Widget {
	
	// Main constructor
	public function __construct() {

		parent::__construct(
				'cslportfolios',
				esc_html__( 'CSL Display Portfolios', 'text_domain' ),
				array(
						'customize_selective_refresh' => true,
						'description' => esc_html__( 'Display the set of portfolios a user has access to, using a dropdown list', 'text_domain' ),
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
		<div>
			<select name="portfolio_selector" id="display_portfolioSelector" style="font-family: PT Serif;
					font-size: 16px;
					font-weight: 400;
					line-height: 1.625;
					color: #6c6d74;"
					onchange="if (this.selectedIndex) TriggerPortfolioSelected(this);"
					>
				<option value="None" selected="Selected">Select Portfolio</option>
			</select>
	    </div>

		<script type="text/javascript">
			// This script must go after the definition of the elements
			UserActionGetPortfolios();

			// listen for newMessage event
			document.addEventListener("PortfolioSelected", newMessageHandler, false);

			// newMessage event handler
			function newMessageHandler(e) {
				console.log("In newMessageHandler");
			}
		</script>
		<?php 		

		// WordPress core after_widget hook (always include )
		echo $after_widget;
	}
}

// Register the widget
function csl_portfolios_display_register_widget() {
	register_widget( 'CSL_Portfolios_Display' );
}

add_action( 'widgets_init', 'csl_portfolios_display_register_widget' );





