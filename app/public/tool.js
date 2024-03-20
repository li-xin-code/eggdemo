function convertKeysUnderscoreToCamelCase(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const self = convertKeysCamelCaseToUnderscore;

  if (Array.isArray(obj)) {
    return obj.map(item => self(item));
  }

  return Object.keys(obj).reduce((result, key) => {
    const value = obj[key];
    const camelCaseKey = key.replace(/_([a-zA-Z0-9])/g, function(match, char) {
      return char.toUpperCase();
    });

    if (typeof value === 'object' && value !== null) {
      result[camelCaseKey] = self(value);
    } else {
      result[camelCaseKey] = value;
    }

    return result;
  }, {});
}

function convertKeysCamelCaseToUnderscore(obj) {
  const self = convertKeysCamelCaseToUnderscore;
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => self(item));
  }

  return Object.keys(obj).reduce((result, key) => {
    const value = obj[key];
    const underscoreKey = key.replace(/([A-Z])/g, function(match, char) {
      return '_' + char.toLowerCase();
    });

    if (typeof value === 'object' && value !== null) {
      result[underscoreKey] = self(value);
    } else {
      result[underscoreKey] = value;
    }

    return result;
  }, {});
}

module.exports = {
  convertKeysUnderscoreToCamelCase,
  convertKeysCamelCaseToUnderscore,
};
