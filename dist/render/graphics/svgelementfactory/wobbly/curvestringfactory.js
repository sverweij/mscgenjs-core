"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var svgprimitives_1 = __importDefault(require("../svgprimitives"));
var variationhelpers_1 = __importDefault(require("../variationhelpers"));
var helpers_1 = require("./helpers");
function renderNotePathString(pBBox, pFoldSize) {
    return svgprimitives_1["default"].pathPoint2String("M", pBBox.x, pBBox.y) +
        // top line:
        helpers_1.line2CurveString({
            xFrom: pBBox.x,
            yFrom: pBBox.y,
            xTo: pBBox.x + pBBox.width - pFoldSize,
            yTo: pBBox.y
        }) +
        svgprimitives_1["default"].pathPoint2String("L", pBBox.x + pBBox.width - pFoldSize, pBBox.y) +
        // fold:
        helpers_1.line2CurveString({
            xFrom: pBBox.x + pBBox.width - pFoldSize,
            yFrom: pBBox.y,
            xTo: pBBox.x + pBBox.width,
            yTo: pBBox.y + pFoldSize
        }) +
        svgprimitives_1["default"].pathPoint2String("L", pBBox.x + pBBox.width, pBBox.y + pFoldSize) +
        // down:
        helpers_1.line2CurveString({
            xFrom: pBBox.x + pBBox.width,
            yFrom: pBBox.y + pFoldSize,
            xTo: pBBox.x + pBBox.width,
            yTo: pBBox.y + pBBox.height
        }) +
        svgprimitives_1["default"].pathPoint2String("L", pBBox.x + pBBox.width, pBBox.y + pBBox.height) +
        // bottom line:
        helpers_1.line2CurveString({
            xFrom: pBBox.x + pBBox.width,
            yFrom: pBBox.y + pBBox.height,
            xTo: pBBox.x,
            yTo: pBBox.y + pBBox.height
        }) +
        svgprimitives_1["default"].pathPoint2String("L", pBBox.x, pBBox.y + pBBox.height) +
        // home:
        helpers_1.line2CurveString({
            xFrom: pBBox.x,
            yFrom: pBBox.y + pBBox.height,
            xTo: pBBox.x,
            yTo: pBBox.y
        }) +
        svgprimitives_1["default"].pathPoint2String("L", pBBox.x, pBBox.y) +
        "z";
}
exports.renderNotePathString = renderNotePathString;
function renderNoteCornerString(pBBox, pFoldSize) {
    return svgprimitives_1["default"].pathPoint2String("M", pBBox.x + pBBox.width - pFoldSize, pBBox.y) +
        // down
        helpers_1.line2CurveString({
            xFrom: pBBox.x + pBBox.width - pFoldSize,
            yFrom: pBBox.y,
            xTo: pBBox.x + pBBox.width - pFoldSize,
            yTo: pBBox.y + pFoldSize
        }) +
        svgprimitives_1["default"].pathPoint2String("L", pBBox.x + pBBox.width - pFoldSize, pBBox.y + pFoldSize) +
        // right
        helpers_1.line2CurveString({
            xFrom: pBBox.x + pBBox.width - pFoldSize,
            yFrom: pBBox.y + pFoldSize,
            xTo: pBBox.x + pBBox.width,
            yTo: pBBox.y + pFoldSize
        }) +
        svgprimitives_1["default"].pathPoint2String("L", pBBox.x + pBBox.width, pBBox.y + pFoldSize);
}
exports.renderNoteCornerString = renderNoteCornerString;
function abox2CurveString(pBBox, pSlopeOffset) {
    return svgprimitives_1["default"].pathPoint2String("M", pBBox.x, pBBox.y + (pBBox.height / 2)) +
        helpers_1.line2CurveString({
            xFrom: pBBox.x,
            yFrom: pBBox.y + (pBBox.height / 2),
            xTo: pBBox.x + pSlopeOffset,
            yTo: pBBox.y
        }) +
        svgprimitives_1["default"].pathPoint2String("L", pBBox.x + pSlopeOffset, pBBox.y) +
        // top line
        helpers_1.line2CurveString({
            xFrom: pBBox.x + pSlopeOffset,
            yFrom: pBBox.y,
            xTo: pBBox.x + pBBox.width - pSlopeOffset,
            yTo: pBBox.y
        }) +
        svgprimitives_1["default"].pathPoint2String("L", pBBox.x + pBBox.width - pSlopeOffset, pBBox.y) +
        // right wedge
        helpers_1.line2CurveString({
            xFrom: pBBox.x + pBBox.width - pSlopeOffset,
            yFrom: pBBox.y,
            xTo: pBBox.x + pBBox.width,
            yTo: pBBox.y + pBBox.height / 2
        }) +
        svgprimitives_1["default"].pathPoint2String("L", pBBox.x + pBBox.width, pBBox.y + pBBox.height / 2) +
        helpers_1.line2CurveString({
            xFrom: pBBox.x + pBBox.width,
            yFrom: pBBox.y + pBBox.height / 2,
            xTo: pBBox.x + pBBox.width - pSlopeOffset,
            yTo: pBBox.y + pBBox.height
        }) +
        svgprimitives_1["default"].pathPoint2String("L", pBBox.x + pBBox.width - pSlopeOffset, pBBox.y + pBBox.height) +
        // bottom line:
        helpers_1.line2CurveString({
            xFrom: pBBox.x + pBBox.width - pSlopeOffset,
            yFrom: pBBox.y + pBBox.height,
            xTo: pBBox.x + pSlopeOffset,
            yTo: pBBox.y + pBBox.height
        }) +
        svgprimitives_1["default"].pathPoint2String("L", pBBox.x + pSlopeOffset, pBBox.y + pBBox.height) +
        // home:
        helpers_1.line2CurveString({
            xFrom: pBBox.x + pSlopeOffset,
            yFrom: pBBox.y + pBBox.height,
            xTo: pBBox.x,
            yTo: pBBox.y + (pBBox.height / 2)
        }) +
        "z";
}
exports.abox2CurveString = abox2CurveString;
function rbox2CurveString(pBBox, pRBoxCornerRadius) {
    return svgprimitives_1["default"].pathPoint2String("M", pBBox.x, pBBox.y + pRBoxCornerRadius) +
        helpers_1.points2CurveString([{
                controlX: pBBox.x,
                controlY: pBBox.y,
                x: pBBox.x + pRBoxCornerRadius,
                y: pBBox.y
            }]) +
        // top
        helpers_1.line2CurveString({
            xFrom: pBBox.x + pRBoxCornerRadius,
            yFrom: pBBox.y,
            xTo: pBBox.x + pBBox.width - pRBoxCornerRadius,
            yTo: pBBox.y
        }) +
        svgprimitives_1["default"].pathPoint2String("L", pBBox.x + pBBox.width - pRBoxCornerRadius, pBBox.y) +
        helpers_1.points2CurveString([{
                controlX: pBBox.x + pBBox.width,
                controlY: pBBox.y,
                x: pBBox.x + pBBox.width,
                y: pBBox.y + pRBoxCornerRadius
            }]) +
        // right
        helpers_1.line2CurveString({
            xFrom: pBBox.x + pBBox.width,
            yFrom: pBBox.y + pRBoxCornerRadius,
            xTo: pBBox.x + pBBox.width,
            yTo: pBBox.y + pBBox.height - pRBoxCornerRadius
        }) +
        svgprimitives_1["default"].pathPoint2String("L", pBBox.x + pBBox.width, pBBox.y + pBBox.height - pRBoxCornerRadius) +
        helpers_1.points2CurveString([{
                controlX: pBBox.x + pBBox.width,
                controlY: pBBox.y + pBBox.height,
                x: pBBox.x + pBBox.width - pRBoxCornerRadius,
                y: pBBox.y + pBBox.height
            }]) +
        // bottom
        helpers_1.line2CurveString({
            xFrom: pBBox.x + pBBox.width - pRBoxCornerRadius,
            yFrom: pBBox.y + pBBox.height,
            xTo: pBBox.x + pRBoxCornerRadius,
            yTo: pBBox.y + pBBox.height
        }) +
        svgprimitives_1["default"].pathPoint2String("L", pBBox.x + pRBoxCornerRadius, pBBox.y + pBBox.height) +
        helpers_1.points2CurveString([{
                controlX: pBBox.x,
                controlY: pBBox.y + pBBox.height,
                x: pBBox.x,
                y: pBBox.y + pBBox.height - pRBoxCornerRadius
            }]) +
        // up
        helpers_1.line2CurveString({
            xFrom: pBBox.x,
            yFrom: pBBox.y + pBBox.height - pRBoxCornerRadius,
            xTo: pBBox.x,
            yTo: pBBox.y + pRBoxCornerRadius
        }) +
        "z";
}
exports.rbox2CurveString = rbox2CurveString;
function doubleLine2CurveString(pLine, pOptions) {
    var lLineWidth = pOptions.lineWidth || 1;
    var lSpace = lLineWidth;
    var lClass = pOptions ? pOptions["class"] : "";
    var lDir = variationhelpers_1["default"].getDirection(pLine);
    var lEndCorr = variationhelpers_1["default"].determineEndCorrection(pLine, lClass, lLineWidth);
    var lStartCorr = variationhelpers_1["default"].determineStartCorrection(pLine, lClass, lLineWidth);
    return svgprimitives_1["default"].pathPoint2String("M", pLine.xFrom, (pLine.yFrom - 7.5 * lLineWidth * lDir.dy)) +
        // left stubble:
        svgprimitives_1["default"].pathPoint2String("l", lDir.signX, lDir.dy) +
        svgprimitives_1["default"].pathPoint2String("M", pLine.xFrom + lStartCorr, pLine.yFrom - lSpace) +
        // upper line:
        helpers_1.line2CurveString({
            xFrom: pLine.xFrom + lStartCorr,
            yFrom: pLine.yFrom - lSpace,
            xTo: pLine.xTo + lEndCorr,
            yTo: pLine.yTo - lSpace
        }) +
        svgprimitives_1["default"].pathPoint2String("M", pLine.xFrom + lStartCorr, pLine.yFrom + lSpace) +
        // lower line
        helpers_1.line2CurveString({
            xFrom: pLine.xFrom + lStartCorr,
            yFrom: pLine.yFrom + lSpace,
            xTo: pLine.xTo + lEndCorr,
            yTo: pLine.yTo + lSpace
        }) +
        svgprimitives_1["default"].pathPoint2String("M", pLine.xTo - lDir.signX, pLine.yTo + 7.5 * lLineWidth * lDir.dy) +
        // right stubble
        svgprimitives_1["default"].pathPoint2String("l", lDir.signX, lDir.dy);
}
exports.doubleLine2CurveString = doubleLine2CurveString;
function edgeRemark2CurveString(pBBox, pFoldSize) {
    return svgprimitives_1["default"].pathPoint2String("M", pBBox.x + pBBox.width, pBBox.y) +
        // down:
        helpers_1.line2CurveString({
            xFrom: pBBox.x + pBBox.width,
            yFrom: pBBox.y,
            xTo: pBBox.x + pBBox.width,
            yTo: pBBox.y + pBBox.height - pFoldSize
        }) +
        svgprimitives_1["default"].pathPoint2String("L", pBBox.x + pBBox.width, pBBox.y + pBBox.height - pFoldSize) +
        // fold:
        helpers_1.line2CurveString({
            xFrom: pBBox.x + pBBox.width,
            yFrom: pBBox.y + pBBox.height - pFoldSize,
            xTo: pBBox.x + pBBox.width - pFoldSize,
            yTo: pBBox.y + pBBox.height
        }) +
        svgprimitives_1["default"].pathPoint2String("L", pBBox.x + pBBox.width - pFoldSize, pBBox.y + pBBox.height) +
        // bottom line:
        helpers_1.line2CurveString({
            xFrom: pBBox.x + pBBox.width - pFoldSize,
            yFrom: pBBox.y + pBBox.height,
            xTo: pBBox.x - 1,
            yTo: pBBox.y + pBBox.height
        }) +
        svgprimitives_1["default"].pathPoint2String("L", pBBox.x - 1, pBBox.y + pBBox.height);
}
exports.edgeRemark2CurveString = edgeRemark2CurveString;
