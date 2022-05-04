document
  .querySelector("#contact-send-api")
  .addEventListener("click", async function () {
    const url = new URL(location.origin + "/api/contact");
    const fdata = new FormData(document.querySelector("form"));
    for (const key of fdata.keys()) {
      url.searchParams.append(key, fdata.get(key));
    }
    const r = new URL((await fetch(url)).url);
    const success = r.searchParams.get("success") == "1" ? true : false;
    alert(
      success
        ? "Message has been successfully sent!"
        : "Unfortunately, message couldn't be sent. Please try again later."
    );
  });
