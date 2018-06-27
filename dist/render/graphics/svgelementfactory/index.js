"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const straight_1 = __importDefault(require("./straight"));
const svgprimitives_1 = __importDefault(require("./svgprimitives"));
const wobbly_1 = __importDefault(require("./wobbly"));
let gRenderMagic = straight_1.default;
let gOptions = {};
function determineRenderMagic(pRenderMagic) {
    if (!Boolean(pRenderMagic)) {
        return gRenderMagic;
    }
    /* istanbul ignore if */
    if ("wobbly" === pRenderMagic) {
        return wobbly_1.default;
    }
    return straight_1.default;
}
exports.default = {
    /**
     * Function to set the document to use. Introduced to enable use of the
     * rendering utilities under node.js (using the jsdom module)
     *
     * @param {document} pDocument
     */
    init(pDocument, pOptions) {
        svgprimitives_1.default.init(pDocument);
        gOptions = Object.assign({
            LINE_WIDTH: 2,
            FONT_SIZE: 12,
        }, pOptions);
    },
    /**
     * Creates a basic SVG with id pId, and size 0x0
     */
    createSVG(pId, pClass, pRenderMagic) {
        gRenderMagic = determineRenderMagic(pRenderMagic);
        return svgprimitives_1.default.createSVG(pId, pClass);
    },
    updateSVG: svgprimitives_1.default.updateSVG,
    createTitle: svgprimitives_1.default.createTitle,
    /**
     * Creates a desc element with id pId
     *
     * @param {string} pID
     * @returns {SVGDescElement}
     */
    createDesc: svgprimitives_1.default.createDesc,
    /**
     * Creates an empty 'defs' element
     *
     * @returns {SVGDefsElement}
     */
    createDefs: svgprimitives_1.default.createDefs,
    /**
     * creates a tspan with label pLabel, optionally wrapped in a link
     * if the url pURL is passed
     */
    createTSpan: svgprimitives_1.default.createTSpan,
    /**
     * Creates an svg rectangle of width x height, with the top left
     * corner at coordinates (x, y). pRX and pRY define the amount of
     * rounding the corners of the rectangle get; when they're left out
     * the function will render the corners as straight.
     *
     * Unit: pixels
     */
    createRect: (pBBox, pOptions) => gRenderMagic.createRect(pBBox, pOptions),
    /**
     * Creates rect with 6px rounded corners of width x height, with the top
     * left corner at coordinates (x, y)
     */
    createRBox: (pBBox, pOptions) => gRenderMagic.createRBox(pBBox, pOptions),
    /**
     * Creates an angled box of width x height, with the top left corner
     * at coordinates (x, y)
     */
    createABox: (pBBox, pOptions) => gRenderMagic.createABox(pBBox, pOptions),
    /**
     * Creates a note of pWidth x pHeight, with the top left corner
     * at coordinates (pX, pY). pFoldSize controls the size of the
     * fold in the top right corner.
     */
    createNote: (pBBox, pOptions) => gRenderMagic.createNote(pBBox, pOptions),
    /**
     * Creates an edge remark (for use in inline expressions) of width x height,
     * with the top left corner at coordinates (x, y). pFoldSize controls the size of the
     * fold bottom right corner.
     */
    createEdgeRemark(pBBox, pOptions) {
        return gRenderMagic.createEdgeRemark(pBBox, {
            class: pOptions.class,
            color: pOptions.color,
            bgColor: pOptions.bgColor,
            foldSize: pOptions.foldSize,
            lineWidth: gOptions.LINE_WIDTH,
        });
    },
    /**
     * Creates a text node with the appropriate tspan & a elements on
     * position pCoords.
     */
    createText: svgprimitives_1.default.createText,
    /**
     * Creates a text node with the given pText fitting diagonally (bottom-left
     *  - top right) in canvas pCanvas
     */
    createDiagonalText: svgprimitives_1.default.createDiagonalText,
    /**
     * Creates a line between to coordinates
     */
    createLine(pLine, pOptions) {
        if (Boolean(pOptions) && Boolean(pOptions.doubleLine)) {
            if (!pOptions.lineWidth) {
                pOptions.lineWidth = gOptions.LINE_WIDTH;
            }
            return gRenderMagic.createDoubleLine(pLine, pOptions);
        }
        else {
            return gRenderMagic.createSingleLine(pLine, pOptions);
        }
    },
    /**
     * Creates a u-turn, departing on pStartX, pStarty and
     * ending on pStartX, pEndY with a width of pWidth
     *
     * @param {object} pBBox
     * @param {object} pOptions
     * @return {SVGPathElement}
     */
    createUTurn: svgprimitives_1.default.createUTurn,
    /**
     * Creates an svg group, identifiable with id pId
     * @param {string} pId
     * @return {SVGGElement}
     */
    createGroup: svgprimitives_1.default.createGroup,
    /**
     * Create an arrow marker consisting of a path as specified in pD
     *
     * @param {string} pId
     * @param {string} pD - a string containing the path
     * @return {SVGPathElement}
     */
    createMarkerPath: svgprimitives_1.default.createMarkerPath,
    /**
     * Create a (filled) arrow marker consisting of a polygon as specified in pPoints
     *
     * @param {string} pId
     * @param {string} pPoints - a string with the points of the polygon
     * @return {SVGPolygonElement}
     */
    createMarkerPolygon: svgprimitives_1.default.createMarkerPolygon,
};
/*
 This file is part of mscgen_js.

 mscgen_js is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 mscgen_js is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with mscgen_js.  If not, see <http://www.gnu.org/licenses/>.
 */
