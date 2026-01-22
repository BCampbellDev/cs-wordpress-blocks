<?php
/**
 * Dynamic Feed block render.
 *
 * This file is referenced by block.json via:
 *   "render": "file:./render.php"
 *
 * When WordPress renders the block (frontend + editor SSR preview),
 * it includes this file and expects it to return a string.
 */

// Attributes (with safe defaults as a fallback).
$post_type      = isset($attributes['postType']) ? sanitize_key($attributes['postType']) : 'post';
$taxonomy       = isset($attributes['taxonomy']) ? sanitize_key($attributes['taxonomy']) : 'category';
$term_ids = isset($attributes['termIds']) && is_array($attributes['termIds'])
	? array_values(array_unique(array_filter(array_map('intval', $attributes['termIds']))))
	: [];
sort($term_ids);

$order_by       = isset($attributes['orderBy']) ? sanitize_key($attributes['orderBy']) : 'date';
$order          = (isset($attributes['order']) && strtolower($attributes['order']) === 'asc') ? 'ASC' : 'DESC';
$limit          = isset($attributes['limit']) ? max(1, min(20, intval($attributes['limit']))) : 6;

$show_image     = !empty($attributes['showImage']);
$show_excerpt   = !empty($attributes['showExcerpt']);
$excerpt_length = isset($attributes['excerptLength']) ? max(5, min(80, intval($attributes['excerptLength']))) : 24;
$show_meta      = !empty($attributes['showMeta']);

$view_style     = isset($attributes['viewStyle']) ? sanitize_key($attributes['viewStyle']) : 'list';

$refresh_key = isset($attributes['refreshKey']) ? intval($attributes['refreshKey']) : 0;

// Basic safety check.
if ( ! post_type_exists( $post_type ) ) {
	return '<div class="cs-dynamic-feed cs-dynamic-feed--error">Invalid post type.</div>';
}

// Build cache key (short TTL for dev; we can improve invalidation later).
$cache_key = 'cs_df_' . md5( wp_json_encode([
	'pt' => $post_type,
	'tx' => $taxonomy,
	't'  => $term_ids,
	'ob' => $order_by,
	'o'  => $order,
	'l'  => $limit,
	'si' => $show_image,
	'se' => $show_excerpt,
	'el' => $excerpt_length,
	'sm' => $show_meta,
	'vs' => $view_style,
	'rk' => $refresh_key
]) );

$is_rest  = defined('REST_REQUEST') && REST_REQUEST;
$is_admin = is_admin();
$use_cache = ! $is_rest && ! $is_admin;

if ( $use_cache ) {
	$cached = get_transient( $cache_key );
	if ( false !== $cached && $cached !== '' ) {
		echo $cached;
		return;
	}
}

$args = [
	'post_type'           => $post_type,
	'posts_per_page'      => $limit,
	'orderby'             => $order_by,
	'order'               => $order,
	'post_status'         => 'publish',
	'ignore_sticky_posts' => true,
	'no_found_rows'       => true,
];

if ( $term_ids && taxonomy_exists( $taxonomy ) ) {
	$args['tax_query'] = [
		[
			'taxonomy' => $taxonomy,
			'field'    => 'term_id',
			'terms'    => $term_ids,
		],
	];
}

$q = new WP_Query( $args );

if ( ! $q->have_posts() ) {
	$html = '<div class="cs-dynamic-feed cs-dynamic-feed--empty">No results found.</div>';
	set_transient( $cache_key, $html, 60 );
	echo $html;
	return;
}

ob_start();
?>
<div class="cs-dynamic-feed cs-dynamic-feed--<?php echo esc_attr($view_style); ?>">
	<ul class="cs-dynamic-feed__list">
		<?php while ( $q->have_posts() ) : $q->the_post(); ?>
			<li class="cs-dynamic-feed__item">
				<?php if ( $show_image && has_post_thumbnail() ) : ?>
					<a class="cs-dynamic-feed__thumb" href="<?php the_permalink(); ?>">
						<?php the_post_thumbnail('thumbnail'); ?>
					</a>
				<?php endif; ?>

				<div class="cs-dynamic-feed__body">
					<a class="cs-dynamic-feed__title" href="<?php the_permalink(); ?>">
						<?php the_title(); ?>
					</a>

					<?php if ( $show_meta ) : ?>
						<div class="cs-dynamic-feed__meta">
							<span class="cs-dynamic-feed__date"><?php echo esc_html( get_the_date() ); ?></span>
							<span class="cs-dynamic-feed__author"><?php echo esc_html( get_the_author() ); ?></span>
						</div>
					<?php endif; ?>

					<?php if ( $show_excerpt ) : ?>
						<div class="cs-dynamic-feed__excerpt">
							<?php echo esc_html( wp_trim_words( get_the_excerpt(), $excerpt_length ) ); ?>
						</div>
					<?php endif; ?>
				</div>
			</li>
		<?php endwhile; wp_reset_postdata(); ?>
	</ul>
</div>
<?php
$html = ob_get_clean();

// Cache for 60 seconds (dev-friendly). We'll improve invalidation later.
if ( $use_cache && $html !== '' ) {
	set_transient( $cache_key, $html, 60 );
}

echo $html;
return;
