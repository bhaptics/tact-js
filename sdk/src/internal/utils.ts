const utils = {
  sleep: (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  },
};

export default utils;
