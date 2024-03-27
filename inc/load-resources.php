<?php
/***
 * Setting up the configurator files for configurator-template.php
 */
function enqueue_configurator_script() {
    if (is_page('configurator')) {
    wp_enqueue_script('configurator-jquery', get_stylesheet_directory_uri() . '/js/configurator.js');
    wp_localize_script('configurator-jquery', 'ajax_object', array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ));
    wp_enqueue_script('jquery-ui', 'https://code.jquery.com/ui/1.12.1/jquery-ui.js');
    }
}
add_action('wp_enqueue_scripts', 'enqueue_configurator_script');
function enqueue_configurator_css() {
    if (is_page('configurator')) {
        wp_enqueue_style('configurator-css', get_stylesheet_directory_uri() . '/css/configurator.css');
    }else if (is_page('configuration-sales')) {
        wp_enqueue_style('configurator-sales-css', get_stylesheet_directory_uri() . '/css/request-quotation.css');
    }
}
add_action('wp_enqueue_scripts', 'enqueue_configurator_css');