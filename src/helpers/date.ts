import { format, isValid } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

const DATE_COMPLETE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
const brasiliaTz = "America/Sao_Paulo";

function getCurrentDateInBrasilia(): string {
  const now = new Date();
  const dateInBrasilia = fromZonedTime(now, brasiliaTz);
  if (!isValid(dateInBrasilia)) {
    throw new Error("Invalid date");
  }
  const isoStringInBrasilia = format(dateInBrasilia, DATE_COMPLETE_FORMAT);
  return isoStringInBrasilia;
}

export { getCurrentDateInBrasilia };
