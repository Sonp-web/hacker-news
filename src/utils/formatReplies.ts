const pr = new Intl.PluralRules("ru");
export const formatReplies = (number: number): string => {
  switch (pr.select(number)) {
    case "one":
      return `${number} ответ`;
    case "few":
      return `${number} ответа`;
    default:
      return `${number} ответов`;
  }
};
