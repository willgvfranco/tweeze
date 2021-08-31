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

export const GetCardType = (string) => {
  const number = string.replaceAll(' ', '');
  if (
    number.startsWith('636368') ||
    number.startsWith('438935') ||
    number.startsWith('504175') ||
    number.startsWith('451416') ||
    number.startsWith('509048') ||
    number.startsWith('509067') ||
    number.startsWith('509049') ||
    number.startsWith('509069') ||
    number.startsWith('509050') ||
    number.startsWith('509074') ||
    number.startsWith('509068') ||
    number.startsWith('509040') ||
    number.startsWith('509045') ||
    number.startsWith('509051') ||
    number.startsWith('509046') ||
    number.startsWith('509066') ||
    number.startsWith('509047') ||
    number.startsWith('509042') ||
    number.startsWith('509052') ||
    number.startsWith('509043') ||
    number.startsWith('509064') ||
    number.startsWith('36297') ||
    number.startsWith('5067') ||
    number.startsWith('4576') ||
    number.startsWith('4011')
  ) {
    return 'Elo';
  }
  if (
    number.startsWith('6011') ||
    number.startsWith('622') ||
    number.startsWith('64') ||
    number.startsWith('65')
  ) {
    return 'Discover';
  }
  if (number.startsWith('34') || number.startsWith('37')) {
    return 'Amex';
  }
  if (number[0] === '4') {
    return 'Visa';
  }
  if (number[0] === '5') {
    return 'Mastercard';
  }

  return;
};
