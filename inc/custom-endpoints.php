<?php

function ddrc_theme_return_taxonomies($post_types) {

	$request = new WP_REST_Request('GET', '/wp/v2/types');
	$response = rest_do_request( $request );
	$server = rest_get_server();
	$taxes = $server->response_to_data( $response, false );

	$tax_array = [];
	$sort_order = ['Category', 'Donor'];

	foreach($post_types as $post_type) {
		$type = $taxes[$post_type];
		$type_tax = $type['taxonomies'];
		for ($x = 0; $x < sizeof($type_tax); $x++) {
			$tax = $type_tax[$x];
			if (!in_array($tax, $tax_array)) {
				$terms = post_type_get_terms(
					$tax, 
					['post_types' => $post_type]
				);
				$singular = get_object_taxonomies($post_type, 'object');
				$singular_name = $singular[$tax]->labels->singular_name;
				foreach($terms as $term) {
					$tax_array[$singular_name][$term->name]['tax_name'] = $term->name;
					$tax_array[$singular_name][$term->name]['tax_id'] = $term->term_id;
					$tax_array[$singular_name][$term->name]['tax_slug'] = $term->slug;
					$tax_array[$singular_name][$term->name]['taxonomy'] = $term->taxonomy;
					$tax_array[$singular_name][$term->name]['count'] = $term->count;
				}
				
			}
		}
	}

	$ordered_array = array_merge(array_flip($sort_order), $tax_array);

	return $ordered_array;
}


function ddrc_theme_build_post_tax_array($posts, $tax) {
	if (sizeof($tax) > 0) {
		$len = sizeof($tax);
		$post_array = [];
		$tax_array = [];

		foreach($posts as $post) {
			$id = $post->ID;
			
			$post->link = get_permalink($id);
			$post->post_excerpt = wp_trim_words($post->post_content, 25, '...');
			$post->taxonomies = [];
			$post_type = get_post_type($id);
			$post_label = get_post_type_object($post_type);
			$post_label = $post_label->labels->singular_name;
			$post->label = $post_label;
			$thumbnail = get_the_post_thumbnail_url($id, 'post-landscape') != false ? get_the_post_thumbnail_url($id, 'post-landscape') : get_the_post_thumbnail_url($id, 'thumbnail');
			$post->media_url = $thumbnail;
			$post_array['resources'][] = $post;
			
		}
		return $post_array;

	} else {
		return false;
	}
}

function ddrc_theme_return_resources() {
	$post_types = ['post'];

	$get = $_GET;
	$offset = isset($get['offset']) ? $get['offset'] : 0;
	$search = isset($get['search']) ? $get['search'] : false;
	$cats = isset($get['category']) ? explode(',', $get['category']) : false;
	$post_types = isset($get['post-type']) ? explode(',', $get['post-type']) : ['post'];
	$cont = isset($get['post_tag']) ? explode(',', $get['post_tag']) : false;

	$args = [
		'post_type' => $post_types,
		'post_status' => 'publish',
		'posts_per_page' => -1,
	];

	if ($cats) {
		$args['tax_query'][] =
			[
				'terms' => $cats,
				'field' => 'term_id',
				'taxonomy' => 'category',
			];
	}

	if ($cont) {
		$args['tax_query'][] =
			[
				'terms' => $cont,
				'field' => 'term_id',
				'taxonomy' => 'post_tag',
			];
	}

	if ($search) {
		$args['s'] = $search;
	}

	$query = new WP_Query($args);

	if ($query->have_posts()) {
		$result = $query->posts;

		$taxes = ddrc_theme_return_taxonomies($post_types);

		$resources = ddrc_theme_build_post_tax_array($result, $taxes);

		wp_reset_postdata();

		return [$resources, $taxes, 'empty' => false, $args];
	}  else {
		$empty  = '<div class="warning">There are no available resources matching your filters. Please try something else.</div>';
		$error = new stdClass();
		$error->message = $empty;
		return [$error ,$taxes, 'empty' => true, $args];
	}

}


add_action( 'rest_api_init', function () {
  register_rest_route( 'ddrc/v2', '/resources/', 
  	[
    	'methods' => 'GET',
    	'callback' => 'ddrc_theme_return_resources',
    	'permission_callback' => '__return_true'
  	] 
  );
 });


