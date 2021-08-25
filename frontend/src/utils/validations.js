export const emailValidation = (email) => {
  // eslint-disable-next-line no-useless-escape
  const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  return regex.test(email);
};

export const creditCardValidation = (event) => {
  const input = event.target.value.replaceAll(' ', '');
  const len = event.target.value.length;
  const type = event.nativeEvent.inputType;
  if (isNaN(event.nativeEvent.data) || event.nativeEvent.data === ' ') {
    return false;
  }
  if (len <= 19 && !isNaN(input)) {
    if (
      (len === 5 || len === 10 || len === 15) &&
      type === 'deleteContentBackward'
    ) {
      return event.target.value.trim();
    } else if (
      (len === 5 || len === 10 || len === 15) &&
      type === 'insertText'
    ) {
      return (
        event.target.value.slice(0, len - 1) +
        ' ' +
        event.target.value.slice(len - 1, len)
      );
    }
    if (len === 4 || len === 9 || len === 14) {
      if (type === 'deleteContentBackward') {
        return event.target.value;
      }
      return event.target.value + ' ';
    } else {
      return event.target.value;
    }
  }

  return false;
};

export const CpfValidation = (event) => {
  const len = event.target.value.length;
  const type = event.nativeEvent.inputType;
  const char = event.nativeEvent.data;
  if (isNaN(event.nativeEvent.data) || char === ' ') {
    return false;
  }

  if (len <= 14 && !isNaN(char)) {
    if ((len === 3 || len === 7) && type === 'deleteContentBackward') {
      return event.target.value;
    }
    if (len === 3 || len === 7) {
      return event.target.value + '.';
    }
    if ((len === 4 || len === 8) && type === 'deleteContentBackward') {
      return event.target.value.slice(0, len - 1);
    }
    if ((len === 4 || len === 8) && type === 'insertText') {
      return (
        event.target.value.slice(0, len - 1) +
        '.' +
        event.target.value.slice(len - 1, len)
      );
    }
    if (len === 11 && type === 'deleteContentBackward') {
      return event.target.value;
    }
    if (len === 11) {
      return event.target.value + '-';
    }
    if (len === 12 && type === 'deleteContentBackward') {
      return event.target.value.slice(0, len - 1);
    }
    if (len === 12 && type === 'insertText') {
      return (
        event.target.value.slice(0, len - 1) +
        '-' +
        event.target.value.slice(len - 1, len)
      );
    }

    return event.target.value;
  }

  return false;
};

export const PhoneValidation = (event) => {
  const len = event.target.value.length;
  const type = event.nativeEvent.inputType;
  const char = event.nativeEvent.data;
  if (isNaN(event.nativeEvent.data) || char === ' ') {
    return false;
  }

  if (len <= 15 && !isNaN(char)) {
    if (len === 5 && type === 'deleteContentBackward') {
      return event.target.value.trim();
    }
    if (len === 1 && type === 'deleteContentBackward') {
      return '';
    }
    if ((len === 4 || len === 5) && type === 'deleteContentBackward') {
      let str = event.target.value.trim();
      return str.slice(0, len - 2);
    }
    if (len === 11 && type === 'deleteContentBackward') {
      return event.target.value.slice(0, len - 1);
    }
    if (len === 1 && type === 'insertText') {
      return `(${event.target.value}`;
    }
    if (len === 3 && type === 'insertText') {
      return `${event.target.value}) `;
    }
    if (len === 5 && type === 'insertText') {
      return `${event.target.value.slice(0, 4)} ${event.target.value[len - 1]}`;
    }
    if (len === 10 && type === 'insertText') {
      return `${event.target.value}-`;
    }
    if (len === 11 && type === 'insertText') {
      return `${event.target.value.slice(0, 10)}-${
        event.target.value[len - 1]
      }`;
    }
    return event.target.value;
  }

  return false;
};

export const CepValidation = (event) => {
  const len = event.target.value.length;
  const type = event.nativeEvent.inputType;
  const char = event.nativeEvent.data;
  if (isNaN(event.nativeEvent.data) || char === ' ') {
    return false;
  }

  if (len <= 9 && !isNaN(char)) {
    if (len === 5 && type === 'insertText') {
      return event.target.value + '-';
    }
    if (len === 6 && type === 'insertText') {
      return `${event.target.value.slice(0, 5)}-${event.target.value[len - 1]}`;
    }
    if (len === 6 && type === 'deleteContentBackward') {
      return event.target.value.slice(0, len - 1);
    }

    return event.target.value;
  }

  return false;
};
