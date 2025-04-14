<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package red_egg
 */
if (function_exists('get_field')) {
    $company_settings = [
        'name'          => get_field('business_name', 'options'),
        'email'         => get_field('business_email', 'options'),
        'phone'         => get_field('business_phone', 'options'),
        'street'        => get_field('business_street', 'options'),
        'city'          => get_field('business_city', 'options'),
        'zip'           => get_field('business_zip', 'options'),
        'state'         => get_field('business_state', 'options'),
        'icons'         => get_field('icons', 'options'),
        'form'          => get_field('menu_form', 'options'),
        'disclaimer'    => get_field('disclaimer', 'options'),
        'privacy'       => get_field('privacy', 'options'),
    ];
        
?>

    <footer id="colophon" class="site-footer">
        <div class="site-info">
            <div class="wrapper">
                <div class="col">
                    <address>
                        <p>
                            <?= $company_settings['name']; ?><br />
                            <a href="tel:<?= $company_settings['phone']; ?>" class="contact-link"><?= $company_settings['phone'] ?></a>
                            <a href="mailto:<?= $company_settings['email']; ?>" class="contact-link"><?= $company_settings['email'] ?></a><br />
                        </p>
                    </address>
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
                </div>
                <div class="col">
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" class="footer-home"><?php bloginfo( 'name' ); ?></a>    
                </div>
                <div class="col">
                     <?php echo do_shortcode('[gravityform id="' . $company_settings['form'] . '" title="true" description="false" ajax="true"]'); ?>
                </div>
                
            </div>
            
        </div><!-- .site-info -->
         <div class="footer-copyright">
                <p>&copy; <?= date('Y'); ?> <?= $company_settings['name']; ?> | <a href="<?= $company_settings['privacy']; ?>">Privacy Policy</a> | <a href="<?= $company_settings['disclaimer']; ?>">Disclaimer</a> | Web Design by <a href="https://redeggmarketing.com/" target="_blank">Red Egg Marketing</a></p>
        </div>
    </footer><!-- #colophon -->
</div><!-- #page -->

<?php 

} // end if
wp_footer(); 

?>

</body>
</html>
