import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import { findYearClosestToRef } from "../../../calculation/years";
import { MONTH_DICTIONARY, TIME_UNITS_PATTERN, HHmm_PATTERN, DDMMYY_PATTERN,parseDDMMYY, parseHHmm } from "../constants";
import { YEAR_PATTERN, parseYear } from "../constants";
import { ORDINAL_NUMBER_PATTERN, parseOrdinalNumberPattern, parseTimeUnits } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseTimeUnits } from "../../../utils/timeunits";
import dayjs from "dayjs";
import * as references from "../../../common/casualReferences";
import { assignSimilarDate } from "../../../utils/dayjs";

const PATTERN = new RegExp("" + "(" + HHmm_PATTERN + ")", "i");
// const PATTERN = new RegExp("" + "(" + HHmm_PATTERN + ")"  + "(bây\s*giờ|hôm\s*nay|tối\s*nay|ngày\s*mai|mai|hôm\s*qua|nay|tối\s*qua)(?=(?:\\W|$))", "i");
// const PATTERN = new RegExp("" + "(" + DDMMYY_PATTERN + ")" + "(?=(?:\\W|$))", "i");
// const PATTERN = new RegExp("" + "(" + HHmm_PATTERN + ")" + "(" + DDMMYY_PATTERN + ")" + "(?=(?:\\W|$))", "i");


// const DATE_GROUP = 1;
// const DATE_TO_GROUP = 2;
// const MONTH_NAME_GROUP = 3;
// const YEAR_GROUP = 4;

export default class VITime extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    // innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        //console.log(match)

        // const result = context.createParsingResult(match.index, match[0]);
        // const timeUnits = parseHHmm(match[1]);
        // const timeUnits2 = parseDDMMYY(match[2]);
        // // const outputTimeUnits = reverseTimeUnits(timeUnits);
        // result.start.assign("day", timeUnits.date);
        // result.end.assign("day", timeUnits2.date);

        // return result;


        // let timeUnits = parseHHmm(match[1]);
        // const dateUnit = parseDDMMYY(match[2]);

        // timeUnits.date = dateUnit.date;
        // timeUnits.month = dateUnit.month;
        // timeUnits.year = dateUnit.year;
        // let outputTimeUnits = reverseTimeUnits(timeUnits);


        // return ParsingComponents.createRelativeFromRefDate(context.refDate, timeUnits);
        

    // }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        let targetDate = dayjs(context.refDate);
        const component = context.createParsingComponents();
        let timeUnits = parseHHmm(match[1]);
        assignSimilarDate(component, targetDate);
        component.imply("hour", timeUnits.hour);
        component.imply("minute", timeUnits.minute);
        return component;
    }
}
