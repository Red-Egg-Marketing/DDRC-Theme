<?php

function base_build_search() {

	wp_enqueue_script( 'site-search' );

	$html = '<div class="shortcode-wrap">';
	$html .= get_search_form(['echo' => false]);
	$html .= '</div>';

	return $html;
}

add_shortcode( 'base_search_shortcode', 'base_build_search' );


function get_post_type_json($atts = ['limit' => -1, 'featured' => false, 'category' => false, 'search' => false]) {
	global $post;
	$search_array = [];

	$args = [
		'post_type'         => ['page', 'post'],
        'posts_per_page'    => -1,
        'post_status'       => 'publish'
	];

	$query =  new WP_Query( $args );

	$taxes_array = [];

	if ($query->have_posts()) {
		while($query->have_posts()){
			// Needs
			$query->the_post();
			$search = new class{};
			$id = get_the_ID();
        	// $search->image_count = $attachments->post_count;   
			$search->id = $id;
			$search->post_title = get_the_title();
			$search->content = wp_strip_all_tags(get_the_content());
			$search->link = get_the_permalink();
			$search_array[] = $search;
		}
		wp_reset_postdata();
	}

	return [$search_array, $taxes_array];
}
