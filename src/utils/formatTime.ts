const rtf = new Intl.RelativeTimeFormat("ru", { numeric: "auto" });

export const formatTime = (time: number): string => {
  const timeInSec = (new Date().getTime() - time * 1000) / 1000;

  switch (true) {
    case timeInSec < 60:
      return rtf.format(-Math.floor(timeInSec), "second");
    case timeInSec < 60 * 60:
      return rtf.format(-Math.floor(timeInSec / 60), "minute");
    case timeInSec < 60 * 60 * 24:
      return rtf.format(-Math.floor(timeInSec / (60 * 60)), "hour");
    case timeInSec < 60 * 60 * 24 * 30:
      return rtf.format(-Math.floor(timeInSec / (60 * 24 * 60)), "day");
    case timeInSec < 60 * 60 * 24 * 30 * 12:
      return rtf.format(-Math.floor(timeInSec / (60 * 24 * 30 * 60)), "month");
  }

  return rtf.format(-Math.floor(timeInSec / (60 * 24 * 30 * 60 * 12)), "year");
};
