import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { WEEKDAY_DICTIONARY } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { toDayJSWeekday } from "../../../calculation/weeks";

const PATTERN = new RegExp(
    "(?:(?:\\,|\\(|\\（)\\s*)?" +
        "(?:vào\\s*?)?" +
        `(${matchAnyPattern(WEEKDAY_DICTIONARY)})` +
        "(?:\\s*(này|trước|tới|tiếp|sau)\\s*)?" +
        "(?:\\s*(?:\\,|\\)|\\）))?" +
        "(?:\\s*tuần\\s*(này|trước|tới|tiếp|sau))?" +
        "(?=\\W|$)",//todo
    "i"
);

const PREFIX_GROUP = 2;
const WEEKDAY_GROUP = 1;
const POSTFIX_GROUP = 3;

export default class VIWeekdayParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        const offset = WEEKDAY_DICTIONARY[dayOfWeek];
        const prefix = match[PREFIX_GROUP];
        const postfix = match[POSTFIX_GROUP];
        let modifierWord = prefix || postfix;
        modifierWord = modifierWord || "";
        modifierWord = modifierWord.toLowerCase();

        let modifier = null;
        if (modifierWord == "last" || modifierWord == "past"|| modifierWord == "trước") {
            modifier = "last";
        }  else if (modifierWord == "tiếp" || modifierWord == "tới"|| modifierWord == "sau") {
            modifier = "next";
        } else if (modifierWord == "this"|| modifierWord == "này") {
            modifier = "this";
        }

        const date = toDayJSWeekday(context.refDate, offset, modifier);
        return context
            .createParsingComponents()
            .assign("weekday", offset)
            .imply("day", date.date())
            .imply("month", date.month() + 1)
            .imply("year", date.year());
    }
}
