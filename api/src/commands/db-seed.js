const model = require('../models/sequelize');
const { testId } = require('../utils');

(async () => {
  try {
    const { Main, Message } = await model;
    await Main.create({
      name: `x --${testId()}`,
      value: `${testId()}`,
    });
    await Message.create({
      content: `test message --${testId()}`,
    });
  } catch (error) {
    console.error({ error });
  }
})();
