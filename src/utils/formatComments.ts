const pr = new Intl.PluralRules("ru");
export const formatComment = (number: number): string => {
  const temp = pr.select(number);
  let str = "";
  switch (temp) {
    case "one":
      str = "комментарий";
      break;
    case "few":
      str = "комментария";
      break;
    case "many":
      str = "комментариев";
      break;
    case "other":
      str = "комментария";
      break;
  }
  return `${number} ${str}`;
};
