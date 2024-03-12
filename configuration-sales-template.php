<?php
/*
Template Name: Configuration Sales
*/

// Start session
session_start();

// Retrieve $_SESSION['pdf_url'] and assign it to a PHP variable
$pdf_url = isset($_SESSION['configuration_pdf_url']) ? $_SESSION['configuration_pdf_url'] : '';

// Get the value of pdf_filename from the query string
$pdf_filename = isset($_GET['pdf_filename']) ? $_GET['pdf_filename'] : '';
get_header();

// Example usage of $pdf_url
if (!empty($pdf_url)) {
    echo '<a href="' . $pdf_url . '">View PDF</a>';
}
?>
<!-- Include the $pdf_filename value in the contact form -->
<input type="hidden" name="pdf_filename" value="<?php echo esc_attr($pdf_filename); ?>">
<!-- Include the $pdf_url value in the contact form -->
<input type="hidden" name="pdf_url" value="<?php echo esc_attr($pdf_url); ?>">
<br><br>

<?php
echo do_shortcode('[contact-form-7 id="1e42160" title="Contact form 1"]');
get_footer();