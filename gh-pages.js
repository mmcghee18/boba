var ghpages = require("gh-pages");

ghpages.publish(
  "build", // path to public directory
  {
    branch: "gh-pages",
    repo: "https://github.com/mmcghee18/boba", // Update to point to your repository
    user: {
      name: "Michelle McGhee", // update to use your name
      email: "michmac202@gmail.com", // Update to use your email
    },
    dotfiles: true,
  },
  () => {
    console.log("Deploy Complete!");
  }
);
