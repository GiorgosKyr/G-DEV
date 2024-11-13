// Initialize the phone input field
const phoneInput = document.querySelector("#phone");
const countryCodeInput = document.querySelector("#country-code");
// Initialize intl-tel-input
const iti = window.intlTelInput(phoneInput, {
    preferredCountries: [
        "us",
        "gb",
        "ca"
    ],
    separateDialCode: true,
    initialCountry: "us"
});
// Update the hidden country code field when the country is selected or the phone number is changed
phoneInput.addEventListener("input", function() {
    const countryData = iti.getSelectedCountryData();
    countryCodeInput.value = countryData.dialCode; // Set the country code value
});
// Ensure the country code is updated when the form is submitted
document.querySelector("form").addEventListener("submit", function(e) {
    const countryData = iti.getSelectedCountryData();
    countryCodeInput.value = countryData.dialCode; // Ensure the country code is updated before submission
    // Optionally log to see what value is being submitted
    console.log("Country Code: ", countryCodeInput.value);
});

//# sourceMappingURL=index.1533e782.js.map
