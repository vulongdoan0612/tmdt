export const limitText = (text: string) => {
    if (text && text.length > 32) {
      return text.substring(0, 25) + '...' + text.slice(-3);
    }
    return text;
  };