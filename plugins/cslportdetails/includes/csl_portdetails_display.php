<?php 
// The widget class
class CSL_Portdetails_Display extends WP_Widget {
	
	// Main constructor
	public function __construct() {

		parent::__construct(
				'cslportdetails',
				esc_html__( 'CSL Display Portfolios Details', 'text_domain' ),
				array(
						'customize_selective_refresh' => true,
						'description' => esc_html__( 'When a portfolio is selected, display the details in a table', 'text_domain' ),
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
		<div>
			<table class="uk-table uk-table-hover uk-table-small">
				<tbody>
					<tr class="el-item">
						<td class="uk-text-nowrap uk-table-shrink">
							<div class="el-title">Account Number</div>
						</td>
						<td>
							<div class="el-content"><input id="account-number" type="text" onkeydown="if (event.keyCode == 13) UserActionGetAccountDetails(this.value)"></div>
						</td>
					</tr>
					<tr class="el-item">
						<td class="uk-text-nowrap">
							<div class="el-title">Portfolio Name</div>
						</td>
						<td>
							<div class="el-content">
								<p id="display_PortfolioName">&nbsp;</p>
							</div>
						</td>
					</tr>
					<tr class="el-item">
						<td class="uk-text-nowrap">
							<div class="el-title">Number of accounts</div>
						</td>
						<td>
							<div class="el-content">
								<p id="display_AccountCount">&nbsp;</p>
							</div>
						</td>
					</tr>
					<tr class="el-item">
						<td class="uk-text-nowrap">
							<div class="el-title">Updated On</div>
						</td>
						<td>
							<div class="el-content">
								<p id="display_AsOfDate">&nbsp;</p>
							</div>
						</td>
					</tr>
					<tr class="el-item">
						<td class="uk-text-nowrap">
							<div class="el-title">Total Balance</div>
						</td>
						<td>
							<div class="el-content">
								<p id="display_TotalBalance">&nbsp;</p>
							</div>
						</td>
					</tr>
				</tbody>
			</table>



<!--
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
-->
		<script type="text/javascript">
			// listen for newMessage event
			document.addEventListener("PortfolioSelected", displaySelectedPortfolio, false);

			// newMessage event handler
			function displaySelectedPortfolio(e) {
				console.log("In displaySelectedPortfolio");
				console.log("\tEvent received is: ");
				console.dir(e);

				UserActionGetPortfolioDetails(e.detail.portfolio);
			}
		</script>
		<?php 		

		// WordPress core after_widget hook (always include )
		echo $after_widget;
	}
}

// Register the widget
function csl_portdetails_display_register_widget() {
	register_widget( 'CSL_Portdetails_Display' );
}

add_action( 'widgets_init', 'csl_portdetails_display_register_widget' );





