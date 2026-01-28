<?php
/**
 * Plugin Name: Coedwig Creations Integration
 * Description: Embeds the Coedwig Creations static site into WordPress via a shortcode.
 * Version: 1.0.0
 * Author: Ashley
 */

// Prevent direct access.
if (!defined('ABSPATH')) {
    exit;
}

// Register shortcode.
function coedwig_render_project()
{
    // Load the HTML template.
    $html = file_get_contents(plugin_dir_path(__FILE__) . 'templates/index.html');
    return $html;
}
add_shortcode('coedwig_project', 'coedwig_render_project');

// Enqueue assets.
function coedwig_enqueue_assets()
{
    wp_enqueue_style('coedwig-style', plugins_url('assets/style.css', __FILE__), array(), '1.0');
    wp_enqueue_script('coedwig-script', plugins_url('assets/script.js', __FILE__), array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'coedwig_enqueue_assets');
?>