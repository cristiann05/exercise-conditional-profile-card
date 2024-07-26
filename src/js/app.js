import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // Print on the console

  // Determine if cover should be included or not
  let cover = variables.includeCover
    ? `<div class="cover"><img src="${variables.background}" /></div>`
    : "";

  // Generate the URLs for social media
  let twitterURL = variables.twitter
    ? `https://twitter.com/${variables.twitter}`
    : "#";
  let githubURL = variables.github
    ? `https://github.com/${variables.github}`
    : "#";
  let linkedinURL = variables.linkedin
    ? `https://linkedin.com/in/${variables.linkedin}`
    : "#";
  let instagramURL = variables.instagram
    ? `https://instagram.com/${variables.instagram}`
    : "#";

  // Reset the website body with the new HTML output
  const widgetContent = document.querySelector("#widget_content");
  widgetContent.innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${variables.avatarURL}" class="photo" />
      <h1>${variables.name ? variables.name : "Your name"} ${
    variables.lastName ? variables.lastName : "Your lastname"
  }</h1>
      <h2>${variables.role ? variables.role : "Web Developer"}</h2>
      <h3>${variables.city ? variables.city : "Miami"}, ${
    variables.country ? variables.country : "USA"
  }</h3>
      <ul class="${variables.socialMediaPosition}">
        <li><a href="${twitterURL}"><i class="fab fa-twitter"></i></a></li>
        <li><a href="${githubURL}"><i class="fab fa-github"></i></a></li>
        <li><a href="${linkedinURL}"><i class="fab fa-linkedin"></i></a></li>
        <li><a href="${instagramURL}"><i class="fab fa-instagram"></i></a></li>
      </ul>
    </div>
  `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "position-left",
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // Render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // Add a listener to every input
      const attribute = e.target.getAttribute("for"); // When any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value === "" || this.value === "null"
          ? null
          : this.value === "true"
          ? true
          : this.value === "false"
          ? false
          : this.value;

      // Remove previous position classes
      if (attribute === "socialMediaPosition") {
        document
          .querySelector("#widget_content .widget ul")
          .classList.remove("position-left", "position-right");
      }

      // Update the variable and render the card again
      window.variables = Object.assign(window.variables, values);
      render(window.variables); // Render again the card with new values
    });
  });
};
