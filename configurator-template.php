<?php
/*
Template Name: Configurator Template
*/
get_header();
$page_id=get_queried_object_id();
$categories = get_terms(array(
    'taxonomy' => 'products_category', // Ensure this is your correct taxonomy name
    'hide_empty' => false, 
    'parent' => 0, // Fetches only top-level terms with no parent
));
?>
<style>
.module-layout{
    max-width:1050px;
}
.slot {
    width: 100px; /* Adjust width as needed */
    height: 216px; /* Adjust height as needed */
    border: 1px solid #ddd; /* Border style */
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
    line-height: 100px;
    font-size: 16px;
    cursor: pointer; /* Change cursor on hover */
}

.slot.image-type-2 {
    width: 200px; /* Adjust width for image type 2 */
}
.zero_width_slot{
    display:none;
}
</style>
<h1>Configurator Template</h1>

<!-- Parent Category Dropdown -->
<!-- Create a button for PDF download -->
<button id="generate-pdf-button">Download PDF</button>

<br><br><br><br><br>
<h4>Add Title</h4>
<form id="frame_title_main">
    <input type="text" name="title">
</form>
<!-- Select Frame -->
<h4>Select Frame</h4>
<?php
$frames = get_field('select_frame'); // Retrieve the repeater field data

if( $frames ) {
    echo '<form id="frame-selection-radio">'; // Start a form element
    $first_iteration = true; // Flag to track the first iteration
    foreach( $frames as $frame ) {
        $power = $frame['select_frame_power']; // Retrieve the value of the text field

        // Display radio option
        echo '<input type="radio" id="' . $power . '" name="select_frame_power" value="' . $power . '"';
        
        // Check if it's the first iteration and add the 'checked' attribute
        if($first_iteration) {
            echo ' checked';
            $first_iteration = false; // Reset the flag
        }
        
        echo '>';
        echo '<label for="' . $power . '">' . $power . '</label><br>';
    }
    echo '</form>'; // Close the form element
}
?>
<!-- Select Redundant Power Supply -->
<h4>Redundant Power Supply</h4>
<form id="redundant-power-supply-options">
    <input type="radio" id="yes" name="option" value="yes" checked>
    <label for="yes">Yes</label><br>
    <input type="radio" id="no" name="option" value="no">
    <label for="no">No</label><br>
</form>

<!-- Network Card -->
<h4>Network Card</h4>
<form id="network-card-options">
    <input type="radio" id="yes" name="second_option" value="Yes" checked>
    <label for="yes">Yes</label><br>
    <input type="radio" id="no" class="network-card-no-option" style="display:none;" name="second_option" value="No">
    <label for="no" class="network-card-no-option" style="display:none;">No</label><br>
    
    <!-- Checkbox for 'HPF-9000' selection -->
    <div id="network-card-checkbox-container" >
        <input type="checkbox" id="additional-info-checkbox">
        <label for="additional-info-checkbox">SNMP Support:</label>
        <input type="text" id="snmp-support-checkbox" name="snmp-support-checkbox" placeholder="IP Address" >
    </div>
</form>

<!-- Frame Support Bracket Kit -->
<h4>Frame Support Bracket Kit</h4>
<form id="frame-support-bracket-kit-options">
    <input type="radio" id="yes" name="option" value="yes" checked>
    <label for="yes">Yes</label><br>
    <input type="radio" id="no" name="option" value="no">
    <label for="no">No</label><br>
</form>
<br><br><br><br><br>

<br><br><br><br><br>
<!-- Container for Configurator images -->
<section class="configurator-images-all">
<div id="rear-module-first-image"></div>
<div id="rear-module-last-image">
<?php 
    $image = get_field('last_image', $page_id);
    $size = 'medium'; // (thumbnail, medium, large, full or custom size)
    if( $image ) {
        echo '<img src="'.$image.'" >';
    }else{
        echo 'no last image selectd for configurator';
    }
?>
</div>
</section>

<br><br><br><br><br>
<h4>Category</h4>
<?php
// Check if there are any terms returned
if (!empty($categories) && !is_wp_error($categories)) {
    echo '<ul id="parent-categories">'; // Start the unordered list
    foreach ($categories as $singlecategory) {
        // Create a list item for each term without including the post count
        echo '<li data-category-id="' . esc_attr($singlecategory->term_id) . '">' . esc_html($singlecategory->name) . '</li>';
    }
    echo '</ul>'; // End the unordered list
}
?>
<br><br><br><br><br>
<h4>Subcategory</h4>
<!-- Sub-Categories -->
<ul id="sub-categories">
<li>Please select a parent category first</li>
</ul>
<!-- Cards -->
<h4>Cards</h4>
<ul id="cards-list">
    <li>Please select a sub-category first</li>
</ul>
<!-- Rear Modules -->
<h4>Rear Modules</h4>
<ul id="rear-modules-list">
    <li>Please select a card first</li>
</ul>
<!-- Container for ACF images -->
<div id="rear-module-image">
</div>



<br><br><br><br><br>
<div id="rear-module-images" class="module-layout">
    <!-- Slot placeholders -->
    <?php for ($i = 1; $i <= 10; $i++) : ?>
        <div class="slot" data-slot="<?php echo $i; ?>"></div>
    <?php endfor; ?>
</div>
<br><br><br><br><br>
