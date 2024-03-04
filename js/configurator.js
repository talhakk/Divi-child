jQuery(document).ready(function($) {
    // Access ajax_url directly
    var ajaxurl = ajax_object.ajax_url;
    console.log('Configurator Jquery Loaded');
    // Load initial sub-category, card, rear-module by clicking 
    var checkCategoriesInterval = setInterval(function() {
        // Check if categories are loaded
        if ($('#parent-categories li').length > 1) {
            // Categories are loaded, trigger click event on the first category
            $('#parent-categories li:first').click();
            // Clear the interval to stop the loop
            clearInterval(checkCategoriesInterval);
        }
    }, 2000); // Check every 2 seconds;
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
            $(ui.helper).addClass('dragging');
        },
        stop: function(event, ui) {
            $(ui.helper).removeClass('dragging');
        }
    });
}
// Make the slots droppable
$(".slot").droppable({
    //hover effect 
    // Make the slots droppable
    over: function(event, ui) {
        // Add highlight class when a draggable enters the droppable area
        $(this).addClass('highlight');
    },
    out: function(event, ui) {
        // Remove highlight class when a draggable leaves the droppable area
        $(this).removeClass('highlight');
    },
   


    drop: function(event, ui) {
        var $droppedSlot = $(this);
        var droppedSlotId = $droppedSlot.attr('id');
        //var $prevSlot = $droppedSlot.prev();
        var $nextSlot = $droppedSlot.next();
        //Disable droppable
            // Loop through each slot
            $(".slot").each(function() {
                // Check if the current slot does not contain an <img> element
                if ($(this).find('img').length === 0) {
                    // Check if the previous slot does not have the class 'four_slots'
                    if (!$(this).prev().find('img').hasClass('four_slots')) {
                        // Enable droppable functionality for the current slot
                        $(this).droppable('enable');
                        console.log('droppable enabled');
                    }
                } else {
                    // Disable droppable functionality for the current slot
                    $(this).droppable('disable');
                }
            });
            
        // Check if image takes 4 slots
        if (ui.draggable.hasClass('four_slots')) {
            console.log('class four_slots exist');
           
            // Check if the next slot is empty and disable it
            if ($nextSlot.length && $nextSlot.is(':empty')) {
                $nextSlot.droppable('disable');
            
            } 
            else {
                // If no empty slots are found, prevent dropping the image
                return false;
            }
        }
     
        // Check if the dropped item is from rear-module-image
        var isFromRearModule = ui.draggable.parent().is('#rear-module-image');
        
        // If it's from rear-module-image, append it to the new slot
        if (isFromRearModule) {
             // Check if imageType is set to 2

            var $clone = ui.draggable.clone();
            
            $(this).empty().append($clone.fadeIn(1000));
            $clone.css({
                'position': 'relative', // Set position to relative
                'width': 'auto',        // Reset width to auto
                'height': 'auto',       // Reset height to auto
                'max-width': '100%',    // Set max-width to 100%
                'max-height': '100%'    // Set max-height to 100%
            });
            if (ui.draggable.hasClass('four_slots')) {
                $clone.css({
                    'position': 'relative', // Set position to relative
                    'width': 'auto',        // Reset width to auto
                    'height': 'auto',       // Reset height to auto
                    'max-width': '200%',    // Set max-width to 100%
                    'max-height': '110%'    // Set max-height to 100%
                });
            }
            makeDraggable($clone); // Make the dropped image draggable
            // Check if the dropped slot contains an <img> element
            $(this).droppable('disable');
        } else {
            // If it's from another slot
            var originalSlotId = ui.draggable.parent().data('slot');
            console.log('The element was dragged from slot ID:', originalSlotId);

            // Reset the width of the original slot
            var $originalSlot = $('.slot[data-slot="' + originalSlotId + '"]');
            $originalSlot.droppable('enable');

            // Check if the dragged image has the class 'four_slots'
            if (ui.draggable.hasClass('four_slots')) {
                // Enable droppable functionality for the next slot
                var $nextSlot = $originalSlot.next('.slot');
                $nextSlot.droppable('enable');
                console.log('Next slot droppable enabled');
            }

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
            //$('input[name="second_option"][value="No"]').prop('disabled', true).prop('checked', false);
            $('.network-card-no-option').hide();
        } else {
            $('#network-card-checkbox-container').hide();
            $('#snmp-support-checkbox').prop('disabled', true);
            //$('input[name="second_option"][value="No"]').prop('disabled', false);
            $('.network-card-no-option').show();
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
    
        // Check if a sub-category is selected
        if (sub_id) {
            // Fetch cards based on the selected sub-category
            $.post(ajaxurl, data, function(response) {
                if (response.success) {
                    // Clear the default message
                    $('#cards-list').empty();
                    // Append new cards
                    $.each(response.data, function(index, card) {
                        $('#cards-list').append('<li data-card-id="' + card.id + '">' + card.name + '</li>');
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
        var card_name = $(this).text();
        var data = {
            'action': 'get_rear_modules',
            'card_id': card_id
        };
        $('#rear-modules-list').empty().append('<li>No Rear Modules Available</li>');
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
                $('#rear-modules-list li:first').click();
            } else {
                // If no rear modules are found, log the message
                console.log(response.data);
            }
        });
    });// Get Rear Modules

    // Get Rear Module Image
    $(document).on('click', '#rear-modules-list li', function() {
        console.log('rearmodulechanged');
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
                    var fourSlotImage = response.data.four_slot_image;
                    if (fourSlotImage) {
                        imageType = 'four_slots';
                    } else {
                        // Set imageType to its default value or whatever is appropriate in your case
                        imageType = '';
                    }
           
                     // Append the image wrapped in a button to the container
                     
                
/*
                var $removeButton = $('<button type="button">Remove Image</button>').click(function() {
                    $image.remove(); // Remove the image on button click
                    $(this).remove(); // Remove the button itself
                });
                var $container = $('<div>').append($image, $removeButton);
                $('#rear-module-images').append($container);
                */
               // Calculate the number of droppable areas needed
               // Append the image URL to the container
               // Create the image element with data attributes
                //var card = $('#cards-list li:selected').val();
                
                var $image = $('<img>', {
                    'class': imageType, // Set the class
                    'src': response.data.image, // Set the source attribute
                    'data-card_name': card, // Add data attribute for the card
                    'data-rear-module': rearModule // Add data attribute for the rear module
                });

               $('#rear-module-image').append($image);
                // Make the initially dropped image draggable
                makeDraggable($('#rear-module-image img'));
                } else {
                    // Log an error message if the request fails
                    console.log(response.data);
                }
            });
        }
    });//end of rear module images
/**
 * 
 * Generate PDF
 * 
 */
$('#generate-pdf-button').click(function() {
   // Basic options data 
   var title = $('#frame_title_main input[name="title"]').val();
   var selectedFrame = $('#frame-selection-radio input[name="select_frame_power"]:checked').val();
   var redundantPowerSupply = $('#redundant-power-supply-options input[name="option"]:checked').val();
   var networkCard = $('#network-card-options input[name="second_option"]:checked').val();
   var snmpSupport = '';
    if ($('#network-card-checkbox-container').is(':visible')) {
        snmpSupport = $('#snmp-support-checkbox').val();
    }
   var frameSupportBracketKit = $('#frame-support-bracket-kit-options input[name="option"]:checked').val();

    var card = $('#cards-list option:selected').text();
    var rearModules = $('#rear-modules-list option:selected').map(function() {
        return $(this).text();
    }).get();
   // var pdfData = {};
  

    var lastimage=$('#rear-module-last-image img').attr('src');
    // Prepare data object for AJAX request
    var pdfData = {
        card: card,
        rearModules: rearModules,
        images: imagesData,
        selectedframe: selectedFrame,
        redundantsupply:redundantPowerSupply,
        networkcard:networkCard,
        snmpsupport:snmpSupport,
        framesupportkit:frameSupportBracketKit,
        lastimage:lastimage,
        title:title
    };
    var imagesData = [];

    $('#rear-module-images img').each(function() {
    var $img = $(this);
    var imageData = {
        slotId: $img.closest('.slot').data('slot'),
        src: $img.attr('src'),
        cardName: $img.data('card_name'),
        rearModule: $img.data('rear-module')
    };
    imagesData.push(imageData);
    });

    imagesData.forEach(function(image, index) {
        pdfData['imageSrc_' + index] = image.src;
        pdfData['imageCardName_' + index] = image.cardName;
        pdfData['imageRearModule_' + index] = image.rearModule;
    });
    // Prepare data object for AJAX request
    var data = {
        action: 'generate_pdf',
        pdfData: pdfData
    };

    $.post(ajaxurl, data, function(response) {
        // Handle response
        console.log('success gen pdf');
    
        // Check if the response indicates success
        if (response.success) {
        var pdfUrl = response.data;

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





});//main






