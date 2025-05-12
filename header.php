<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package providence
 */

if (function_exists('get_field')) {
    	$company_settings = [
    	    'name'          => get_field('business_name', 'options'),
    	    'phone'         => get_field('business_phone', 'options'),
    	    'street'        => get_field('business_street', 'options'),
    	    'city'          => get_field('business_city', 'options'),
    	    'zip'           => get_field('business_zip', 'options'),
    	    'state'         => get_field('business_state', 'options'),
    	    'icons'         => get_field('icons', 'options'),
    	];
    
	}
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'DDRC' ); ?></a>

	<header id="masthead" class="site-header">
		<div class="secondary-nav">
			<div class="wrapper">
				<nav class="secondary-navigation">
					<?php
						echo do_shortcode('[gtranslate]');
					?>
					<?php
						wp_nav_menu(
							array(
								'theme_location' => 'menu-2',
								'menu_id'        => 'SecondaryCont',
								'menu_class'	 => 'nav-menu',
							)
						);
					?>
				</nav>
			</div>
		</div>
		<div class="main-content-nav">
		<div class="wrapper main-wrapper">
			<div class="site-branding">
				<?php
					the_custom_logo();
				?>
				<?php
					if ( is_front_page() && is_home() ) :
						?>
						<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
						<?php
					else :
						?>
						<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
						<?php
					endif;
				?>
			</div><!-- .site-branding -->

			<nav id="site-navigation" class="main-navigation">
				<?php

					wp_nav_menu(
						array(
							'theme_location' => 'menu-1',
							'menu_id'        => 'primary-menu',
							'menu_class'	 => 'nav-menu',
							'walker' => new DDRC_Menu_Walker()
						)
					);
				
				?>
				<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'DDRC' ); ?></button>
			</nav><!-- #site-navigation -->

			<div class="search-navigation">
				<div class="wrapper">
					<?php echo do_shortcode('[base_search_shortcode]'); ?>
					<button class="search-toggle">Search</button>
				</div>
			</div>

		</div><!-- .wrapper -->
		</div>
	</header><!-- #masthead -->