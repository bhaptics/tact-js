const utils = {
    sleep: (ms) => {
        const loopTime = Date.now() + ms;
        while (Date.now() < loopTime) { }
    },
};

export default utils;