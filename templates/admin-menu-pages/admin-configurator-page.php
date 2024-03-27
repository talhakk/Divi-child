<div class="wrap">
    <h1><?php echo esc_html__('Frame Configurator Submissions', 'textdomain'); ?></h1>

    <?php
    // Get list of PDF files
    $pdf_files = glob(get_stylesheet_directory() . '/submissions/*.pdf');

    if ($pdf_files) :
    ?>

    <button id="delete-all-pdf-button" class="button button-primary" style="margin:20px 0;"><?php esc_html_e('Delete All PDF Files', 'textdomain'); ?></button>
<br>
<div id="pdf-delete-message"></div>
    <table class="wp-list-table widefat fixed striped">
        <thead>
            <tr>
                <th><?php esc_html_e('File Name', 'textdomain'); ?></th>
                <th><?php esc_html_e('Action', 'textdomain'); ?></th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($pdf_files as $pdf_file) : ?>
            <tr>
                <td><?php echo esc_html(basename($pdf_file)); ?></td>
                <td>
                    <form class="delete-pdf-form" data-pdf-file="<?php echo esc_attr($pdf_file); ?>">
                        <?php wp_nonce_field('delete_pdf_nonce', '_wpnonce'); ?>
                        <button type="button" class="button button-primary delete-pdf-button"><?php esc_html_e('Delete', 'textdomain'); ?></button>
                    </form>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <?php else : ?>
    <p><?php esc_html_e('No PDF files found.', 'textdomain'); ?></p>
    <?php endif; ?>

  

    <script>
        jQuery(document).ready(function ($) {
            $('.delete-pdf-button').on('click', function (e) {
                e.preventDefault();
                var $form = $(this).closest('form');
                var pdfFile = $form.data('pdf-file');

                // Define the 'data' object before the AJAX request
                var data = {
                    pdf_file: pdfFile,
                    action: 'delete_pdf_file',
                    _wpnonce: $form.find('[name="_wpnonce"]').val()
                };

                $.post(ajaxurl, data, function(response) {
                    if (response.success) {
                        // AJAX success callback
                        $form.closest('tr').remove();      
                        $('#pdf-delete-message').html('<div class="notice notice-success"><p>' + response.data + '</p></div>');             
                        
                    } else {
                        // AJAX error callback
                        $('#pdf-delete-message').html('<div class="notice notice-error"><p>' + response.data + '</p></div>');
                    }
                }).fail(function(xhr, status, error) {
                    // Handle AJAX request failure
                    console.log('Failed to delete PDF:', error);
                });
            });

            $('#delete-all-pdf-button').on('click', function (e) {
                e.preventDefault();

                var data = {
                    action: 'delete_all_pdf_files',
                    _wpnonce: '<?php echo wp_create_nonce('delete_all_pdf_nonce'); ?>'
                };

                $.post(ajaxurl, data, function(response) {
                    if (response.success) {
                        // AJAX success callback
                        $('#pdf-delete-message').html('<div class="notice notice-success"><p>' + response.data + '</p></div>');
                        location.reload(); // Refresh the page after deleting all files
                    } else {
                        // AJAX error callback
                        $('#pdf-delete-message').html('<div class="notice notice-error"><p>' + response.data + '</p></div>');
                    }
                }).fail(function(xhr, status, error) {
                    // Handle AJAX request failure
                    console.log('Failed to delete all PDF files:', error);
                });
            });
        });
    </script>
</div>
<script>
jQuery(document).ready(function ($) {
    // Function to get URL parameter by name
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Get the value of pdf_urls parameter from the URL
    var pdfUrlsParam = getUrlParameter('pdf_urls');

    // Convert the comma-separated string to an array
    var pdfUrlsArray = pdfUrlsParam.split(',');

    // Loop through table rows and highlight those matching filenames
    $('tbody tr').each(function () {
        var filename = $(this).find('td:first-child').text().trim(); // Get filename from the first cell of each row
        if (pdfUrlsArray.includes(filename)) {
            $(this).addClass('highlighted'); // Apply CSS class to highlight matching rows
        }
    });
});

</script>
<style>
.highlighted{
    background-color:yellow!important;
}</style>