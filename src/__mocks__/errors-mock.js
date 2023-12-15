export const mockErrors = (status = 400) => {
  const error = {
    request: undefined,
    response: undefined,
  };
  if (status === 400 || status === 404) {
    error.response = {
      data: {
        message: 'error',
      },
      status,
      request: {},
    };
  }
  if (status === undefined) {
    error.request = 'Request error';
  }
  return error;
};
