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
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'providence' ); ?></a>

	<header id="masthead" class="site-header">
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
						)
					);
				
				?>
				<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'providence' ); ?></button>

				<div class="hide-away-menu">
					<div class="wrapper">
					<div class="sub-col">
						<h3>Featured Insight</h3>
						<?php 
							ddrc_theme_featured_post();
						?>
					</div>
					<div class="sub-col">
						<div class="nav-wrap">
						<?php
							wp_nav_menu(
								array(
									'theme_location' => 'menu-2',
									'menu_id'        => 'secondary-menu',
								)
							);
						?>
						
						</div>
					</div>
					<aside class="sub-col">
						<div class="nav-wrap">
						<?php

							wp_nav_menu(
								array(
									'theme_location' => 'menu-3',
									'menu_id'        => 'secondary-aside-menu',
								)
							);
							
						?>
						<ul class="social">
						<?php
							if (is_array($company_settings['icons']) && sizeof($company_settings['icons']) > 0) {
                            	foreach($company_settings['icons'] as $icon) {
                            	    $src = $icon['social']['link'];
                            	    $class = $icon['social']['icon_class'];
                            	    ?>
                            	        <li><a href="<?= $src; ?>" class="fa-brands fa-<?= $class; ?>" target="_blank"></a></li>
                            	    <?php
                            	}
                        	}
						?>
						</ul>
						<address>
							<p>
                            <?= $company_settings['street']; ?><br />
                            <?= $company_settings['city']; ?>, <?= $company_settings['state']; ?> <?= $company_settings['zip']; ?>
						</address>
						<p class="phone">
							<a href="tel:<?= $company_settings['phone']; ?>"><?= $company_settings['phone']; ?></a>
						</p>
						</div>
					</aside>
					</div>
				</div>

			</nav><!-- #site-navigation -->

		</div><!-- .wrapper -->
		</div>
	</header><!-- #masthead -->