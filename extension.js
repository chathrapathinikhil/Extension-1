// const site = window.location.hostname;
// alert("HSpons.com can read this site's data" + site);
// // Wait for the DOM to load
// window.addEventListener("load", function () {
//   // Select the company name element
//   let companyElement = document.querySelector(
//     ".job-details-jobs-unified-top-card__company-name"
//   );

//   if (companyElement) {
//     // Create a new button
//     let button = document.createElement("button");
//     button.textContent = "H1b info"; // The button's label
//     button.style.marginTop = "10px"; // Optional: styling
//     button.name = "h1b info-name";
//     button.className = "h1b info-class";

//     // Add event listener for button click
//     button.addEventListener("click", function () {
//       alert("Button clicked!"); // Replace with desired functionality
//     });

//     // Append the button after the company name
//     companyElement.parentNode.insertBefore(button, companyElement.nextSibling);
//   }
// });
(function () {
  "use strict";

  function getCompanyName() {
    const companyElement = document.querySelector(
      ".job-details-jobs-unified-top-card__company-name a"
    );
    return companyElement ? companyElement.textContent.trim() : null;
  }

  function addButton() {
    const companyNameContainer = document.querySelector(
      ".job-details-jobs-unified-top-card__company-name"
    );
    if (!companyNameContainer) return;

    const existingButton = document.querySelector(".h1b-info-button");
    if (existingButton) return;

    const button = document.createElement("button");
    button.textContent = "H1b info";
    button.className = "h1b-info-button";
    button.style.cssText = `
          margin-left: 10px;
          padding: 5px 10px;
          background-color: #0a66c2;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
      `;

    button.addEventListener("click", function () {
      const companyName = getCompanyName();
      if (companyName) {
        alert("Company Name: " + companyName);
        // Here you can add code to send the company name to your SQL server
      } else {
        alert("Company name not found");
      }
    });

    companyNameContainer.appendChild(button);
  }

  // Run on URL changes and DOM mutations
  const observer = new MutationObserver(() => {
    addButton();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Log to confirm script execution
  console.log("H1b info script loaded");
})();
