Just Example Form data here for making these steps work. 

<div class="cf7-step" style="background-image: url('https://waterpurities.co.uk/wp-content/uploads/2024/10/bathroom-1.jpg');">
    <div class="glassmorphism">
        <label for="bathrooms">How many bathrooms in the Property?</label>
        [number* bathrooms id:bathrooms min:1 max:10]
    </div>
</div>

<div class="cf7-step" style="background-image: url('https://waterpurities.co.uk/wp-content/uploads/2024/10/bathroom-2.jpg');">
    <div class="glassmorphism">
        <label for="occupants">How many people are in your property?</label>
        [number* occupants id:occupants min:1 max:20]
    </div>
</div>

<div class="cf7-step" style="background-image: url('https://waterpurities.co.uk/wp-content/uploads/2024/10/bathroom-3.jpg');">
    <div class="glassmorphism">
        <label for="kitchens">How many kitchens are in your property?</label>
        [number* kitchens id:kitchens min:1 max:5]
    </div>
</div>

<div class="cf7-step" style="background-image: url('https://waterpurities.co.uk/wp-content/uploads/2024/10/bathroom-4.jpg');">
    <div class="glassmorphism">
        <label for="postcode">Your postcode please to find local engineers</label>
        [text* postcode id:postcode]
    </div>
</div>

        
<div class="cf7-step" style="background-image: url('https://waterpurities.co.uk/wp-content/uploads/2024/10/bathroom-5.jpg');"> 
    <!-- Glassmorphism for the text -->
    <div class="glassmorphism-last-step" style="width: 90%;"> <!-- Adjust width for last step -->
        <div class="form-info" style="color: #fff;">
            Good news, we have some of the best-rated installer engineers in your area.
        </div>
        <div class="form-info" style="color: #fff;">
            We find the best deals from our trusted companies to compare quotes and save £pounds.
        </div>
    </div>

    <div class="glassmorphism-last-step" style="width: 90%;"> <!-- Adjust width for last step -->
        <div class="form-info" style="color: #fff;"> We promise never to share your information with anyone else other than our trusted companies. </div>
        <div class="form-row">
            <div class="form-col">
                <label for="first-name">First Name</label>
                [text* first-name id:first-name]
            </div>
            <div class="form-col">
                <label for="last-name">Last Name</label>
                [text* last-name id:last-name]
            </div>
        </div>
        <div class="form-row">
            <div class="form-col">
                <label for="house-number">House name/number</label>
                [text* house-number id:house-number]
            </div>
            <div class="form-col">
                <label for="postcode-confirm">Postcode</label>
                [text* postcode-confirm id:postcode-confirm]
            </div>
        </div>
        <div class="form-row">
            <div class="form-col">
                <label for="email">Email</label>
                [email* email id:email]
            </div>
            <div class="form-col">
                <label for="phone-number">Phone Number</label>
                [tel* phone-number id:phone-number]
            </div>
        </div>
        <label for="hear-about-us">How did you hear about us?</label>
        [select* hear-about-us id:hear-about-us "Internet" "A friend" "Google" "Social Media" "Other"]
    </div>
</div>



Modify PHP Ajax Validation in the main file of the plugin.

