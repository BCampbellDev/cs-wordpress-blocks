<?php
/**
 * Plugin Name:     Cs Wordpress Blocks
 * Plugin URI:      PLUGIN SITE HERE
 * Description:     PLUGIN DESCRIPTION HERE
 * Author:          YOUR NAME HERE
 * Author URI:      YOUR SITE HERE
 * Text Domain:     cs-wordpress-blocks
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Cs_Wordpress_Blocks
 */

// Your code starts here.
add_action('init', function () {
    if ( file_exists(__DIR__ . '/dynamic-feed/build/dynamic-feed/block.json') ) {
        register_block_type(__DIR__ . '/dynamic-feed/build/dynamic-feed');
        return;
    }
});
