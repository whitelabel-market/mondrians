import url from "url";

export const getUrlParts = (uri) => {
  if (uri) {
    const urlData = url.parse(uri, true);
    if (urlData.query) {
      return urlData.query;
    }
  }

  return {};
};

export const sortSpaceDelimitedString = (string) => {
  return string.split(" ").sort().join(" ");
};

export const ensureNoBackslash = (url) => {
  return url[url.length - 1] === "/" ? url.substring(0, url.length - 1) : url;
};

const wait = (interval) =>
  new Promise((resolve) => setTimeout(resolve, interval));

export const retry = async (fn, react, retriesLeft = 1, interval = 300) => {
  try {
    return await fn();
  } catch (e) {
    if (retriesLeft === 0) {
      throw new Error(e);
    }
    if (react) await react();
    await wait(interval);
    return retry(fn, react, --retriesLeft, interval);
  }
};

export const deepMerge = (source, target) => {
  for (const [key, val] of Object.entries(source)) {
    if (val !== null && typeof val === `object`) {
      if (target[key] === undefined) {
        target[key] = new val.__proto__.constructor();
      }
      deepMerge(val, target[key]);
    } else {
      target[key] = val;
    }
  }
  return target;
};
