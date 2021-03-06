const normalizeOptions = require("../../src/main/normalizeoptions").default;

describe("normalizeOptions", () => {

    test("Boundary - empty object as first parameter", () => {
        expect(
            normalizeOptions({}),
        ).toEqual({
            inputType              : "mscgen",
            elementId              : "__svg",
            window,
            includeSource          : true,
            source                 : undefined,
            styleAdditions         : null,
            additionalTemplate     : "basic",
            mirrorEntitiesOnBottom : false,
            regularArcTextVerticalAlignment: "middle",
        });
    });

    test('Boundary - only "includeSource" is false', () => {
        expect(
            normalizeOptions({includeSource: false}),
        ).toEqual({
            inputType              : "mscgen",
            elementId              : "__svg",
            window,
            includeSource          : false,
            source                 : null,
            styleAdditions         : null,
            additionalTemplate     : "basic",
            mirrorEntitiesOnBottom : false,
            regularArcTextVerticalAlignment: "middle",
        });
    });
});

/* global window */
