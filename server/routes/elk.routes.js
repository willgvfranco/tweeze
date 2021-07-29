var elasticsearch = require("elasticsearch");
require("dotenv").config();

var client = new elasticsearch.Client({
  host: `${process.env.ELK_HOST}:${process.env.ELK_PORT}`,
  log: "trace",
  httpAuth: "elastic:PiLFSnE1MlS1ySmv9czF",
});

const elkSearch = async (req, res) => {
  if (!req.body.pos) {
    res.send({ message: "Faltou o termo" });
    return;
  }
  const neg = req.body.neg || "";
  const size = req.body.qnt || 10;
  client
    .search({
      index: "noticias",
      size: size,
      body: {
        query: {
          bool: {
            must_not: {
              match: { title: neg },
            },
            must: { match: { title: req.body.pos } },
          },
        },
      },
    })
    .then((results) => {
      //   console.log(results.hits.hits.lenght);
      res.send(results.hits.hits);
    });
};
export default function (app) {
  app.post("/api/search", elkSearch);
}
