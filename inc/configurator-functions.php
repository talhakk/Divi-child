<?php
//handle ajax requests from configurator.js
add_action('wp_ajax_get_subcategories', 'get_subcategories_callback');
add_action('wp_ajax_nopriv_get_subcategories', 'get_subcategories_callback');

function get_subcategories_callback() {
    // Get the parent category ID from the AJAX request
    $parent_id = isset($_POST['parent_id']) ? intval($_POST['parent_id']) : 0;

    // Fetch sub-categories based on the parent category ID
    $subcategories = get_terms(array(
        'taxonomy' => 'products_category', // Your taxonomy name
        'hide_empty' => false,
        'parent' => $parent_id,
    ));

    // Prepare the sub-categories data
    $subcategories_data = array();
    if (!empty($subcategories) && !is_wp_error($subcategories)) {
        foreach ($subcategories as $subcategory) {
            $subcategories_data[] = array(
                'id' => $subcategory->term_id,
                'name' => $subcategory->name,
            );
        }
        // Send success response
        wp_send_json_success($subcategories_data);
    } else {
        // Send failure response
        wp_send_json_error('No subcategories found.');
    }
}
//handle ajax requests from configurator.js
add_action('wp_ajax_get_cards', 'get_cards_callback');
add_action('wp_ajax_nopriv_get_cards', 'get_cards_callback');

function get_cards_callback(){
    // Get the sub category ID from the AJAX request
    $sub_id = isset($_POST['sub_id']) ? intval($_POST['sub_id']) : 0;

    // Define args for WP_Query to fetch products based on the sub-category
    $args = array(
        'post_type' => 'products', // Your custom post type name
        'posts_per_page' => -1, // -1 to retrieve all posts
        'tax_query' => array(
            array(
                'taxonomy' => 'products_category', // Your taxonomy name
                'field' => 'id',
                'terms' => $sub_id,
            ),
        ),
    );

    // Query posts
    $products_query = new WP_Query($args);

    // Prepare the response data
    $products_data = array();
    if ($products_query->have_posts()) {
        while ($products_query->have_posts()) {
            $products_query->the_post();
            // Get post title and ID
            $product_id = get_the_ID();
            $product_title = get_the_title();
            $product_secondary_name= get_field('product_secondary_name');
            // Append to response data
            $products_data[] = array(
                'id' => $product_id,
                'name' => $product_title,
                'secondary_name'=>$product_secondary_name
            );
        }
        // Send success response
        wp_send_json_success($products_data);
    } else {
        // Send failure response
        wp_send_json_error('No products found for the selected sub-category.');
   
    }
}
//handle ajax requests from configurator.js
add_action('wp_ajax_get_rear_modules', 'get_rear_modules_callback');
add_action('wp_ajax_nopriv_get_rear_modules', 'get_rear_modules_callback');

function get_rear_modules_callback(){
    // Get the card ID from the AJAX request
    $card_id = isset($_POST['card_id']) ? intval($_POST['card_id']) : 0;

    // Check if the card ID is valid
    if ($card_id) {
        // Query the 'products' post type to get the selected rear modules
        $args = array(
            'post_type' => 'products',
            'posts_per_page' => 1,
            'p' => $card_id // Specific post ID
        );

        $product_query = new WP_Query($args);

        if ($product_query->have_posts()) {
            while ($product_query->have_posts()) {
                $product_query->the_post();

                // Get the selected rear modules from the ACF field 'select_rear_modules'
                $selected_rear_modules = get_field('select_rear_modules');
                
                // Initialize an array to store rear modules data
                $rear_modules_data = array();

                if ($selected_rear_modules) {
                    foreach ($selected_rear_modules as $rear_module) {
                        // Get the title of the rear module post
                        $rear_module_title = get_the_title($rear_module->ID);
                        
                        // Add the rear module data to the array
                        $rear_modules_data[] = array(
                            'id' => $rear_module->ID,
                            'name' => $rear_module_title
                        );
                    }
                    
                    // Send success response with rear modules data
                    wp_send_json_success($rear_modules_data);
                } else {
                    // Send failure response if no rear modules are found for the selected product
                    wp_send_json_error('No rear modules found for the selected product.');
                }
            }
            wp_reset_postdata(); // Restore global post data
        } else {
            // Send failure response if the product is not found
            wp_send_json_error('Product not found.');
        }
    } else {
        // Send failure response for invalid card ID
        wp_send_json_error('Invalid product ID.');
    }
}
// Display Rear Module Images
add_action('wp_ajax_get_rear_module_image', 'get_rear_module_image_callback');
add_action('wp_ajax_nopriv_get_rear_module_image', 'get_rear_module_image_callback');

