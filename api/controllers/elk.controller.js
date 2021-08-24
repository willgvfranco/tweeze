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

  const beginDate = req.body.beginDate;
  const endDate = req.body.endDate;

  const query = {
    index: "noticias",
    size: size,
    from: from,
    body: {
      query: {
        bool: {
          must: [
            {
              query_string: {
                query: queryString,
                fields: ["title", "description"],
              },
            },
            {
              range: {
                criado: {
                  gte: beginDate || "now-90d",
                  lte: endDate || "now",
                },
              },
            },
          ],
        },
      },
      sort: [
        {
          criado: {
            order: "desc",
            format: "strict_date_optional_time_nanos",
            unmapped_type: "date",
          },
        },
        "_score",
      ],
    },
  };

  client.search(query).then((results) => {
    //   console.log(results.hits.hits.lenght);
    res.send(results);
  });
};