function ddrc_theme_return_projects($data, $post_types = 'tribe_events') {

	$get = $_GET;
	$post_a = $_POST;
	$cats = isset($get['category']) ? explode(',', $get['category']) : false;
	$cats = isset($post_a['category']) ? explode(',', $post_a['category']) : $cats;
	$donors = isset($get['donors']) ? explode(',', $get['donors']) : false;
	$donors = isset($post_a['donors']) ? explode(',', $post_a['donors']) : $donors;
	$post_id = isset($get['id']) ? $get['id'] : false;
	$post_id = isset($post_a['id']) ? $post_a['id'] : $post_id;
	$html = isset($get['html']) ? $get['html'] : false;
	$html = isset($post_a['html']) ? $post_a['html'] : $html;
	$offset = isset($get['offset']) ? $get['offset'] : 0;
	$offset = isset($post_a['offset']) ? $post_a['offset'] : $offset;
	$post_types = isset($get['post_types']) ? explode(',', $get['post_types']) : $post_types;
	$post_types = isset($post_a['post_types']) ? explode(',', $post_a['post_types']) : $post_types;
	$posts_per_page = isset($get['ppp']) ? $get['ppp'] : 1;
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
		'offset'=> $offset,
		'ignore_sticky_posts' => true,
		'ppp' => $posts_per_page,
		'order' => 'DESC',
		'orderby' => 'date',
	];


	if ($post_types == 'tribe_events') {
		$args['meta_query'] = [
			'relation' => 'OR',
			[
				'key' => '_EventStartDate',
			],
		];
	}

	if ($cats != false) {
		$args['cat'] = $cats;
	}

	if ($donors) {
		$args['tax_query'][] =
			[
				'terms' => $donors,
				'field' => 'term_id',
				'taxonomy' => 'donors',
			];
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
  register_rest_route( 'ddrc/v2', '/events/', 
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
  register_rest_route( 'ddrc/v2', '/posts/', 
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
		// $terms = $cats == true ? ddrc_theme_posts_topics_list($id, 'category') : ddrc_theme_posts_post_type($id);
		$terms = $cats == true ? ddrc_theme_posts_topics_list($id, 'category') : false;
		$thumbnail = get_the_post_thumbnail_url($id, 'post-landscape') != false ? get_the_post_thumbnail_url($id, 'post-landscape') : get_the_post_thumbnail_url($id, 'thumbnail');

		if ($thumbnail == false || $thumbnail == '') {
			$thumbnail .= get_template_directory_uri() .  '/img/coming-soon.gif';
		}

		$html = '<div class="resource-card">';
			$html .= '<div class="resource-extra">';
				$html .= '<a href="' . $permalink . '">';
				$html .= '<div class="cont-wrap">';
				if ($thumbnail != '' && $image == true) {
					$html .= '<div class="image-cont">';
							$html .= '<img class="resource-img" src="' . $thumbnail . '" />';
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

function post_type_get_terms( $taxonomies, $args=array() ){
    //Parse $args in case its a query string.
    $args = wp_parse_args($args);

    if( !empty($args['post_types']) ){
        $args['post_types'] = (array) $args['post_types'];
        add_filter( 'terms_clauses','wpse_filter_terms_by_cpt',10,3);

        
    } // endif post_types set

    return get_terms($taxonomies, $args);           
}


function wpse_filter_terms_by_cpt( $pieces, $tax, $args){
    global $wpdb;

    // Don't use db count
    $pieces['fields'] .=", COUNT(*) " ;

    //Join extra tables to restrict by post type.
    $pieces['join'] .=" INNER JOIN $wpdb->term_relationships AS r ON r.term_taxonomy_id = tt.term_taxonomy_id 
                                INNER JOIN $wpdb->posts AS p ON p.ID = r.object_id ";

    // Restrict by post type and Group by term_id for COUNTing.
    $post_types_str = implode(',',$args['post_types']);
    $pieces['where'].= $wpdb->prepare(" AND p.post_type IN(%s) GROUP BY t.term_id", $post_types_str);

    remove_filter( current_filter(), __FUNCTION__ );
    return $pieces;
 }