module.exports = (app) => {
  app.use((req, res, next) => {
    res.status(404).json("not-found");
  });

  app.use((err, req, res, next) => {
    console.error("ERROR", req.method, req.path, err);

    if (!res.headersSent) {
      res.status(500).json("HOLA LLEGUÉ AQUÍ");
    }
  });
};
