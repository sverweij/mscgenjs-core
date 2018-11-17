"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var round_1 = __importDefault(require("../round"));
var svgprimitives = __importStar(require("../svgprimitives"));
var variationhelpers = __importStar(require("../variationhelpers"));
var SEGMENT_LENGTH = 70; // 70
var WOBBLE_FACTOR = 3; // 1.4?
function points2CurveString(pCurveSections) {
    return pCurveSections.map(function (pCurveSection) {
        return svgprimitives.pathPoint2String("S", pCurveSection.controlX, pCurveSection.controlY) + " " +
            ("" + svgprimitives.point2String(pCurveSection));
    }).join(" ");
}
exports.points2CurveString = points2CurveString;
function line2CurveString(pLine) {
    return points2CurveString(getBetweenPoints(pLine, SEGMENT_LENGTH, WOBBLE_FACTOR));
}
exports.line2CurveString = line2CurveString;
/**
 * Calculates the length of the given line
 * @param  {object} pLine an object with xFrom, yFrom and xTo and yTo
 *                        as properties
 * @return {number}       The length
 */
// internal exposed for unit testing
function getLineLength(pLine) {
    var lA = Math.abs(pLine.xTo - pLine.xFrom);
    var lB = Math.abs(pLine.yTo - pLine.yFrom);
    return Math.sqrt((lA * lA) + (lB * lB));
}
exports.getLineLength = getLineLength;
/**
 * Calculates the number of times a segment of pInterval length
 * can fit into pLine
 *
 * @param  {object} pLine     an object with xFrom, yFrom, and xTo and yTo
 * @param  {number} pInterval the length of the segments to fit into the
 *                            line
 * @return {number}           a natural number
 */
// internal exposed for unit testing
function getNumberOfSegments(pLine, pInterval) {
    var lLineLength = getLineLength(pLine);
    return lLineLength > 0 ? Math.floor(lLineLength / pInterval) : 0;
}
exports.getNumberOfSegments = getNumberOfSegments;
/**
 * Returns a random (real) number between -pNumber and +pNumber (inclusive)
 *
 * @param  {number} pNumber a real
 * @return {number}
 */
function getRandomDeviation(pNumber) {
    return Math.round(Math.random() * 2 * pNumber) - pNumber;
}
function normalizeInterval(pInterval, pLine) {
    if (pInterval <= 0) {
        throw new Error("pInterval must be > 0");
    }
    return Math.min(getLineLength(pLine), pInterval);
}
var PRECISION = 2;
/**
 * returns an array of curvepoints (x,y, controlX, controlY) along pLine,
 * at pInterval length intervals. The pWobble parameter influences the
 * amount controlX and controlY can at most deviate from the pLine.
 *
 *
 * @param  {object} pLine     a line (an object with xFrom, yFrom,
 *                            xTo, yTo properties)
 * @param  {number} pInterval The length of the interval between two
 *                            points on the line. Must be > 0. The
 *                            function throws an error in other cases
 * @param  {number} pWobble   The maximum amount of deviation allowed for
 *                            control points
 * @return {array}
 */
function getBetweenPoints(pLine, pInterval, pWobble) {
    pInterval = normalizeInterval(pInterval, pLine);
    var lRetval = [];
    var lNoSegments = getNumberOfSegments(pLine, pInterval);
    var lDir = variationhelpers.getDirection(pLine);
    var lIntervalX = lDir.signX * Math.sqrt(Math.pow(pInterval, 2) / (1 + Math.pow(lDir.dy, 2)));
    var lIntervalY = lDir.signY * (Math.abs(lDir.dy) === Infinity
        ? pInterval
        : Math.sqrt((Math.pow(lDir.dy, 2) * Math.pow(pInterval, 2)) / (1 + Math.pow(lDir.dy, 2))));
    var lCurveSection;
    for (var i = 1; i <= lNoSegments; i++) {
        lCurveSection = {
            controlX: round_1["default"](pLine.xFrom + (i - 0.5) * lIntervalX + getRandomDeviation(pWobble), PRECISION),
            controlY: round_1["default"](pLine.yFrom + (i - 0.5) * lIntervalY + getRandomDeviation(pWobble), PRECISION),
            x: round_1["default"](pLine.xFrom + i * lIntervalX, PRECISION),
            y: round_1["default"](pLine.yFrom + i * lIntervalY, PRECISION)
        };
        if (pInterval >
            getLineLength({
                xFrom: lCurveSection.x,
                yFrom: lCurveSection.y,
                xTo: pLine.xTo,
                yTo: pLine.yTo
            })) {
            lCurveSection.x = pLine.xTo;
            lCurveSection.y = pLine.yTo;
        }
        lRetval.push(lCurveSection);
    }
    return lRetval;
}
exports.getBetweenPoints = getBetweenPoints;
