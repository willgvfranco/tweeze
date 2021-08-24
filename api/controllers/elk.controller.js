var elasticsearch = require("elasticsearch");
require("dotenv").config();

var client = new elasticsearch.Client({
  host: `${process.env.ELK_HOST}:${process.env.ELK_PORT}`,
  log: "trace",
  httpAuth: "elastic:PiLFSnE1MlS1ySmv9czF",
});

export const elkSearch = async (req, res) => {
  if (!req.body.pos) {
    res.send({ message: "Faltou o termo" });
    return;
  }
  const pos = req.body.pos || "";
  const from = req.body.from || 0;
  const neg = req.body.neg || "";
  const size = req.body.qnt || 100;

  const queryString = neg ? pos + " NOT " + neg : pos;
  client
    .search({
      index: "noticias",
      size: size,
      from: from,
      body: {
        query: {
          // bool: {
          //   must_not: {
          //     match: { title: neg },
          //   },
          //   must: { match: { title: req.body.pos } },
          // },
          query_string: {
            query: queryString,
            fields: ["title", "description"],
          },
          // range: {
          //   timestamp: {
          //     time_zone: "-03:00",
          //     gte: "2020-01-01T00:00:00",
          //     lte: "now",
          //   },
          // },
        },
        sort: [
          {
            criado: {
              order: "desc",
              format: "strict_date_optional_time_nanos",
            },
          },
          "_score",
        ],
      },
    })
    .then((results) => {
      //   console.log(results.hits.hits.lenght);
      res.send(results.hits.hits);
    });
};
