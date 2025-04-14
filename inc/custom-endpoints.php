<?php

function ddrc_theme_return_taxonomies($post_types) {

	$request = new WP_REST_Request('GET', '/wp/v2/types');
	$response = rest_do_request( $request );
	$server = rest_get_server();
	$taxes = $server->response_to_data( $response, false );
	$tax_array = [];

	foreach($post_types as $post_type) {
		$type = $taxes[$post_type];
		$type_tax = $type['taxonomies'];
		for ($x = 0; $x < sizeof($type_tax); $x++) {
			$tax = $type_tax[$x];
			if (!in_array($tax, $tax_array)) {
				$tax_array[] = $tax;
			}
		}
	}

	sort($tax_array);

	return $tax_array;
}


function ddrc_theme_build_post_tax_array($posts, $tax) {
	if (sizeof($tax) > 0) {
		$len = sizeof($tax);
		$post_array = [];
		$tax_array = [];

		foreach($posts as $post) {
			$id = $post->ID;
			
			$post->link = get_permalink($id);
			$post->post_excerpt = wp_trim_words($post->post_excerpt, 25, '...');
			$post->taxonomies = [];
			$post_type = get_post_type($id);
			$post_label = get_post_type_object($post_type);
			$post_label = $post_label->labels->singular_name;
			$post->label = $post_label;
			if ($post_label == 'Whitepaper' ) {
				$thumbnail = get_the_post_thumbnail_url($id, 'whitepaper-poster') != false ? get_the_post_thumbnail_url($id, 'whitepaper-poster') : get_the_post_thumbnail_url($id, 'thumbnail');
			} else {
				$thumbnail = get_the_post_thumbnail_url($id, 'post-landscape') != false ? get_the_post_thumbnail_url($id, 'post-landscape') : get_the_post_thumbnail_url($id, 'thumbnail');
			}
			$post->media_url = $thumbnail;

			for ($x = 0; $x < $len; $x++) {
				$c_tax = $tax[$x];
				$post_taxes = get_the_terms($id, $c_tax);
				
				if (!empty($post_taxes)) {

					$singular = get_object_taxonomies($post_type, 'object');
					$sing_label = $singular[$c_tax]->labels->singular_name;

					foreach($post_taxes as $post_tax) {
						$term_id = $post_tax->term_id;
						$term_slug = $post_tax->slug;
						$term_tax = $post_tax->taxonomy;
						$term_name = $post_tax->name;
						$tax_array[$sing_label][$term_name]['tax_name'] = $term_name;
						$tax_array[$sing_label][$term_name]['tax_id'] = $term_id;
						$tax_array[$sing_label][$term_name]['tax_slug'] = $term_slug;
						$tax_array[$sing_label][$term_name]['taxonomy'] = $term_tax;
						$post->taxonomies[$sing_label][] = [
							'term_name' => $term_name,
							'term_id' => $term_id,
							'taxonomy' => $term_tax
						];
					}
				}

			}

			$post_array['resources'][] = $post;
			
		}
		return [$post_array, $tax_array];

	} else {
		return false;
	}
}


function ddrc_theme_return_resources() {
	$post_types = ['post', 'case-studies', 'videos'];

	$offset = isset($get['offset']) ? $get['offset'] : 0;

	$args = [
		'post_type' => $post_types,
		'post_status' => 'publish',
		'posts_per_page' => -1,
	];

	$query = new WP_Query($args);

	if ($query->have_posts()) {
		$result = $query->posts;

		$taxes = ddrc_theme_return_taxonomies($post_types);

		$resources = ddrc_theme_build_post_tax_array($result, $taxes);

		wp_reset_postdata();

		return $resources;
	}

}


add_action( 'rest_api_init', function () {
  register_rest_route( 'providence/v2', '/resources/', 
  	[
    	'methods' => 'GET',
    	'callback' => 'ddrc_theme_return_resources',
    	'permission_callback' => '__return_true'
  	] 
  );
 });


