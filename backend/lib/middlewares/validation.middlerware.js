const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details[0].message;
      res.status(422).send({ error: errorMessage });
    }
    next();
  };
};

module.exports = validationMiddleware;
