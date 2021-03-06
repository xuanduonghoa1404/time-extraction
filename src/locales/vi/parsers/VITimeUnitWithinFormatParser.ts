import { TIME_UNITS_PATTERN, parseTimeUnits } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN_WITH_PREFIX = new RegExp(
    `(?:within|in|for|vào)\\s*` +
        `(?:(?:about|around|roughly|approximately|just|khoảng)\\s*(?:~\\s*)?)?(${TIME_UNITS_PATTERN})(?=\\W|$)`,//todo
    "i"
);

const PATTERN_WITHOUT_PREFIX = new RegExp(
    `(?:(?:about|around|roughly|approximately|just|khoảng)\\s*(?:~\\s*)?)?(${TIME_UNITS_PATTERN})(?=\\W|$)`,//todo
    "i"
);

export default class VITimeUnitWithinFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return context.option.forwardDate ? PATTERN_WITHOUT_PREFIX : PATTERN_WITH_PREFIX;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const timeUnits = parseTimeUnits(match[1]);
        return ParsingComponents.createRelativeFromRefDate(context.refDate, timeUnits);
    }
}
