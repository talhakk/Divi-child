<?php
// Load Theme Resources
require_once get_stylesheet_directory().'/inc/load-resources.php';

// register pages/post types
require_once get_stylesheet_directory().'/inc/register-pages.php';

// Load Theme General Settings
require_once get_stylesheet_directory().'/inc/theme-settings.php';

// Configurator Functions
include get_stylesheet_directory().'/inc/configurator-functions.php';
