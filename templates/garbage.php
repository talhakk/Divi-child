<div class="wrap">
    <h1><?php echo esc_html__('Frame Configurator Submissions', 'textdomain'); ?></h1>

    <?php
    // Get list of PDF files
    $pdf_files = glob(get_stylesheet_directory() . '/submissions/*.pdf');

    if ($pdf_files) :
    ?>

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

    <div id="pdf-delete-message"></div>

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
                        $('#pdf-delete-message').html('<div class="notice notice-success"><p>' + response.data + '</p></div>');
                        $form.closest('tr').remove();
                    } else {
                        // AJAX error callback
                        $('#pdf-delete-message').html('<div class="notice notice-error"><p>' + response.data + '</p></div>');
                    }
                }).fail(function(xhr, status, error) {
                    // Handle AJAX request failure
                    console.log('Failed to delete PDF:', error);
                });
            });
        });
    </script>
</div>
