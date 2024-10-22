jQuery(document).ready(function($) {
    $('.wpcf7-form').each(function() {
        var $form = $(this);
        var $steps = $form.find('.cf7-step');
        var currentStep = 0;
        var stepTitles = ['Property', 'Occupancy', 'Kitchen', 'Location', 'Information'];

        // Add progress bar
        var $progressBar = $('<div class="cf7-progress-bar"></div>');
        for (var i = 0; i < $steps.length; i++) {
            $progressBar.append('<span class="step" data-step="' + i + '" data-title="' + stepTitles[i] + '">' + (i + 1) + '</span>');
            $steps.eq(i).attr('data-step', i);
        }
        $form.prepend($progressBar);

        // Add navigation buttons
        var $buttons = $('<div class="cf7-buttons"></div>');
        $buttons.append('<button type="button" class="cf7-prev">Previous</button>');
        $buttons.append('<button type="button" class="cf7-next">Next</button>'); // Default "Next" label
        $buttons.append('<input type="submit" class="wpcf7-submit" value="GET YOUR FREE QUOTE" style="display:none;">');
        $form.append($buttons);

        function showStep(step) {
            $steps.removeClass('active').eq(step).addClass('active');
            $progressBar.find('.step').removeClass('active');
            for (var i = 0; i <= step; i++) {
                $progressBar.find('.step').eq(i).addClass('active');
            }
            $form.find('.cf7-prev').prop('disabled', step === 0).toggle(step !== 0);
            $form.find('.cf7-next').prop('disabled', step === $steps.length - 1).toggle(step !== $steps.length - 1);
            $form.find('.wpcf7-submit').toggle(step === $steps.length - 1);

            // Change button label to "Verify Coverage" only on postcode step (Step 4)
            if (step === 3) { // Assuming Step 4 is index 3
                $form.find('.cf7-next').text('Verify Coverage');
            } else {
                $form.find('.cf7-next').text('Next');
            }

            if (step === 0) {
                $form.find('.cf7-buttons').css('justify-content', 'flex-end');
            } else if (step === $steps.length - 1) {
                $form.find('.cf7-buttons').css('justify-content', 'space-between');
                $form.find('.wpcf7-submit').css({
                    'position': 'absolute',
                    'left': '50%',
                    'transform': 'translateX(-50%)'
                });
            } else {
                $form.find('.cf7-buttons').css('justify-content', 'space-between');
            }
        }

        function validateStep(step) {
            var $currentStep = $steps.eq(step);
            var formData = $form.serialize() + '&step=' + step;

            return $.ajax({
                url: ajax_object.ajax_url,
                type: 'POST',
                data: {
                    action: 'validate_cf7_step',
                    step: step,
                    form_data: formData
                }
            });
        }

        $form.find('.cf7-next').on('click', function() {
            validateStep(currentStep).done(function(response) {
                if (response.success) {
                    if (currentStep < $steps.length - 1) {
                        currentStep++;
                        showStep(currentStep);
                    }
                } else {
                    // Display errors
                    $.each(response.errors, function(field, error) {
                        var $field = $form.find('[name="' + field + '"]');
                        $field.addClass('wpcf7-not-valid');
                        if (!$field.next('.wpcf7-not-valid-tip').length) {
                            $('<span class="wpcf7-not-valid-tip">' + error + '</span>').insertAfter($field);
                        }
                    });
                    alert('Please correct the errors before proceeding.');
                }
            });
        });

        $form.find('.cf7-prev').on('click', function() {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });

        // Make progress bar steps clickable
        $progressBar.on('click', '.step', function() {
            var clickedStep = $(this).data('step');
            if (clickedStep < currentStep) {
                currentStep = clickedStep;
                showStep(currentStep);
            }
        });

        // Prevent form submission on enter key
        $form.on('keypress', function(e) {
            if (e.which === 13) {
                e.preventDefault();
                return false;
            }
        });

        // Initialize
        showStep(0);
    });
});
