"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aggregatekind_1 = __importDefault(require("./aggregatekind"));
const asttransform_1 = __importDefault(require("./asttransform"));
const colorizeschemes_1 = __importDefault(require("./colorizeschemes"));
let gColorCombiCount = 0;
function getArcColorCombis(pColorScheme, pKind) {
    const lArcCombi = pColorScheme.arcColors[pKind];
    if (lArcCombi) {
        return lArcCombi;
    }
    else {
        return pColorScheme.aggregateArcColors[aggregatekind_1.default(pKind)];
    }
}
function colorizeArc(pColorScheme) {
    return (pArc) => {
        if (!hasColors(pArc)) {
            const lColorCombi = getArcColorCombis(pColorScheme, pArc.kind);
            if (lColorCombi) {
                pArc.linecolor = lColorCombi.linecolor;
                if (lColorCombi.textcolor) {
                    pArc.textcolor = lColorCombi.textcolor;
                }
                pArc.textbgcolor = lColorCombi.textbgcolor;
            }
        }
        return pArc;
    };
}
function getNextColorCombi(pColorScheme) {
    const lColorCombiCount = gColorCombiCount;
    if (gColorCombiCount < pColorScheme.entityColors.length - 1) {
        gColorCombiCount += 1;
    }
    else {
        gColorCombiCount = 0;
    }
    return pColorScheme.entityColors[lColorCombiCount];
}
function hasColors(pArcOrEntity) {
    return ["linecolor", "textcolor", "textbgcolor", "arclinecolor", "arctextcolor", "arctextbgcolor"]
        .some((pColorAttr) => Boolean(pArcOrEntity[pColorAttr]));
}
function colorizeEntity(pColorScheme) {
    return (pEntity) => {
        if (!hasColors(pEntity)) {
            const lNextColorCombi = getNextColorCombi(pColorScheme);
            pEntity.linecolor = lNextColorCombi.linecolor;
            pEntity.textbgcolor = lNextColorCombi.textbgcolor;
            if (lNextColorCombi.textcolor) {
                pEntity.textcolor = lNextColorCombi.textcolor;
                pEntity.arctextcolor = lNextColorCombi.textcolor;
            }
            pEntity.arclinecolor = lNextColorCombi.linecolor;
        }
        return pEntity;
    };
}
function _colorize(pAST, pColorScheme, pForce) {
    gColorCombiCount = 0;
    return asttransform_1.default(pForce ? _uncolor(pAST) : pAST, [colorizeEntity(pColorScheme)], [colorizeArc(pColorScheme)]);
}
function uncolorThing(pThing) {
    delete pThing.linecolor;
    delete pThing.textcolor;
    delete pThing.textbgcolor;
    delete pThing.arclinecolor;
    delete pThing.arctextcolor;
    delete pThing.arctextbgcolor;
    return pThing;
}
function _uncolor(pAST) {
    return asttransform_1.default(pAST, [uncolorThing], [uncolorThing]);
}
exports.default = {
    uncolor: _uncolor,
    colorize: _colorize,
    applyScheme(pAST, pColorSchemeName, pForced) {
        return _colorize(pAST, colorizeschemes_1.default[pColorSchemeName]
            ? colorizeschemes_1.default[pColorSchemeName]
            : colorizeschemes_1.default.auto, pForced);
    },
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
