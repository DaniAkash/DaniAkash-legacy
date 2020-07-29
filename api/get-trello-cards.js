import fetch from "node-fetch";

export default (req, res) => {
  fetch(
    `https://api.trello.com/1/lists/5ef35d394ed00820a569fb70/cards?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
  )
    .then((response) => response.json())
    .then((result) => {
      const list = result.map((each) => {
        return `<li><a href="${each.url}" target="_blank">${each.name}</a></li>`;
      });
      res.status(200).send(
        `
        <svg fill="none" viewBox="0 0 800 400" width="800" height="400" xmlns="http://www.w3.org/2000/svg">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml">
              <style>
              </style>
              <ul>
                ${list.reduce((acc, each) => acc + each, "")}
              </ul>
            </div>
          </foreignObject>
        </svg>
        `
      );
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Something went wrong...");
    });
};
