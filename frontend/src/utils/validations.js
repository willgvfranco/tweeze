export const emailValidation = (email) => {
  // eslint-disable-next-line no-useless-escape
  const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  return regex.test(email);
};

export const creditCardValidation = (event) => {
  const input = event.target.value.replaceAll(' ', '');
  const len = event.target.value.length;
  if (isNaN(event.nativeEvent.data) || event.nativeEvent.data === ' ') {
    return false;
  }
  if (len <= 19 && !isNaN(input)) {
    if (
      (len === 5 || len === 10 || len === 15) &&
      event.nativeEvent.inputType === 'deleteContentBackward'
    ) {
      return event.target.value.trim();
    } else if (
      (len === 5 || len === 10 || len === 15) &&
      event.nativeEvent.inputType === 'insertText'
    ) {
      return (
        event.target.value.slice(0, len - 1) +
        ' ' +
        event.target.value.slice(len - 1, len)
      );
    }
    if (len === 4 || len === 9 || len === 14) {
      if (event.nativeEvent.inputType === 'deleteContentBackward') {
        return event.target.value;
      }
      return event.target.value + ' ';
    } else {
      return event.target.value;
    }
  }

  return false;
};
