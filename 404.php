<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package providence
 */

get_header();
?>

	<main id="primary" class="site-main entry-content">

		<section class="error-404 not-found">
			<div class="wp-block-red-egg-blocks-hero hero" id="" data-scrolled="2">
				<div class="block-wrapper">
					<div class="hero__inner">
						<div class="content-wrap">
							<div class="hero-block-content">
								<div class="hero-block-wrap">
									<h1 class="header-title">You Seem Lost</h1>
									<p>Maybe try a search?</p>
									<?php
										get_search_form();
									?>
								</div>
							</div>
						</div>
						
					</div>
				</div>
				<div class="hero-block-image">
					<div class="hero-block-image-wrap">								
					</div>
				</div>
			</div>
		</section><!-- .error-404 -->

	</main><!-- #main -->

<?php
get_footer();
