<?php
// This file is generated. Do not modify it manually.
return array(
	'dynamic-feed' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'cs/dynamic-feed',
		'version' => '0.1.0',
		'title' => 'Dynamic Feed',
		'category' => 'widgets',
		'icon' => 'rss',
		'keywords' => array(
			'feed',
			'posts',
			'query',
			'category',
			'taxonomy'
		),
		'description' => 'Display a dynamic feed of posts filtered by taxonomy terms, with SSR preview in the editor.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'postType' => array(
				'type' => 'string',
				'default' => 'post'
			),
			'taxonomy' => array(
				'type' => 'string',
				'default' => 'category'
			),
			'termIds' => array(
				'type' => 'array',
				'items' => array(
					'type' => 'number'
				),
				'default' => array(
					
				)
			),
			'orderBy' => array(
				'type' => 'string',
				'default' => 'date'
			),
			'order' => array(
				'type' => 'string',
				'default' => 'desc'
			),
			'limit' => array(
				'type' => 'number',
				'default' => 6
			),
			'showImage' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showExcerpt' => array(
				'type' => 'boolean',
				'default' => true
			),
			'excerptLength' => array(
				'type' => 'number',
				'default' => 24
			),
			'showMeta' => array(
				'type' => 'boolean',
				'default' => true
			),
			'viewStyle' => array(
				'type' => 'string',
				'default' => 'list'
			),
			'refreshKey' => array(
				'type' => 'number',
				'default' => 0
			)
		),
		'textdomain' => 'cs-wordpress-blocks',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	)
);
