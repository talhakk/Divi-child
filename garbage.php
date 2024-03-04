
<!-- Display images array in pdftemplate-->
<ul>

<?php foreach ($pdf_data['rearModules'] as $rear_module): ?>
    <li><?php echo $rear_module; ?></li>
<?php endforeach; ?>
</ul>
<ul>
<?php foreach ($pdf_data['images'] as $image_url): ?>
<?php
// Convert image URL to local file path
$image_path = str_replace(site_url(), ABSPATH, $image_url);
// Check if the file exists
if (file_exists($image_path)) {
    // If the file exists, add it to PDF
    $image_content = file_get_contents($image_path);
    $image_data = base64_encode($image_content);
    $image_type = pathinfo($image_path, PATHINFO_EXTENSION);
    $image_data_uri = 'data:image/' . $image_type . ';base64,' . $image_data;
    echo '<img width="100%" height="auto" src="' . $image_data_uri . '" alt="Image">';
} else {
    // If the file does not exist, display a message
    echo '<p>Image not found: ' . $image_url . '</p>';
}
?>
<?php endforeach;?>
<!-- Static Image -->
</ul>

<?php
/*
// Define the path to the image file
//$localimage_url = get_stylesheet_directory_uri() . '/assets/test.jpg';
$image_url=$pdf_data['lastimage'];
$image_path = str_replace(site_url(), ABSPATH, $image_url);
// Read the image content
$image_content = file_get_contents($image_path);;
// Encode the image content
$image_data = base64_encode($image_content);

// Get the image MIME type
$image_type = pathinfo($image_path, PATHINFO_EXTENSION);
$image_data_uri = 'data:image/' . $image_type . ';base64,' . $image_data;
echo '<img width="100%" height="auto" src="' . $image_data_uri . '" alt="Image">';
*/
?>