function ddrc_theme_return_projects($data, $post_types = 'projects') {

	$get = $_GET;
	$post_a = $_POST;
	$cats = isset($get['category']) ? explode(',', $get['category']) : false;
	$cats = isset($post_a['category']) ? explode(',', $post_a['category']) : $cats;
	$post_id = isset($get['id']) ? $get['id'] : false;
	$post_id = isset($post_a['id']) ? $post_a['id'] : $post_id;
	$html = isset($get['html']) ? $get['html'] : false;
	$html = isset($post_a['html']) ? $post_a['html'] : $html;
	$offset = isset($get['offset']) ? $get['offset'] : 0;
	$offset = isset($post_a['offset']) ? $post_a['offset'] : $offset;
	$post_types = isset($get['post_types']) ? explode(',', $get['post_types']) : $post_types;
	$posts_per_page = isset($get['ppp']) ? $get['ppp'] : 6;
	$posts_per_page = isset($post_a['ppp']) ? $post_a['ppp'] : $posts_per_page;
	$stacked = isset($get['stacked']) ? $get['stacked'] : false;
	$stacked = isset($post_a['stacked']) ? $post_a['stacked'] : $stacked;
	$excerpt = isset($get['excerpt']) ? filter_var($get['excerpt'], FILTER_VALIDATE_BOOLEAN) : true;
	$excerpt = isset($post_a['excerpt']) ? filter_var($post_a['excerpt'], FILTER_VALIDATE_BOOLEAN) : $excerpt;
	$read_more = isset($get['read_more']) ? $get['read_more'] : 'View Project';
	$read_more = isset($post_a['read_more']) ? $post_a['read_more'] : $read_more;
		
	$args = [
		'post_type' => $post_types,
		'post_status' => 'publish',
		'posts_per_page' => $posts_per_page,
		'offset'	=> $offset
	];

	if ($cats != false) {
		$args['cat'] = $cats;
	}

	if($post_id != false) {
		$args['p'] = $post_id;
	}

	$posts = $html == false ? [] : '';
	$query = new WP_Query($args);
	$x = 0;

	if ($query->have_posts()) {
		while($query->have_posts()) {
			$query->the_post();
			$id = get_the_ID();
			if ($html == false) {
				$post = $query->post;
				$postObj = new stdClass;
				$postObj->ID = $id;
				$postObj->title = $post->post_title;
				$postObj->excerpt = wp_trim_words($post->post_content, 25, '...');
				$postObj->link = get_the_permalink($id);
				$post_type = get_post_type_object($post_types);
				$postObj->label = $post_type->labels->singular_name;
				$thumbnail = get_the_post_thumbnail_url($id, 'post-landscape') != false ? get_the_post_thumbnail_url($id, 'post-landscape') : get_the_post_thumbnail_url($id, 'thumbnail');
				$postObj->featured_image = $thumbnail;
				$posts[] = $postObj;
			} elseif($html == true && $html != 'cards') {
				
				$posts .= ddrc_theme_case_study_stat_block($id);
				
			} elseif($html == 'cards') {
				$image = ($stacked == true && $x >= $posts_per_page - 2) ? false : true; 
				$posts .= ($stacked == true && $x == $posts_per_page - 2) ? '<div class="resource-col">' : '';
				$posts .= ddrc_theme_resource_card($id, false, $read_more, $image, $excerpt);
				$posts .= ($stacked == true && $x == $posts_per_page - 1) ? '</div>' : '';
			}
			$x++;
		}

		wp_reset_postdata();

	}
	return $posts;
}

add_action( 'rest_api_init', function () {
  register_rest_route( 'providence/v2', '/projects/', 
  	[
    	'methods' => 'GET, POST',
    	'callback' => 'ddrc_theme_return_projects',
    	'permission_callback' => '__return_true'
  	] 
  );
 });

function ddrc_theme_case_study_stat_block($id) {
	if ($id != null) {
		$content = get_the_content($id);
		$blocks = parse_blocks($content);
		$html = '';
		foreach($blocks as $key => $block) {
			$name = $block['blockName'];

			if ($name == 'ddrc-theme-blocks/case-study') {
				$inner_html = render_block($block);
				$html = $inner_html;
				break;
			}
		}

		return $html;

	}
}


