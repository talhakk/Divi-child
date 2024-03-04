<?php 
// Define a function to generate image HTML markup
function generateImageMarkup($imageUrl) {
    // Convert image URL to local file path
    $image_path = str_replace(site_url(), ABSPATH, $imageUrl);
    // Check if the file exists
    if (file_exists($image_path)) {
        // If the file exists, add it to PDF
        $image_content = file_get_contents($image_path);
        $image_data = base64_encode($image_content);
        $image_type = pathinfo($image_path, PATHINFO_EXTENSION);
        $image_data_uri = 'data:image/' . $image_type . ';base64,' . $image_data;
        return '<img width="100%" height="auto" src="' . $image_data_uri . '" alt="Image">';
    } else {
        // If the file does not exist, return a message
        return '<p>Image not found: ' . $imageUrl . '</p>';
    }
}

// Output images wherever needed
echo generateImageMarkup($pdf_data['imageSrc_0']); // Outputting the first image
echo generateImageMarkup($pdf_data['imageSrc_1']); // Outputting the second image
// You can call generateImageMarkup with any imageSrc index or value as needed
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
    $css_file_path = get_stylesheet_directory() . '/templates/configurator.css';
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
  <?php //echo $pdf_data['selectedframe']; ?>
<?php //echo $pdf_data['imageSrc_0']; ?> <!-- Accessing the src of the first image -->
<?php //echo $pdf_data['imageCardName_0']; ?> <!-- Accessing the cardName of the first image -->
<?php //echo $pdf_data['imageRearModule_0']; ?>
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
              <li><strong>IP Address:</strong><?php echo $pdf_data['snmpsupport']; ?></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <!-- header end here -->
 <!-- image and table start here -->
 <section class="table-section">
      <div class="container">
        <!-- image start here-->
        <div class="table-media">
          <img src="./assets/img/frame_configuration.png" alt="img" />
        </div>
        <!-- image end here-->
 


        <!-- table start here -->
        <div class="table-wrapper">
          <div class="table-list">
            <h2>Product List</h2>
            <ul>
                <?php
                // Initialize arrays to store product counts
                $cardCounts = array();
                $rearModuleCounts = array();

                // Count the occurrences of each card and rear module
                foreach ($pdf_data as $key => $value) {
                    if (strpos($key, 'imageCardName_') !== false && $value !== '') {
                        $cardName = $pdf_data['imageCardName_' . substr($key, strlen('imageCardName_'))];
                        
                        if (!isset($cardCounts[$cardName])) {
                            $cardCounts[$cardName] = 1;
                        } else {
                            $cardCounts[$cardName]++;
                        }
                    }

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
                  <td><?php echo $pdf_data['imageRearModule_0']; ?></td>
                  <td><?php echo $pdf_data['imageCardName_0']; ?></td>
                  <td></td>
                  <td class="left"></td>
                </tr>
                <tr>
                  <td>
                    <strong>18, 17: </strong>
                  </td>
                  <td><?php echo $pdf_data['imageRearModule_1']; ?></td>
                  <td><?php echo $pdf_data['imageCardName_1']; ?></td>
                  <td></td>
                  <td class="left"></td>
                </tr>
                <tr>
                  <td>
                    <strong>16, 15:</strong>
                  </td>
                  <td><?php echo $pdf_data['imageRearModule_2']; ?></td>
                  <td><?php echo $pdf_data['imageCardName_2']; ?></td>
                  <td></td>
                  <td class="left"></td>
                </tr>
                <tr>
                  <td>
                    <strong>14, 13: </strong>
                  </td>
                  <td><?php echo $pdf_data['imageRearModule_3']; ?></td>
                  <td><?php echo $pdf_data['imageCardName_3']; ?></td>
                  <td></td>
                  <td class="left">Even</td>
                </tr>
                <tr>
                  <td>
                    <strong>12, 11:</strong>
                  </td>
                  <td><?php echo $pdf_data['imageRearModule_4']; ?></td>
                  <td><?php echo $pdf_data['imageCardName_4']; ?></td>
                  <td></td>
                  <td class="left">Even</td>
                </tr>
                <tr>
                  <td>
                    <strong>10, 9:</strong>
                  </td>
                  <td><?php echo $pdf_data['imageRearModule_5']; ?></td>
                  <td><?php echo $pdf_data['imageCardName_5']; ?></td>
                  <td></td>
                  <td class="left">Even</td>
                </tr>
                <tr>
                  <td>
                    <strong>8, 7: </strong>
                  </td>
                  <td><?php echo $pdf_data['imageRearModule_6']; ?></td>
                  <td><?php echo $pdf_data['imageCardName_6']; ?></td>
                  <td></td>
                  <td class="left" s></td>
                </tr>
                <tr>
                  <td>
                    <strong>6, 5: </strong>
                  </td>
                  <td><?php echo $pdf_data['imageRearModule_7']; ?></td>
                  <td><?php echo $pdf_data['imageCardName_7']; ?></td>
                  <td></td>
                  <td class="left"></td>
                </tr>
                <tr>
                  <td>
                    <strong>4, 3:</strong>
                  </td>
                  <td><?php echo $pdf_data['imageRearModule_8']; ?></td>
                  <td><?php echo $pdf_data['imageCardName_8']; ?></td>
                  <td></td>
                  <td class="left" s></td>
                </tr>
                <tr class="last-row">
                  <td>
                    <strong>2, 1: </strong>
                  </td>
                  <td><?php echo $pdf_data['imageRearModule_9']; ?></td>
                  <td><?php echo $pdf_data['imageCardName_9']; ?></td>
                  <td></td>
                  <td></td>
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
