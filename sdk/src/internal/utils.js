const utils = {
  sleep: (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  },
};

export default utils;
