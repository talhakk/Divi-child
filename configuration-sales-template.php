<?php
/*
Template Name: Configuration Sales
*/

// Start session
session_start();

// Retrieve $_SESSION['configuration_pdf_url'] and assign it to a PHP variable
$pdf_url = isset($_SESSION['configuration_pdf_url']) ? $_SESSION['configuration_pdf_url'] : '';

get_header();

// PDF Buttons
if (!empty($pdf_url)) {
    echo '<a href="' . $pdf_url . '" target="_blank">View PDF</a>';
    echo '<a href="' . $pdf_url . '" download>Download PDF</a>';
}
?>
<section class="quote-wrapper">
        <div class="container">
            <div class="content-inner">
                <?php
                        // Start the WordPress loop
                        while (have_posts()) :
                            the_post();

                            // Display the page content
                            the_content();

                        endwhile; // End of the loop.

                        ?>

            </div>
        </div>
    </section>
                  
                       
                       
<script>
 document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the value of pdf_url from the PHP variable
    var pdfUrl = <?php echo json_encode($pdf_url); ?>;
    console.log('PDF URL Is: ' + pdfUrl);


    // Select all buttons with class name 'extra_pdf_buttons'
    var pdfbuttons = document.querySelectorAll('.extra_pdf_buttons');

    // Check if pdfUrl is not empty
    if (pdfUrl && pdfbuttons) {
        // Loop through each button
        pdfbuttons.forEach(function(button) {
            // Replace the href value with pdfUrl
            button.href = pdfUrl;
        });
    } else {
        console.log('Buttons does not exist, PDF Url is: ' + pdfUrl);
    }
});
</script>
<?php
get_footer();
