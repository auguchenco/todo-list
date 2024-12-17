import { defaultResponseGenerator, successfulResponseGenerator, errorResponseGenerator } from "../config/generators/response.generator.js";

export const meCtrl = async (req, res) => {
  const defaultResponse = defaultResponseGenerator(res, 'user', 'send', 'sent');
  const { id, username } = req.user;
  try {
    successfulResponseGenerator({
      status: 200,
      data: { id, username },
      ...defaultResponse
    });

  } catch (error) {
    errorResponseGenerator({
      status: 500,
      error: error,
      ...defaultResponse
    });
  };
};
