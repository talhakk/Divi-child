<?php
// Function to add both the main menu page and options page
function add_configurator_menu_pages() {
    // Add the main menu page
    add_menu_page(
        __( 'Configurator', 'textdomain' ), // Page title
        __( 'Configurator', 'textdomain' ), // Menu title
        'manage_options', // Capability required to access this menu page
        'frame-configurator-admin', // Menu slug
        'admin_configurator_page', // Function to display the page content
        'dashicons-admin-tools', // Icon
        80 // Position in the menu
    );

}
add_action( 'admin_menu', 'add_configurator_menu_pages' );

// Function to include the main menu page content from a separate file
function admin_configurator_page() {
    include_once( get_stylesheet_directory() . '/templates/admin-menu-pages/admin-configurator-page.php' );
}

function add_configurator_options_page() {
    acf_add_options_page(array(
        'page_title' => 'Configurator Settings',
        'menu_title' => 'Configurator Settings',
        'menu_slug' => 'frame-configurator-settings',
        'capability' => 'manage_options',
        'parent_slug' => 'frame-configurator-admin', // Parent slug, if you want it to be a submenu item
        'position' => 10, // Position in the menu
        'icon_url' => 'dashicons-admin-settings', // Icon
        'redirect' => false // Whether to redirect to the first child page automatically
    ));
}
add_action('acf/init', 'add_configurator_options_page');
