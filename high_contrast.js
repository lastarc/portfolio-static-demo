window.addEventListener("load", function () {
  if (localStorage.getItem("high-contrast") === "1") {
    document.body.classList.add("high-contrast");
  }
});

document
  .querySelector("#high-contrast-toggle")
  .addEventListener("click", function () {
    document.body.classList.toggle("high-contrast");
    localStorage.setItem(
      "high-contrast",
      document.body.classList.contains("high-contrast") ? "1" : "0"
    );
  });
