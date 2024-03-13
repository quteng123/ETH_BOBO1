import axios from "axios";
import * as cheerio from "cheerio";
import colors from "colors";

function scrapTp(userInput) {
  const availableCommands = ["link", "header", "both"];
  if (!availableCommands.includes(userInput)) {
    console.log("Invalid option. Please enter 'link', 'header', or 'both'.");
  } else {
    axios
      .get("https://arstechnica.com/information-technology/")
      .then((urlResponse) => {
        const $ = cheerio.load(urlResponse.data);

        $("li.article").each((i, element) => {
          const title = $(element).find("header h2 a").text();
          const link = $(element).find("a.overlay").attr("href");

          const result =
            userInput === "both"
              ? `${i + 1}. Headline: ${title}\nLink: ${link.cyan}`
              : userInput === "link"
              ? `${i + 1}. Link: ${link.cyan}`
              : userInput === "header"
              ? `${i + 1}. Headline: ${title}`
              : "";

          result && console.log(`${result}\n---------------------\n`);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }
}

export default scrapTp;
