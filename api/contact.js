import https from "https";

export default function handler(request, response) {
  const data = JSON.stringify({
    chat_id: process.env.TELEGRAM_CHAT_ID,
    text: `New contact form submission from the website ${
      process.env.VERCEL_URL && `(${process.env.VERCEL_URL})`
    }

First name: ${request.query["first-name"]}
Last name: ${request.query["last-name"]}
Email: ${request.query["email"]}
Reply expected: ${request.query["reply-expected"]}
Newsletter subscribed: ${request.query["newsletter-subscribed"]}
Message: 
${request.query["message"]}`,
  });

  const options = {
    hostname: "api.telegram.org",
    path: `/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  const next = (success) => {
    let url = request.query.next ? decodeURIComponent(request.query.next) : "/";
    if (url.indexOf("?") < 0) {
      url += "?";
    } else {
      url += "&";
    }
    url += `success=${success}`;
    return url;
  };

  const req = https
    .request(options, (res) => {
      let data = "";

      console.log("Status Code:", res.statusCode);

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log("Body: ", JSON.parse(data));
        response.redirect(next("1"));
      });
    })
    .on("error", (err) => {
      console.error("Error: ", err.message);
      response.redirect(next("0"));
    });

  req.write(data);
  req.end();
}
