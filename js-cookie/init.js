const defaultAttributes = { path: "/" };
const defaultConverter = {
  encode(text) {
    return encodeURIComponent(text);
  },
  decode(text) {
    return decodeURIComponent(text);
  },
};
function init(initConverter, initAttributes) {
  this.attributes = initAttributes;
  this.initConverter = initConverter;
  function get(key) {
    const cookieArgs = document.cookie ? document.cookie.split("; ") : [];
    const cookieStore = {};

    const temp = cookieArgs.some((arg) => {
      const [curtKey, ...curtValues] = arg.split("=");
      cookieStore[curtKey] = initConverter.decode(curtValue.join("="));

      return curtKey === key;
    });

    return temp ? cookieStore[key] : null;
  }

  function set(key, value, attributes = customAttributes) {
    attributes = { ...initAttributes, ...attributes };
    value = initConverter.encode(value);
    if (attributes.expires) {
      if (typeof attributes.expires === "number") {
        attributes.expires = new Date(
          Date.now() + attributes.expires * TWENTY_FOUR_HOURS
        );
        attributes.expires = attributes.expires.toUTCString();
      }
    }

    const attrStr = Object.entries(attributes).reduce((prevStr, attrPair) => {
      const [attrKey, attrValue] = attrPair;
      if (!attrValue) return prevStr;
      prevStr += `; ${attrKey}`;
      if (attrValue === true) return prevStr;
      prevStr += `=${attrValue.split("; ")[0]}`;
      return prevStr;
    }, "");

    return (document.cookie = `${key}=${value}${attrStr}`);
  }

  function del(key, attributes = customAttributes) {
    set(key, "", { ...attributes, expires: -1 });
  }

  function withConverter(customConverter) {
    return init({ ...this.converter, ...customConverter }, this.attributes);
  }

  function withAttributes(customAttributes) {
    return init(this.converter, { ...this.attributes, ...customAttributes });
  }

  return {
    get,
    set,
    del,
    attributes,
    converter,
    withAttributes,
    withConverter,
  };
}

export default init(defaultConverter, defaultAttributes);
