<?php
/*
Plugin Name: Simple CF7 Steps
Description: Adds steps functionality to the Contact Form 7 forms using JavaScript along with custom design
Plugin URI: https://octaneo.com/portfolio
Version: 2.3
Author: Rai Ansar
Author URI: https://raiansar.com
*/

if (!defined('ABSPATH')) {
    exit;
}

function simple_cf7_steps_enqueue_scripts() {
    wp_enqueue_script('simple-cf7-steps-js', plugins_url('js/simple-cf7-steps.js', __FILE__), array('jquery'), time(), true);
    wp_enqueue_style('simple-cf7-steps-css', plugins_url('css/simple-cf7-steps.css', __FILE__), array(), time());
    wp_localize_script('simple-cf7-steps-js', 'ajax_object', array('ajax_url' => admin_url('admin-ajax.php')));
}
add_action('wp_enqueue_scripts', 'simple_cf7_steps_enqueue_scripts');

add_action('wp_ajax_validate_cf7_step', 'validate_cf7_step');
add_action('wp_ajax_nopriv_validate_cf7_step', 'validate_cf7_step');

function validate_cf7_step() {
    $step = $_POST['step'];
    $form_data = $_POST['form_data'];
    $errors = array();

    // Parse the form data
    parse_str($form_data, $fields);

    // Validation logic for each step
    switch ($step) {
        case 0: // Property Details
            if (empty($fields['bathrooms']) || !is_numeric($fields['bathrooms']) || $fields['bathrooms'] < 1 || $fields['bathrooms'] > 10) {
                $errors['bathrooms'] = 'Please enter a valid number of bathrooms (1-10).';
            }
            break;
        case 1: // Occupancy Details
            if (empty($fields['occupants']) || !is_numeric($fields['occupants']) || $fields['occupants'] < 1 || $fields['occupants'] > 20) {
                $errors['occupants'] = 'Please enter a valid number of occupants (1-20).';
            }
            break;
        case 2: // Kitchen Details
            if (empty($fields['kitchens']) || !is_numeric($fields['kitchens']) || $fields['kitchens'] < 1 || $fields['kitchens'] > 5) {
                $errors['kitchens'] = 'Please enter a valid number of kitchens (1-5).';
            }
            break;
        case 3: // Postcode Details
            if (empty($fields['postcode']) || !preg_match('/^[A-Z0-9]{1,10}$/i', $fields['postcode'])) {
                $errors['postcode'] = 'Please enter a valid postcode.';
            }
            break;
        // Add similar validation for Step 5 if needed
    }

    // Send JSON response
    wp_send_json(array(
        'success' => empty($errors),
        'errors' => $errors
    ));
}
