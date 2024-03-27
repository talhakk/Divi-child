<?php
/*
Template Name: Configurator Template two
*/
    get_header();
    $page_id=get_queried_object_id();
    $categories = get_terms(array(
        'taxonomy' => 'products_category', // Ensure this is your correct taxonomy name
        'hide_empty' => false, 
        'parent' => 0, // Fetches only top-level terms with no parent
    ));
    // Get Configurator Select Frame Repeater from Options Page
    $frames = get_field('select_frame', 'option');     
    // Snmp checkbox value ACF
    $snmpValue = get_field('snmp_support_text', 'option'); 
?>
<body>
    <div class="configurator-container">
        <div class="frame-wrapper">
            <div class="inner-content">
                <div class="add-title">
                    <h2 class="heading">
                        Add Title
                    </h2>
                    <input id="frame_title_main" type="text" name="title" class="text-input" placeholder="e.g My First Frame">
                </div>

                <div class="settings-wrapper">
                <div class="setting select-frame">
                        <h2 class="heading">Select Frame</h2>
                        <?php
                        if ($frames) {
                            echo '<form id="frame-selection-radio" class="content">'; // Start a form element
                            $first_iteration = true; // Flag to track the first iteration
                            foreach ($frames as $frame) {
                                // Retrieve the values of ACF fields
                                $frameName = $frame['select_frame_name'];
                                $power = $frame['frame_power'];
                                $secondaryName = $frame['secondary_name'];
                                $framePower = $frameName . ' (' . $power.')';
                        ?>
                                <div class="check-wrapper">
                                    <div class="radio-wrapper">
                                        <?php
                                        // Display radio option
                                        // Check if it's the first iteration and add checked attribute accordingly
                                        $checked = $first_iteration ? 'checked' : '';
                                        echo '<input type="radio" class="radio" id="' . $framePower . '" name="select_frame_name" value="' . $framePower . '" ' . $checked . '>';
                                        echo '<label for="' . $framePower . '"><strong>' . $framePower . '</strong>-' . $secondaryName . '</label>';
                                        ?>
                                    </div>
                                </div>
                        <?php
                                $first_iteration = false; // Set to false after the first iteration
                            }
                            echo '</form>'; // Close the form element
                        }
                        ?>
                    </div>

                    <div class="setting power-supply">
                        <h2 class="heading">Redundant Power Supply</h2>
                        <div class="content">
                            <div class="check-wrapper yes-no-checks">
                            <form id="redundant-power-supply-options" class="radio-wrapper">
                                <input type="radio" id="yes" name="option" value="yes" checked>
                                <label for="yes">Yes</label><br>
                                <input type="radio" id="no" name="option" value="no">
                                <label for="no">No</label><br>
                            </form>
                                
                            </div>
                           
                        </div>
                    </div>
                    <div class="setting network-card">
                        <h2 class="heading">Network Card</h2>
                        <div class="content">
                            <div class="check-wrapper yes-no-checks">
                            <form id="network-card-options">
                            <div class="radio-wrapper">
                                <input type="radio" id="yes" class="radio" name="second_option" value="Yes" checked>
                                <label for="yes">Yes</label>
                                <div class="divider"></div>
                                <input type="radio" id="no" class="network-card-no-option radio" style="display:none;" name="second_option" value="No">
                                <label for="no" class="network-card-no-option" style="display:none;">No</label>
                                </div>
                                <!-- Checkbox for 'HPF-9000' selection -->
                                <div id="network-card-checkbox-container" >
                                    <input type="checkbox" id="additional-info-checkbox" data-value="<?php echo $snmpValue; ?>">
                                    <label for="additional-info-checkbox">SNMP Support:</label><br>
                                    <input type="text" id="snmp-support-ip" class="text-input" name="snmp-support-checkbox" placeholder="IP Address" >
                                </div>
                            </form>
                                
                        </div>
                    </div>
                    </div>
                    <div class="setting bracket-kit">
                        <h2 class="heading">Frame Support Bracket Kit</h2>
                        <div class="content">
                            <div class="check-wrapper yes-no-checks">
                                <form id="frame-support-bracket-kit-options" class="radio-wrapper">
                                    <input type="radio" id="yes" name="option" value="yes" checked>
                                    <label for="yes">Yes</label><br>
                                    <input type="radio" id="no" name="option" value="no">
                                    <label for="no">No</label>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="module-section">
                    <div class="module-wrapper" id="rear-module-images">
                        <div class="module-structure static">
                            <img id="redundant-power-yes" src="<?php echo get_stylesheet_directory_uri().'/assets/img/config_powersupplies-redundant.png';?>" alt="" >
                            <img id="redundant-power-no" style="display:none;" src="<?php echo get_stylesheet_directory_uri().'/assets/img/conf_powersupplies-noredundant.png';?>" alt="" >
                        </div>
                        <div class="slot module-structure" data-slot="1"></div>
                        <div class="slot module-structure" data-slot="2"></div>
                        <div class="slot module-structure" data-slot="3"></div>
                        <div class="slot module-structure" data-slot="4"></div>
                        <div class="slot module-structure" data-slot="5"></div>
                        <div class="slot module-structure" data-slot="6"></div>
                        <div class="slot module-structure" data-slot="7"></div>
                        <div class="slot module-structure" data-slot="8"></div>
                        <div class="slot module-structure" data-slot="9"></div>
                        <div class="slot module-structure" data-slot="10"></div>
                        <div class="module-structure static">
                            <img src="<?php echo get_stylesheet_directory_uri().'/assets/img/config_powersupplies-main.png';?>" alt="">
                        </div>
                    </div>
                    <div class="watts"><span >0</span>/340W</div>
                </div>
                <div class="module-section" style="display:none;">
                    <div class="module-wrapper" id="rear-module-images">
                        <div class="module-structure static">
                            <img id="redundant-power-image" src="<?php echo get_stylesheet_directory_uri().'/assets/watt1.png';?>" alt="" class="module-image">
                            <img src="<?php echo get_stylesheet_directory_uri().'/assets/watt.png';?>" alt="" class="small-images module-image">
                        </div>
                        <div class="slot module-structure" data-slot="1"></div>
                        <div class="slot module-structure" data-slot="2"></div>
                        <div class="slot module-structure" data-slot="3"></div>
                        <div class="slot module-structure" data-slot="4"></div>
                        <div class="slot module-structure" data-slot="5"></div>
                        <div class="slot module-structure" data-slot="6"></div>
                        <div class="slot module-structure" data-slot="7"></div>
                        <div class="slot module-structure" data-slot="8"></div>
                        <div class="slot module-structure" data-slot="9"></div>
                        <div class="slot module-structure" data-slot="10"></div>
                        <div class="module-structure static">
                            <img src="<?php echo get_stylesheet_directory_uri().'/assets/watt1.png';?>" alt="" class="module-image">
                            <img src="<?php echo get_stylesheet_directory_uri().'/assets/watt2.png';?>" alt="" class="module-image">
                        </div>
                    </div>
                    <div class="watts"><span >0</span>/340W</div>
                </div>

                <div class="settings-wrapper module-sellector">
                    <div class="setting products">
                        <h2 class="heading">Products</h2>
                        <div class="content">
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
                        </div>
                    </div>

                    <div class="setting sub-category">
                        <h2 class="heading">Sub-Category</h2>
                        <div class="content">
                            <ul id="sub-categories">
                                <li>Please select a parent category first</li>                         
                            </ul>
                        </div>
                    </div>

                    <div class="setting card">
                        <h2 class="heading">Card</h2>
                        <div class="content">
                            <ul id="cards-list">
                                <li><strong>Select a sub-category first</strong>
                                    3G/HD/SD-SDI Up-Down-Cross Converter / Frame Sync / Audio Embed/De-Embed</li>
                            </ul>
                        </div>
                    </div>

                    <div class="setting rear-module">
                        <h2 class="heading">Rear Module</h2>
                        <div class="content">
                            <ul id="rear-modules-list">
                            <li>Please select a card first</li>                            
                            </ul>
                        </div>
                    </div>

                    <div class="setting module-features">
                        <h2 class="heading" id="rear-module-image-heading">RM20-9902-A/S</h2>
                        <div class="content">
                        <div id="rear-module-image"></div>
                            <div class="divider"></div>
                             <div class="features-availabilty">
                                <div>
                                    <h3>Features</h3>
                                    <ul>

                                    </ul>
                                </div>
                                <div>
                                    <h3>Available Options</h3>
                                    <ul id="rear-module-options">
                                        <label for="availabilty1">
                                            <input type="checkbox" class="check">
                                            +2L-SPAN
                                        </label>
                                        <label for="availabilty2">
                                            <input type="checkbox" class="check" >
                                            +ANC
                                        </label>
                                        <label for="availabilty3">
                                            <input type="checkbox" class="check" >
                                            +Cl-AN
                                        </label>
                                        <label for="availabilty3">
                                            <input type="checkbox" class="check">
                                            +COLOR
                                        </label>
                                        <label for="availabilty3">
                                            <input type="checkbox" class="check">
                                            +DLY
                                        </label>
                                        <label for="availabilty3">
                                            <input type="checkbox" class="check" >
                                            +DSP
                                        </label>
                                        <label for="availabilty3">
                                            <input type="checkbox" class="check">
                                            +DSP-DEC
                                        </label>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>

                <div class="action-btns">          
                    <button id="request-for-quotation-button" class="btn cta">Request Quotation</button>
                    <button id="generate-pdf-button" class="btn">Save PDF</button>
                </div>
            </div>
        </div>
        <div id="configurator-loader" class="backdrop" style="display:none">
        <div class="loader"></div>
    </div>
    </div>
    </div>
</body>
</html>
<?php get_footer(); ?>