function get_rear_module_image_callback() {
    // Get the rear module ID from the AJAX request
    $rear_module_id = isset($_POST['rear_module_id']) ? intval($_POST['rear_module_id']) : 0;

    $rear_module_image = get_field('rear_module_configurator_image',$rear_module_id);
    $power_watt=get_field('power_output',$rear_module_id);

    // Get the selected rear-io post ID from the rear-module post
    $rear_io_post_id = get_field('rear_io2', $rear_module_id);

    // Initialize rear_io_width variable
    $rear_io_width = '';

    // If rear_io_post_id is found
    if ($rear_io_post_id) {
        // Get the value of the 'rear_io_width' field from the selected rear-io post
        $rear_io_width = get_field('rear_io_width', $rear_io_post_id);
    }
        
        // Query for Feature Options Post Object
        $args = array(
            'post_type'      => 'products',
            'posts_per_page' => -1, // Retrieve all posts
            'meta_query'     => array(
                array(
                    'key'     => 'select_rear_modules', // Your ACF field key for selecting rear modules
                    'value'   => $rear_module_id, // ID of the specific rear-module post
                    'compare' => 'LIKE', // Check if the value is in the array of selected rear modules
                ),
            ),
        );

        $query = new WP_Query($args);

        // Array to store selected options for each product
        $selected_option_titles = array();

        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                // Get the selected options from the 'options_post_object' field
                $options = get_field('options_post_object');

                if ($options) {
                    // Iterate over the selected options and extract their titles
                    foreach ($options as $option) {
                        $selected_option_titles[] = $option->post_title;
                    }
                }
                
            }
            wp_reset_postdata();
        }

        // Prepare the data to be sent in the success response
        $response_data = array(
            'image'           => $rear_module_image, 
            'power_watt'      => $power_watt,
            'selected_options'=> $selected_option_titles,  
            'rear_io_width'   => $rear_io_width
        );
            if($rear_module_image){
                wp_send_json_success($response_data);
            }else{
                wp_send_json_error('No images');
            }
            
        }
/**
 * 
 * Generating PDF
 * 
 */
// Handle AJAX request to generate PDF
add_action('wp_ajax_generate_pdf', 'generate_pdf_callback');
add_action('wp_ajax_nopriv_generate_pdf', 'generate_pdf_callback');