function ddrc_theme_return_posts($data) {

	$get = $_GET;
	$post_types = [];
	$cats = isset($get['category']) ? explode(',', $get['category']) : false;
	$tags = isset($get['tag']) ? $get['tag'] : false;
	$html = isset($get['html']) ? $get['html'] : false;
	$author = isset($get['author']) ? $get['author'] : false;
	$offset = isset($get['offset']) ? $get['offset'] : 0;
	$custom_tax = isset($get['custom_tax']) ? explode(',', $get['custom_tax']) : false;
	$tax_type = isset($get['tax_name']) ? $get['tax_name'] : false;
	$posts_per_page = isset($get['ppp']) ? $get['ppp'] : 21;
	if ($cats != false || $tags != false || $author != false) {
		$post_types[] = 'post';
	}

	$args = [
		'post_type' => $post_types,
		'post_status' => 'publish',
		'posts_per_page' => $posts_per_page,
		'offset'	=> $offset
	];

	if ($cats != false) {
		$args['cat'] = $cats;
	}

	if ($tags != false) {
		$args['tag_id'] = $tags;
	}

	if ($author != false) {
		$args['author'] = $author;
	}

	if ($custom_tax != false && $tax_type != false) {
		$args['tax_query'] = [
			'relation' => 'AND',
			[
				'taxonomy' => $tax_type,
				'field' => 'term_id',
				'terms' => $custom_tax
			]
		];
	}

	$posts = $html == false ? [] : '';
	$query = new WP_Query($args);

	if ($query->have_posts()) {
		while($query->have_posts()) {
			$query->the_post();
			$id = get_the_ID();
			if ($html == false) {
				$post = $query->post;
				$postObj = new stdClass;
				$postObj->ID = $id;
				$postObj->title = $post->post_title;
				$postObj->excerpt = wp_trim_words($post->post_content, 25, '...');
				$postObj->link = get_the_permalink($id);
				$thumbnail = get_the_post_thumbnail_url($id, 'post-landscape') != false ? get_the_post_thumbnail_url($id, 'post-landscape') : get_the_post_thumbnail_url($id, 'thumbnail');
				$postObj->featured_image = $thumbnail;
				$posts[] = $postObj;
			} elseif($html == true) {
				$posts .= ddrc_theme_resource_card($id);
			}
		}

		wp_reset_postdata();

	}
	return $posts;
}



add_action( 'rest_api_init', function () {
  register_rest_route( 'providence/v2', '/posts/', 
  	[
    	'methods' => 'GET',
    	'callback' => 'ddrc_theme_return_posts',
    	'permission_callback' => '__return_true'
  	] 
  );
 });

function ddrc_theme_resource_card($id, $cats = true, $read = 'Read More', $image = true, $exc = true) {
	if ($id != null) {
		$permalink = get_the_permalink($id);
		$title = get_the_title($id);
		$excerpt = get_the_excerpt($id);
		$terms = $cats == true ? ddrc_theme_posts_topics_list($id, 'category') : ddrc_theme_posts_post_type($id);
		$thumbnail = get_the_post_thumbnail_url($id, 'post-landscape') != false ? get_the_post_thumbnail_url($id, 'post-landscape') : get_the_post_thumbnail_url($id, 'thumbnail');

		$html = '<div class="resource-card">';
			$html .= '<div class="resource-extra">';
				$html .= '<a href="' . $permalink . '">';
				$html .= '<div class="cont-wrap">';
				if ($thumbnail != '' && $image == true) {
					$html .= '<div class="image-cont">';
						$html .= '<picture>';
							$html .= '<source type="image/webp" srcset="' . $thumbnail . '.webp">';
							$html .= '<img class="resource-img" src="' . $thumbnail . '" />';
						$html .= '</picture>';
					$html .= '</div>';
				}
					$html .= '<div class="content">';
						$html .= $terms;
						$html .= '<h3 class="resource-title">' . $title . '</h3>';
						$html .= $exc == true ? '<p class="resource-excerpt">' . $excerpt . '</p>' : '';
						$html .= '<button class="wp-button is-style-blue-arrow">' . $read . '</button>'; 
					$html .= '</div>';
				$html .= '</div>';
				$html .= '</a>';
			$html .= '</div>';
		$html .= '</div>';

		return $html;
	}
}