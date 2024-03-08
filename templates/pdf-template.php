<?php 
// Output Image Markup
function generateImageMarkup($imageUrl, $classes = '') {
  // Convert image URL to local file path
  $image_path = str_replace(site_url(), ABSPATH, $imageUrl);
  // Check if the file exists
  if (file_exists($image_path)) {
      // If the file exists, add it to PDF
      $image_content = file_get_contents($image_path);
      $image_data = base64_encode($image_content);
      $image_type = pathinfo($image_path, PATHINFO_EXTENSION);
      $image_data_uri = 'data:image/' . $image_type . ';base64,' . $image_data;
      // Append classes to the img tag
      return '<img width="100%" class="' . $classes . '" height="auto" src="' . $image_data_uri . '" alt="Image">';
  } else {
      // If the file does not exist, return a message
      //return '<p>Image not found: ' . $imageUrl . '</p>';
  }
}
// If expanded class exists add show it's rear module in next
function wrapWithAngleBrackets($expandedModule) {
  if ($expandedModule) {
      $wrappedModule = "-" . $expandedModule . "-";
      return $wrappedModule;
  } else {
      return;
  }
}

// Function to display card names based on power value
function generateCardMarkup($cardName, $power) {
    // Check if the power value is 36
    if ($power == 36) {
        // If yes, append '(x2)' to the card name
        return $cardName . '(x2)';
    } else {
       // Otherwise, return the card name as is
        return $cardName;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>frame_configuration</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
        @font-face {
        font-family: "Poppins";
        src: url("<?php echo get_stylesheet_directory_uri() ?>/vendor/dompdf/dompdf/lib/fonts/Poppins-Regular.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;
    }
    <?php
    $css_file_path = get_stylesheet_directory() . '/templates/configurator-pdf.css';
    if (file_exists($css_file_path)) {
        echo file_get_contents($css_file_path);
    } else {
        // Handle error if CSS file is not found
        echo '/* CSS file not found */';
    }
    
    ?>
</style>
  </head>
  <body>
    <!-- header start here -->
    <header>
      <div class="container">
        <div class="header-inner">
          <h1><?php echo $pdf_data['title']; ?></h1>
          <div class="header-list">
            <ul>
              <li><strong>Frame:</strong><?php echo $pdf_data['selectedframe']; ?></li>     
              <li><strong>Power Supply:</strong><?php echo $pdf_data['redundantsupply']; ?></li>
              <li><strong>Support Brackets:</strong><?php echo $pdf_data['framesupportkit']; ?></li>
              <li><strong>Network Card:</strong><?php echo $pdf_data['networkcard']; ?></li>
              <li><strong>SNMP Support:</strong><?php echo $pdf_data['snmpSupportCheck']; ?></li>
              <li><strong>IP Address:</strong><?php echo $pdf_data['snmpsupport']; ?></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <!-- header end here -->
    <!-- image start here-->
    <div class="module-section">
                    <div class="module-wrapper" id="rear-module-images">
                        <div class="module-structure static">
                        <?php echo generateImageMarkup(get_stylesheet_directory_uri().'/assets/watt1.png'); ?>
                        <?php echo generateImageMarkup(get_stylesheet_directory_uri().'/assets/watt.png'); ?>
                        </div>
                        <div class="slot module-structure" data-slot="1"><?php echo generateImageMarkup($pdf_data['imageSrc_0'], $pdf_data['imageClasses_0']); ?></div>
                        <div class="slot module-structure" data-slot="2"><?php echo generateImageMarkup($pdf_data['imageSrc_1'], $pdf_data['imageClasses_1']); ?></div>
                        <div class="slot module-structure" data-slot="3"><?php echo generateImageMarkup($pdf_data['imageSrc_2'], $pdf_data['imageClasses_2']); ?></div>
                        <div class="slot module-structure" data-slot="4"><?php echo generateImageMarkup($pdf_data['imageSrc_3'], $pdf_data['imageClasses_3']); ?></div>
                        <div class="slot module-structure" data-slot="5"><?php echo generateImageMarkup($pdf_data['imageSrc_4'], $pdf_data['imageClasses_4']); ?></div>
                        <div class="slot module-structure" data-slot="6"><?php echo generateImageMarkup($pdf_data['imageSrc_5'], $pdf_data['imageClasses_5']); ?></div>
                        <div class="slot module-structure" data-slot="7"><?php echo generateImageMarkup($pdf_data['imageSrc_6'], $pdf_data['imageClasses_6']); ?></div>
                        <div class="slot module-structure" data-slot="8"><?php echo generateImageMarkup($pdf_data['imageSrc_7'], $pdf_data['imageClasses_7']); ?></div>
                        <div class="slot module-structure" data-slot="9"><?php echo generateImageMarkup($pdf_data['imageSrc_8'], $pdf_data['imageClasses_8']); ?></div>
                        <div class="slot module-structure" data-slot="10"><?php echo generateImageMarkup($pdf_data['imageSrc_9'], $pdf_data['imageClasses_9']); ?></div>
                        <div class="module-structure static">
                        <?php echo generateImageMarkup(get_stylesheet_directory_uri().'/assets/watt1.png'); ?>
                        <?php echo generateImageMarkup(get_stylesheet_directory_uri().'/assets/watt2.png'); ?>                     
                  </div>
              </div>
          </div>
        <!-- image end here-->
 <!-- table start here -->
 <section class="table-section">
      <div class="container">
        <!-- table start here -->
        <div class="table-wrapper">
          <div class="table-list">
            <h2>Product List</h2>
            <ul>
                <?php

                // Product List!
                // Initialize arrays to store product counts
                $cardCounts = array();
                $rearModuleCounts = array();

                // Count the occurrences of each card and rear module
                foreach ($pdf_data as $key => $value) {
                  if (strpos($key, 'imageCardName_') !== false && $value !== '') {
                      $cardName = $pdf_data['imageCardName_' . substr($key, strlen('imageCardName_'))];
                      $powerWattKey = 'powerWatt_' . substr($key, strlen('imageCardName_'));
                      
                      // Check if the powerWatt indicator is set to 36
                      $dualCount = ($pdf_data[$powerWattKey] == 36) ? 2 : 1;
                      
                      if (!isset($cardCounts[$cardName])) {
                          $cardCounts[$cardName] = $dualCount;
                      } else {
                          $cardCounts[$cardName] += $dualCount;
                      }
                  }


                  // Count Rear Modules
                    if (strpos($key, 'imageRearModule_') !== false && $value !== '') {
                        $rearModule = $pdf_data['imageRearModule_' . substr($key, strlen('imageRearModule_'))];
                        
                        if (!isset($rearModuleCounts[$rearModule])) {
                            $rearModuleCounts[$rearModule] = 1;
                        } else {
                            $rearModuleCounts[$rearModule]++;
                        }
                    }
                }

                // Output the product list
                echo '<ul>';
                foreach ($cardCounts as $cardName => $count) {
                    echo '<li>' . $count . 'x ' . $cardName . '</li>';
                }
                foreach ($rearModuleCounts as $rearModule => $count) {
                    echo '<li>' . $count . 'x ' . $rearModule . '</li>';
                }


  // Rear module counting remains the same
  // ...


            
   
  ?>

               


            </ul>
          </div>
          <div class="table-body">
            <!-- table -->
            <table class="table card-table">
              <thead>
                <tr>
                  <th>Slots</th>
                  <th>Rear Modules</th>
                  <th>Cards</th>
                  <th>Options</th>
                  <th class="left">Slot Locations</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>20, 19:</strong>
                  </td>
                  <td><?php echo $pdf_data['imageRearModule_0']; echo wrapWithAngleBrackets($pdf_data['expandedRearModule_0']); ?></td>
                  <td><?php echo generateCardMarkup($pdf_data['imageCardName_0'], $pdf_data['powerWatt_0']); ?></td>
                  <td><?php echo $pdf_data['imageOptions_0']; ?></td>
                  <td class="left"><?php echo $pdf_data['slotLocation_0']; ?></td>
                </tr>
                <tr>
                  <td>
                    <strong>18, 17: </strong>
                  </td>
                  <td><?php echo $pdf_data['imageRearModule_1'];echo wrapWithAngleBrackets($pdf_data['expandedRearModule_1']); ?></td>
                  <td><?php echo generateCardMarkup($pdf_data['imageCardName_1'], $pdf_data['powerWatt_1']); ?></td>
                  <td><?php echo $pdf_data['imageOptions_1']; ?></td>
                  <td class="left"><?php echo $pdf_data['slotLocation_1']; ?></td>
                </tr>
                <tr>
                  <td>
                    <strong>16, 15:</strong>
                  </td>
                  <td><?php echo $pdf_data['imageRearModule_2'];echo wrapWithAngleBrackets($pdf_data['expandedRearModule_2']); ?></td>
                  <td><?php echo generateCardMarkup($pdf_data['imageCardName_2'], $pdf_data['powerWatt_2']); ?></td>
                  <td><?php echo $pdf_data['imageOptions_2']; ?></td>
                  <td class="left"><?php echo $pdf_data['slotLocation_2']; ?></td>
                </tr>
                <tr>
                  <td>
                    <strong>14, 13: </strong>
                  </td>
                  <td><?php echo $pdf_data['imageRearModule_3'];echo wrapWithAngleBrackets($pdf_data['expandedRearModule_3']); ?></td>
                  <td><?php echo generateCardMarkup($pdf_data['imageCardName_3'], $pdf_data['powerWatt_3']); ?></td>
                  <td><?php echo $pdf_data['imageOptions_3']; ?></td>
                  <td class="left"><?php echo $pdf_data['slotLocation_3']; ?></td>
                </tr>
                <tr>
                  <td>
                    <strong>12, 11:</strong>
                  </td>
                  <td><?php echo $pdf_data['imageRearModule_4'];echo wrapWithAngleBrackets($pdf_data['expandedRearModule_4']); ?></td>
                  <td><?php echo generateCardMarkup($pdf_data['imageCardName_4'], $pdf_data['powerWatt_4']); ?></td>
                  <td><?php echo $pdf_data['imageOptions_4']; ?></td>
                  <td class="left"><?php echo $pdf_data['slotLocation_4']; ?></td>
                </tr>
                <tr>
                  <td>
                    <strong>10, 9:</strong>
                  </td>
                  <td><?php echo $pdf_data['imageRearModule_5'];echo wrapWithAngleBrackets($pdf_data['expandedRearModule_5']); ?></td>
                  <td><?php echo generateCardMarkup($pdf_data['imageCardName_5'], $pdf_data['powerWatt_5']); ?></td>
                  <td><?php echo $pdf_data['imageOptions_5']; ?></td>
                  <td class="left"><?php echo $pdf_data['slotLocation_5']; ?></td>
                </tr>
                <tr>
                  <td>
                    <strong>8, 7: </strong>
                  </td>
                  <td><?php echo $pdf_data['imageRearModule_6'];echo wrapWithAngleBrackets($pdf_data['expandedRearModule_6']);?></td>
                  <td><?php echo generateCardMarkup($pdf_data['imageCardName_6'], $pdf_data['powerWatt_6']); ?></td>
                  <td><?php echo $pdf_data['imageOptions_6']; ?></td>
                  <td class="left" s><?php echo $pdf_data['slotLocation_6']; ?></td>
                </tr>
                <tr>
                  <td>
                    <strong>6, 5: </strong>
                  </td>
                  <td><?php echo $pdf_data['imageRearModule_7'];echo wrapWithAngleBrackets($pdf_data['expandedRearModule_7']); ?></td>
                  <td><?php echo generateCardMarkup($pdf_data['imageCardName_7'], $pdf_data['powerWatt_7']); ?></td>
                  <td><?php echo $pdf_data['imageOptions_7']; ?></td>
                  <td class="left"><?php echo $pdf_data['slotLocation_7']; ?></td>
                </tr>
                <tr>
                  <td>
                    <strong>4, 3:</strong>
                  </td>
                  <td><?php echo $pdf_data['imageRearModule_8'];echo wrapWithAngleBrackets($pdf_data['expandedRearModule_8']); ?></td>
                  <td><?php echo generateCardMarkup($pdf_data['imageCardName_8'], $pdf_data['powerWatt_8']); ?></td>
                  <td><?php echo $pdf_data['imageOptions_8']; ?></td>
                  <td class="left" s><?php echo $pdf_data['slotLocation_8']; ?></td>
                </tr>
                <tr class="last-row">
                  <td>
                    <strong>2, 1: </strong>
                  </td>
                  <td><?php echo $pdf_data['imageRearModule_9'];echo wrapWithAngleBrackets($pdf_data['expandedRearModule_9']); ?></td>
                  <td><?php echo generateCardMarkup($pdf_data['imageCardName_9'], $pdf_data['powerWatt_9']); ?></td>
                  <td><?php echo $pdf_data['imageOptions_9']; ?></td>
                  <td><?php echo $pdf_data['slotLocation_9']; ?></td>
                </tr>
              </tbody>
            </table>
            <!-- table -->
          </div>
        </div>
        <!-- table end here -->
      </div>
    </section>
    <!-- image and table end here -->
</body>
</html>
