const validationMiddleware = (schema) => {
  return (req, res, next) => {
    if (!req.body) return res.status(422).send({ error: "Body is required" });

    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(422).send({ error: errorMessage });
    }
    next();
  };
};

module.exports = validationMiddleware;