function generate_pdf_callback() {
    // Start session
    manage_pdf_urls_session();
    // Get PDF data from AJAX request
    $pdf_data = isset($_POST['pdfData']) ? $_POST['pdfData'] : '';

    // Include Dompdf library
    require_once get_stylesheet_directory() . '/vendor/autoload.php';

    if ($pdf_data) {
        // Load PDF template file
        ob_start();
        include_once(get_stylesheet_directory() . '/templates/pdf-template.php');
        $html = ob_get_clean();   
        // Generate PDF
        $dompdf = new Dompdf\Dompdf();
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'landscape');
        $dompdf->render();

        // Get the PDF content
        $pdf_content = $dompdf->output();

            // Set the PDF filename
            //$pdf_filename = 'document.pdf';
            $pdf_filename = date('Ymd_His') . '.pdf';
            // Define the directory within the theme where the PDF file is located
            $pdf_subdirectory = 'submissions/';

            // Get the absolute server path and URL of the PDF file within the theme directory
            $pdf_server_path =  get_stylesheet_directory() . '/' . $pdf_subdirectory . $pdf_filename;
            $pdf_url = get_stylesheet_directory_uri() . '/'. $pdf_subdirectory. $pdf_filename;

            // Save $pdf_url in session
            // Retrieve existing PDF URLs array from session or initialize an empty array if it doesn't exist
            $pdf_urls = isset($_SESSION['configuration_pdf_urls']) ? $_SESSION['configuration_pdf_urls'] : array();
            $pdf_timestamp_filenames = isset($_SESSION['configuration_pdf_time_filenames']) ? $_SESSION['configuration_pdf_time_filenames'] : array();


            // Add the new PDF URL to the array
            $pdf_urls[] = $pdf_url;
            $pdf_timestamp_filenames[]= $pdf_filename;

            // Save the updated PDF URLs array back to the session
            $_SESSION['configuration_pdf_urls'] = $pdf_urls;
            $_SESSION['configuration_pdf_time_filenames'] = $pdf_timestamp_filenames;

            // Prepare the data to be sent in the success response
            $pdf_response_data = array(
                'pdf_url'           => $pdf_url, 
                'pdf_filename' => $pdf_filename
                
            );
            // If PDF file doesn't exist, create it or append to it
            if (!file_put_contents($pdf_server_path, $pdf_content, FILE_APPEND)) {
                // Handle error if failed to save or append to PDF file
                wp_send_json_error('Failed to save or append to PDF file.');
            } else {
                // If PDF content is successfully saved or appended, send success response
                wp_send_json_success($pdf_response_data);
            }
     } else {
         // Error handling if PDF data is not provided
         wp_send_json_error('PDF data not provided.');
     } 
 }//generate_pdf ends

 // Define Session for Storing Configurator PDFs
 function manage_pdf_urls_session() {
    // Start or resume the session
    session_start();

    // Set the initial session lifetime if not already set
    if (!isset($_SESSION['pdf_urls_session_start_time'])) {
        $_SESSION['pdf_urls_session_start_time'] = time();
        // Set initial session lifetime to 24 hours
        $_SESSION['pdf_urls_session_lifetime'] = 86400; // 24 hours in seconds
    }

    // Calculate time elapsed since the session started
    $time_elapsed = time() - $_SESSION['pdf_urls_session_start_time'];

    // Check if more than 24 hours have elapsed since the session started
    if ($time_elapsed >= $_SESSION['pdf_urls_session_lifetime']) {
        // If more than 24 hours have elapsed, reset the session start time
        $_SESSION['pdf_urls_session_start_time'] = time();
        // Extend session lifetime by another 24 hours
        $_SESSION['pdf_urls_session_lifetime'] += 86400; // Add 24 hours in seconds
    }
}




/**
 * 
 * Single PDF Deletion 
 * 
 */
add_action('wp_ajax_delete_pdf_file', 'delete_pdf_file_callback');
function delete_pdf_file_callback() {
    if (isset($_POST['pdf_file']) && wp_verify_nonce($_POST['_wpnonce'], 'delete_pdf_nonce')) {
        $pdf_file_to_delete = $_POST['pdf_file'];

        if (file_exists($pdf_file_to_delete)) {
            $directory = get_stylesheet_directory() . '/submissions/';

            if (wp_delete_file_from_directory($pdf_file_to_delete, $directory)) {
                // File deletion was successful
                wp_send_json_success('PDF file deleted successfully.');
            } else {
                // File deletion failed
                wp_send_json_error('Failed to delete PDF file.');
            }
        } else {
            // File does not exist
            wp_send_json_error('Failed to delete PDF file. Invalid file path.');
        }
    } else {
        // Invalid request
        wp_send_json_error('Invalid request.');
    }
}
/**
 * Delete All PDF Files
 * 
 */
add_action('wp_ajax_delete_all_pdf_files', 'delete_all_pdf_files_callback');
function delete_all_pdf_files_callback() {
    if (isset($_POST['_wpnonce']) && wp_verify_nonce($_POST['_wpnonce'], 'delete_all_pdf_nonce')) {
        $pdf_directory = get_stylesheet_directory() . '/submissions/';
        $pdf_files = glob($pdf_directory . '*.pdf');

        foreach ($pdf_files as $pdf_file) {
            if (!wp_delete_file_from_directory($pdf_file, $pdf_directory)) {
                wp_send_json_error('Failed to delete PDF files.');
                return;
            }
        }

        wp_send_json_success('All PDF files deleted successfully.');
    } else {
        wp_send_json_error('Invalid request.');
    }
}
