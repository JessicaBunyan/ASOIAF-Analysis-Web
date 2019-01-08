const bookNames = {
  AGOT: "A Game of Thrones",
  ACOK: "A Clash of Kings",
  ASOS: "A Storm of Swords",
  AFFC: "A Feast for Crows",
  ADWD: "A Dance with Dragons"
};

export function capitalise(word) {
  return word.substring(0, 1).toUpperCase() + word.substring(1);
}

export function bookNameFromCode(code) {
  return bookNames[code];
}
