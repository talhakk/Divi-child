<?php
/*
Template Name: Configuration Sales
*/

// Start session
session_start();

// Retrieve $_SESSION['configuration_pdf_url'] and assign it to a PHP variable
$pdf_urls = isset($_SESSION['configuration_pdf_urls']) ? $_SESSION['configuration_pdf_urls'] : '';
$pdf_filenames = isset($_SESSION['configuration_pdf_time_filenames']) ? $_SESSION['configuration_pdf_time_filenames'] : '';

get_header();

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
                       
    <table id="request_quotation_pdf_urls_table">
    <thead>
        <tr>
            <th>PDF Timestamp</th>
            <th>View</th>
            <th>Download</th>
        </tr>
    </thead>
    <tbody>
    <?php
            // Reverse the display order of $pdf_urls
            $pdf_urls = array_reverse($pdf_urls);

            // Loop through the reversed array
            foreach ($pdf_urls as $pdf_url):
                // Extract filename from the URL
                $filename = basename($pdf_url);
                // Extract timestamp from filename
                $timestamp = substr($filename, 0, strpos($filename, '_'));
                // Append time part (00:00:00) to the timestamp
                $timestamp_with_time = $timestamp . '_000000';
                // Convert timestamp to date
                $date = DateTime::createFromFormat('Ymd_His', $timestamp_with_time);
                // Check if date creation was successful
                if ($date !== false) {
                    // Format the date to display only date without time
                    $formatted_date = $date->format('Y-m-d');
                } else {
                    $formatted_date = 'Invalid Date';
                }
            ?>
            <tr>
                <td><?php echo $formatted_date; ?></td>
                <td><a href="<?php echo $pdf_url; ?>" target="_blank">View</a></td>
                <td><a href="<?php echo $pdf_url; ?>" download>Download</a></td>
            </tr>
            <?php endforeach; ?>
    </tbody>
</table>
                     
<script>
 
 document.addEventListener("DOMContentLoaded", function() {
    // Encode the pdfUrl array as JSON
    var pdfUrlJSON = <?php echo json_encode($pdf_filenames); ?>;
    
    // Get the hidden field element
    var submittedPdfUrlsField = document.getElementById('submittedpdfurls');
    
    // Set the value of the hidden field to the JSON-encoded pdfUrl array
    submittedPdfUrlsField.value = pdfUrlJSON;

});

</script>
<?php
get_footer();
