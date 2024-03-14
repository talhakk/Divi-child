jQuery(document).ready(function($) {
    // Access ajax_url directly
    var ajaxurl = ajax_object.ajax_url;
    console.log('Configurator Jquery Loaded');
    // Load initial sub-category, card, rear-module by clicking 
    var checkCategoriesInterval = setInterval(function() {
        // Check if categories are loaded
        if ($('#parent-categories li').length > 1) {
            // Categories are loaded, trigger click event on the first category
            $('#parent-categories li:first').click().addClass('active');
            $('#parent-categories li').click(function() {
                $('#parent-categories li').removeClass('active');
                $(this).addClass('active');
            });
            // Clear the interval to stop the loop
            clearInterval(checkCategoriesInterval);
        }
    }, 2000); // Check every 2 seconds;
    function updateTotalPower() {
        // Initialize total power
        var totalPower = 0;
    
        // Loop through each slot to calculate total power
        $(".slot").each(function() {
            // Check if the current slot contains an <img> element
            if ($(this).find('img').length > 0) {
                // Iterate over each image in the current slot
                $(this).find('img[data-power]').each(function() {
                    // Get the value of data-power attribute and add it to totalPower
                    totalPower += parseInt($(this).attr('data-power'));
                });
            }
        });
    
        // Update the total power value in the .watts element
        $('.watts span').text(totalPower );
    }
    
/**
 * 
 * Drag & Drop
 *  
 */
// Function to make an image draggable
function makeDraggable($element) {
    $element.draggable({
        revert: 'invalid',
        helper: 'clone',
        start: function(event, ui) {
            // Enable droppable functionality for the dragging div
            $(this).closest('.slot').droppable('enable');
            $(this).closest('.slot').addClass('draggingE');
            $(this).closest('.slot').next('.slot').droppable('enable');
            //$(ui.helper).addClass('dragging');      
        },
        stop: function(event, ui) {
            // Disable droppable functionality for the dragging div after drop
            $(this).closest('.slot').droppable('disable');
            $(this).closest('.slot').next('.slot').droppable('disable');
           // $(ui.helper).removeClass('dragging');  
                       
        }
    });
}

// Make the slots droppable
$(".slot").droppable({
    //hover effect for 4 slot images
    over: function(event, ui) {
        // Add highlight class when a draggable enters the droppable area
        if (ui.draggable.find('img').hasClass('expanded')){
            $(this).next().addClass('ui-droppable-hover');
        }
       
    },
    out: function(event, ui) {
        // Remove highlight class when a draggable leaves the droppable area
        if (ui.draggable.find('img').hasClass('expanded')){
            $(this).next().removeClass('ui-droppable-hover');
        }
    },


    // Make the slots droppable
    drop: function(event, ui) {
        var $droppedSlot = $(this);
        //var droppedSlotId = $droppedSlot.attr('id');
        //var $prevSlot = $droppedSlot.prev();
        var $nextSlot = $droppedSlot.next();
        // remove hover class after drop, class added in "Over" above
        if ($(ui.draggable).hasClass('expanded')){
            $(this).next().removeClass('ui-droppable-hover');
        }
       
            // Loop through each slot to enable droppable
            $(".slot").each(function() {
                // Check if the current slot does not contain an <img> element
                if ($(this).find('img').length === 0) {
                    
                    // Check if the previous slot does not have the class 'expanded'
                    if (!$(this).prev().find('img').hasClass('expanded')) {
                        // Enable droppable functionality for the current slot
                        $(this).droppable('enable');      
                    }
                } else {
                    // Disable droppable functionality for the current slot
                    $(this).droppable('disable');
                    
                }
            });
   
        // Check if image takes 4 slots
        if (ui.draggable.find('img').hasClass('expanded')) {
            // Check if the next slot is empty and disable it
            //change this
            if ($nextSlot.length && ($nextSlot.is(':empty') || $nextSlot.hasClass('draggingE'))) {
                // Get the rear module value
                var rearModuleValue = ui.draggable.find('img').data('rear-module');

                // Set the rear module value as a data attribute on $nextSlot
                $nextSlot.attr('data-expanded', rearModuleValue);
                //if ($nextSlot.length && $nextSlot.hasClass('expanded')) {
                $nextSlot.droppable('disable'); 

            } 
            else {
                // If no empty slots are found, prevent dropping the image
                console.log('Not enough space to drop an image');
                return false;
            }
        }
     
        // Check if the dropped item is from rear-module-image
        var isFromRearModule = ui.draggable.parent().is('#rear-module-image');
        
        // If it's from rear-module-image, append it to the new slot
        if (isFromRearModule) {           

            var $clone = ui.draggable.clone(); 
            
            $(this).empty().append($clone.fadeIn(1000));

            makeDraggable($clone);
            // Check if the dropped slot contains an <img> element
            $(this).droppable('disable');
            updateTotalPower();
            
            $('.close').click(function() {
                // Remove the inner div with class "ui-draggable"
                $(this).closest('.slot').find('.ui-draggable').remove();

                // Enable dropping on the dropped slot
                $($droppedSlot).droppable('enable');

                // Remove the data-expanded attribute
                $nextSlot.removeAttr('data-expanded');

                // Update total power
                updateTotalPower();
            });
        } else {
            // If it's from another slot
            var originalSlotId = ui.draggable.parent().data('slot');
            console.log('The element was dragged from slot ID:', originalSlotId);

            // Reset the width of the original slot
            var $originalSlot = $('.slot[data-slot="' + originalSlotId + '"]');
            $originalSlot.droppable('enable');

            // Check if the dragged image has the class 'expanded'
            if (ui.draggable.find('img').hasClass('expanded')) {
                // Enable droppable functionality for the next slot
                var $nextSlot = $originalSlot.next('.slot');
                $nextSlot.droppable('enable');
                // Remove the data-expanded attribute
                $nextSlot.removeAttr('data-expanded');
            }
            $(ui.draggable).closest('.slot').removeClass('draggingE');
            // Append the dragged element to the current slot
            $(this).empty().append(ui.draggable);

            // Disable droppable functionality for the current slot
            $(this).droppable('disable');
            
     }
    }
});
/**
 * Drag & Drop End
 * 
 */
    // Show/hide the checkbox based on the selection of the first radio group
    $('input[name="select_frame_power"]').change(function() {
        var selectedValue = $(this).val();
        if (selectedValue === 'HPF-9000 (360W)') {
            $('#network-card-checkbox-container').show();
            $('#snmp-support-checkbox').prop('disabled', false);
            $('#network-card-options .divider').show();
            $('.network-card-no-option').hide();
        } else {
            $('#network-card-checkbox-container').hide();
            $('#snmp-support-checkbox').prop('disabled', true);
            //$('input[name="second_option"][value="No"]').prop('disabled', false);
            $('.network-card-no-option').show();
            $('#network-card-options .divider').hide();
        }
    });
    // Attach change event listener to the radio buttons
    $('#redundant-power-supply-options input[name="option"]').change(function() {
        var selectedValue = $(this).val();
        if (selectedValue === 'no') {
            $('#redundant-power-image').hide(); // Hide the image if 'no' is selected
        } else {
            $('#redundant-power-image').show(); // Show the image if 'yes' is selected
        }
    });
/**
 * 
 * Fetch ACF Data
 * 
 */
    // Get Sub-Categories
    $(document).on('click', '#parent-categories li', function() {
        // Get the category ID from the data attribute
        var parent_id = $(this).data('category-id');
        var data = {
            'action': 'get_subcategories',
            'parent_id': parent_id
        };
        // Clear existing sub-categories list and append the default message
       $('#sub-categories').empty().append('<li>No Sub-Categories Available</li>')
       $('#cards-list').empty().append('<li>No cards available</li>');
       $('#rear-modules-list').empty().append('<li>No Rear Modules Available</li>');
       $('#rear-module-image').empty();
        // Check if a parent category is selected
        if (parent_id) {
            // Fetch sub-categories based on the selected parent category
            $.post(ajaxurl, data, function(response) {
                if (response.success) {
                    // Clear the default message
                    $('#sub-categories').empty();
                    // Append new sub-categories
                    $.each(response.data, function(index, subcategory) {
                        $('#sub-categories').append('<li data-subcategory-id="' + subcategory.id + '">' + subcategory.name + '</li>');
                    });
                    $('#sub-categories li').click(function() {
                        $('#sub-categories li').removeClass('active');
                        $(this).addClass('active');
                    });
                    $('#sub-categories li:first').click();
                    
                } else {
                    console.log(response.data);
                }
            });
        }
    });

    // Get Cards List
    $(document).on('click', '#sub-categories li', function() {
        var sub_id = $(this).data('subcategory-id'); // Get selected sub-category ID
        var data = {
            'action': 'get_cards',
            'sub_id': sub_id
        };
    
        // Clear existing cards list and append the default message
        $('#cards-list').empty().append('<li>No cards available</li>');
       $('#rear-modules-list').empty().append('<li>No Rear Modules Available</li>');
       $('#rear-module-image').empty();
    
        // Check if a sub-category is selected
        if (sub_id) {
            // Fetch cards based on the selected sub-category
            $.post(ajaxurl, data, function(response) {
                if (response.success) {
                    // Clear the default message
                    $('#cards-list').empty();
                    // Append new cards
                    $.each(response.data, function(index, card) {
                        $('#cards-list').append('<li data-card-id="' + card.id + '" data-card-name="'+card.name+'"><strong>' + card.name + '</strong>'+card.secondary_name+'</li>');
                    });
                    $('#cards-list li').click(function() {
                        $('#cards-list li').removeClass('active');
                        $(this).addClass('active');
                    });
                    $('#cards-list li:first').click();           
                } else {
                    console.log(response.data);
                }
            });
        }
    });
    
    // Get Rear Modules list
    $(document).on('click', '#cards-list li', function() {
        var card_id = $(this).data('card-id'); // Get selected card ID    
        var card_name = $(this).data('card-name');
        var data = {
            'action': 'get_rear_modules',
            'card_id': card_id
        };
        $('#rear-modules-list').empty().append('<li>No Rear Modules Available</li>');
        $('#rear-module-image').empty();
        // Send AJAX request to fetch rear modules based on the selected card
        $.post(ajaxurl, data, function(response) {
            // Clear existing list items and append the default message
           
    
            if (response.success) {
                // Clear the default message
                $('#rear-modules-list').empty();
                // If rear modules are found, append them to the list
                $.each(response.data, function(index, rear_module_data) {
                    // Append new rear modules with rear module ID attribute
                    $('#rear-modules-list').append('<li data-rear-module-id="' + rear_module_data.id + '" data-card-name="' + card_name + '">' + rear_module_data.name + '</li>');
                });
                $('#rear-modules-list li').click(function() {
                    $('#rear-modules-list li').removeClass('active');
                    $(this).addClass('active');
                });
                $('#rear-modules-list li:first').click();
            } else {
                // If no rear modules are found, log the message
                console.log(response.data);
            }
        });
    });// Get Rear Modules
/**
 * Get Rear Module Image Data &
 * Feature Options Checkboxes
 */
    $(document).on('click', '#rear-modules-list li', function() {
        var rear_module_id = $(this).data('rear-module-id'); // Get selected rear module ID
        var rearModule = $(this).text();
        var card = $(this).data('card-name');
        var data = {
            'action': 'get_rear_module_image',
            'rear_module_id': rear_module_id
        };
          // Clear the image container if no rear module is selected
          $('#rear-module-image').empty();
        if (!rear_module_id) {
          
             // Clear existing droppable areas
             $('.droppable-area').empty();
        } else {
            // Send AJAX request to get ACF images associated with the selected rear module
            $.post(ajaxurl, data, function(response) {
                // Clear existing images
                $('#rear-module-image').empty();
                // Clear existing droppable areas
                $('#droppable-container').empty();
                if (response.success) {
                    var power= response.data.power_watt;
                    var fourSlotImage = response.data.four_slot_image;
                    var selectedOptions= response.data.selected_options;
                    
                    var imageClass = 'module-img';
                    if (fourSlotImage.length > 0) { // Check if the checkbox is checked
                        imageClass += ' expanded';
                    }
           
                     // Append the image wrapped in a button to the container
                      
            
                var $image = $('<img>', {
                    'class': imageClass, // Set the class
                    'src': response.data.image, // Set the source attribute
                    'data-card_name': card, // Add data attribute for the card
                    'data-rear-module': rearModule, // Add data attribute for the rear module
                    'data-power':power ,
                    'data-selected-options':selectedOptions
                });
               
                var $removeButton =$('<a class="close">X</a>');
                var $overlay = $('<div class="overlay"></div>').append($removeButton);
                var $title = $('<div class="rm-title"></div>').append(rearModule);
                var $container = $('<div>').append($image, $overlay, $title);
 
               $('#rear-module-image').append($container);
               $('#rear-module-image-heading').text(rearModule);
               // make the image draggable
                makeDraggable($container);
                /**
                 * generate feature option checkboxes
                 */
                        // Select the ul element where checkboxes will be populated
                        var checkboxContainer = $('#rear-module-options');

                        // Clear previous content if any
                        checkboxContainer.empty();

                        // Iterate over selected options and generate HTML for checkboxes
                        selectedOptions.forEach(function(option, index) {
                            // Create checkbox label and input elements
                            var checkboxLabel = $('<label>').attr('for', 'feature' + (index + 1)).text(option);
                            var checkboxInput = $('<input>').attr({
                                type: 'checkbox',
                                class: 'check',
                                id: 'feature' + (index + 1)
                            });

                            // Append input inside label and label inside ul
                            checkboxLabel.prepend(checkboxInput);
                            checkboxContainer.append(checkboxLabel);
                        });
                        $('.check').change(function() {
                            var labels = [];
                            $('ul#rear-module-options').find('input:checked').each(function() {
                                // var labelText = $(this).parent().text().trim(); if checkboxes not dynamically populated
                                var labelText = $(this).closest('label').text().trim(); // Use closest('label') to target the closest label
                                labels.push(labelText);
                            });
                            $('#rear-module-image img').attr('data-options', labels.join(', ')); // Use attr() to set the data-options attribute
                        });
                        
                } else {
                    // Log an error message if the request fails
                    console.log(response.data);
                }
            });
        }
});//end of rear module images 
/**
 * 
 * Collect Data for PDF & Quotation
 * 
 */
function getFormData() {
    var formData = {};

    // Basic options data 
    formData.title = $('#frame_title_main').val();
    formData.selectedFrame = $('#frame-selection-radio input[name="select_frame_power"]:checked').val();
    formData.redundantPowerSupply = $('#redundant-power-supply-options input[name="option"]:checked').val();
    formData.networkCard = $('#network-card-options input[name="second_option"]:checked').val();
    formData.snmpSupport = '';
    formData.snmpSupportCheck = '';
    if ($('#network-card-checkbox-container').is(':visible')) {
        formData.snmpSupport = $('#snmp-support-ip').val();
        formData.snmpSupportCheck = $('#network-card-options #additional-info-checkbox').prop('checked');
    }
    formData.frameSupportBracketKit = $('#frame-support-bracket-kit-options input[name="option"]:checked').val();

    // Collect images data
    var imagesData = [];
    $('.slot').each(function() {
        var $slot = $(this);
        var slotId = $slot.data('slot');
        var $img = $slot.find('img');
        var slotLocations = '';

        if ($img.length && $img.hasClass('expanded')) {
            slotLocations = 'Even';
        } else if ($img.length && $img.data('rear-module')) {
            slotLocations = 'Both';
        }
        var imageData = {
            slotId: slotId,
            src: $img.length ? $img.attr('src') : '', // Empty if no image present
            cardName: $img.length ? $img.data('card_name') : '', // Empty if no image present
            rearModule: $img.length ? $img.data('rear-module') : '', // Empty if no image present
            powerWatt: $img.length ? $img.data('power') : '', // Empty if no image present
            classes: $img.length ? $img.attr('class') : '', // Empty if no image present
            expandedRearModule: $slot.attr('data-expanded'),
            slotLocations: slotLocations, // Determined slot location
            options: $img.length ? $img.attr('data-options') : ''
        };
        imagesData.push(imageData);
    });

    // Add images data to formData
    imagesData.forEach(function(image, index) {
        formData['imageSrc_' + index] = image.src;
        formData['imageCardName_' + index] = image.cardName;
        formData['imageRearModule_' + index] = image.rearModule;
        formData['imageClasses_' + index] = image.classes;
        formData['powerWatt_' + index] = image.powerWatt;
        formData['expandedRearModule_' + index] = image.expandedRearModule;
        formData['slotLocation_' + index] = image.slotLocations;
        formData['imageOptions_' + index] = image.options;
    });

    return formData;
}
/**
 * 
 * Generate PDF
 * 
 */
$('#generate-pdf-button').click(function() {
    $('#configurator-loader').show();
     // Check if .slot elements exist
     if ($('.slot').find('img').length === 0) {
        // Alert the user
        alert('Select atleast one Rear Module');
        return; // Exit the function
    }
var pdfData = getFormData();
    // Prepare data object for AJAX request
    var data = {
        action: 'generate_pdf',
        pdfData: pdfData
    };

    $.post(ajaxurl, data, function(response) { 
        $('#configurator-loader').hide();
        // Check if the response indicates success
        if (response.success) {
        var pdfUrl = response.data.pdf_url;
        // Trigger download
        var link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'document.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        } else {
            // Handle error response
            console.log('Failed to generate PDF:', response.data);
        }
    }).fail(function(xhr, status, error) {
        // Handle AJAX request failure
        console.log('Failed to generate PDF:', error);
    });
    
    
});
/**
 * 
 * Request For Quotation
 * 
 */
$('#request-for-quotation-button').click(function() {
    $('#configurator-loader').show();
    // Check if some Rear Module Selected otherwise
    if ($('.slot').find('img').length === 0) {
        // Alert the user
        alert('Select atleast one Rear Module');
        return; // Exit the function
    }
    var pdfData = getFormData();
        // Prepare data object for AJAX request
        var data = {
            action: 'generate_pdf',
            pdfData: pdfData
        };
    
        $.post(ajaxurl, data, function(response) {
            $('#configurator-loader').hide();
            // Handle response
            console.log('Request for Quotation initiated');
        
            // Check if the response indicates success
            if (response.success) {
    
             // Redirect user to another page
             window.location.href = '/jilchad/configuration-sales/';
            } else {
                // Handle error response
                console.log('Failed to Request for Quotation:', response.data);
            }
        }).fail(function(xhr, status, error) {
            // Handle AJAX request failure
            console.log('Failed to Request for Quotation:', error);
        });
        
        
    });

});//main