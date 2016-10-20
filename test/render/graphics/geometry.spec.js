var geo    = require("../../../render/graphics/geometry");
var expect = require("chai").expect;

describe('#geometry', function() {
    describe('#getDiagonalAngle', function () {
        it("returns -45 degrees for a square box", function(){
            expect(geo.getDiagonalAngle({height: 10, width: 10})).to.equal(-45);
        });
        it("returns -90 degrees for a zero width box", function(){
            expect(geo.getDiagonalAngle({height: 10, width: 0})).to.equal(-90);
        });
        it("returns -0 degrees for a zero height box", function(){
            expect(geo.getDiagonalAngle({height: 0, width: 10})).to.equal(0);
        });
        it("returns ~ -36.9 degrees for a 640*480 box", function(){
            expect(geo.getDiagonalAngle({height: 480, width: 640})).to.equal(-36.86989764584402);
        });
    });

    describe('#getDirection', function () {
        it("returns -1,1,1 for (10,0),(0,10)", function(){
            expect(
                geo.getDirection(
                    {xFrom:10, yFrom:0, xTo:0, yTo:10}
                )
            ).to.deep.equal(
                {
                    signX: -1,
                    signY: 1,
                    dy: 1
                }
            );
        });
        it("returns -1,1,-Infinity for (0,0),(0,10)", function(){
            expect(
                geo.getDirection(
                    {xFrom:0, yFrom:0, xTo:0, yTo:10}
                )
            ).to.deep.equal(
                {
                    signX: -1,
                    signY: 1,
                    dy: -Infinity
                }
            );
        });
        it("returns -1,1,0 for (0,0),(10,0)", function(){
            expect(
                geo.getDirection(
                    {xFrom:0, yFrom:0, xTo:10, yTo:0}
                )
            ).to.deep.equal(
                {
                    signX: 1,
                    signY: -1,
                    dy: 0
                }
            );
        });
    });

    describe('#getLineLength', function () {
        it("returns 10 for (10,0), (10,10)", function(){
            expect(
                geo.getLineLength(
                    {xFrom:10, yFrom:0, xTo:10, yTo:10}
                )
            ).to.equal(10);
        });
        it("returns 10 for (0,10), (10,10)", function(){
            expect(
                geo.getLineLength(
                    {xFrom:0, yFrom:10, xTo:10, yTo:10}
                )
            ).to.equal(10);
        });
        it("returns ~14.1 for (10,0), (0,10)", function(){
            expect(
                geo.getLineLength(
                    {xFrom:10, yFrom:0, xTo:0, yTo:10}
                )
            ).to.equal(14.142135623730951);
        });
        it("returns 0 for (10,0), (0,10)", function(){
            expect(
                geo.getLineLength(
                    {xFrom:10, yFrom:-10, xTo:10, yTo:-10}
                )
            ).to.equal(0);
        });
    });

    describe('#getNumberOfSegments', function () {
        it("returns 1 to fit segments of 10 long into ((10,0), (0,10))", function(){
            expect(
                geo.getNumberOfSegments(
                    {xFrom:10, yFrom:0, xTo:0, yTo:10},
                    10
                )
            ).equal(1);
        });
        it("returns 14 to fit segments of 1 long into ((10,0), (0,10))", function(){
            expect(
                geo.getNumberOfSegments(
                    {xFrom:10, yFrom:0, xTo:0, yTo:10},
                    1
                )
            ).equal(14);
        });
        it("returns 14 to fit segments of 1 long into ((10,10), (0,0))", function(){
            expect(
                geo.getNumberOfSegments(
                    {xFrom:10, yFrom:10, xTo:0, yTo:0},
                    1
                )
            ).equal(14);
        });
        it("returns 0 to fit segments of 15 long into ((10,10), (0,0))", function(){
            expect(
                geo.getNumberOfSegments(
                    {xFrom:10, yFrom:10, xTo:0, yTo:0},
                    15
                )
            ).equal(0);
        });
        it("returns 5 to fit segments of 2 long into ((10,-10), (10,0))", function(){
            expect(
                geo.getNumberOfSegments(
                    {xFrom:10, yFrom:-10, xTo:10, yTo:0},
                    2
                )
            ).equal(5);
        });
        it("returns 0 to for a line of 0 length", function(){
            expect(
                geo.getNumberOfSegments(
                    {xFrom:10, yFrom:-10, xTo:10, yTo:-10},
                    1
                )
            ).equal(0);
        });
    });


    describe('#getBetweenPoints', function () {

        describe("a diagonal", function(){
            var lBetweenPoints = [];

            before(function(){
                lBetweenPoints =
                    geo.getBetweenPoints(
                        {xFrom:10, yFrom:0, xTo:0, yTo:10},
                        3,
                        0
                    );
            });

            it("returns an array of 4 points", function(){
                expect(lBetweenPoints.length).to.equal(4);
            });

            it("returns the endpoint of the line as the last point", function(){
                expect(
                    lBetweenPoints.map(function(pPoint){
                        return {
                            x: pPoint.x,
                            y: pPoint.y
                        };
                    })[lBetweenPoints.length - 1]
                ).to.deep.equal({x:0, y:10});
            });

            it("returns points along the line", function(){
                expect(lBetweenPoints).to.deep.equal([
                    {
                        "controlX": 8.939,
                        "controlY": 1.061,
                        "x": 7.879,
                        "y": 2.121
                    },
                    {
                        "controlX": 6.818,
                        "controlY": 3.182,
                        "x": 5.757,
                        "y": 4.243
                    },
                    {
                        "controlX": 4.697,
                        "controlY": 5.303,
                        "x": 3.636,
                        "y": 6.364
                    },
                    {
                        "controlX": 2.575,
                        "controlY": 7.425,
                        "x": 0,
                        "y": 10
                    }
                ]);
            });
        });

        describe("a vertical line", function(){
            var lBetweenPoints = [];

            before(function(){
                lBetweenPoints =
                    geo.getBetweenPoints(
                        {xFrom:10, yFrom:0, xTo:10, yTo:10},
                        3,
                        0
                    );
            });

            it("returns an array of 3 points", function(){
                expect(lBetweenPoints.length).to.equal(3);
            });

            it("returns the endpoint of the line as the last point", function(){
                expect(
                    lBetweenPoints.map(function(pPoint){
                        return {
                            x: pPoint.x,
                            y: pPoint.y
                        };
                    })[lBetweenPoints.length - 1]
                ).to.deep.equal({x:10, y:10});
            });

            it("returns points along the line", function(){
                expect(lBetweenPoints).to.deep.equal([
                    {
                        "controlX": 10,
                        "controlY": 1.5,
                        "x": 10,
                        "y": 3
                    },
                    {
                        "controlX": 10,
                        "controlY": 4.5,
                        "x": 10,
                        "y": 6
                    },
                    {
                        "controlX": 10,
                        "controlY": 7.5,
                        "x": 10,
                        "y": 10
                    }
                ]);
            });
        });

        describe("a horizontal line", function(){
            var lBetweenPoints = [];

            before(function(){
                lBetweenPoints =
                    geo.getBetweenPoints(
                        {xFrom:10, yFrom:20, xTo:20, yTo:20},
                        3,
                        0
                    );
            });

            it("returns an array of 3 points", function(){
                expect(lBetweenPoints.length).to.equal(3);
            });

            it("returns the endpoint of the line as the last point", function(){
                expect(
                    lBetweenPoints.map(function(pPoint){
                        return {
                            x: pPoint.x,
                            y: pPoint.y
                        };
                    })[lBetweenPoints.length - 1]
                ).to.deep.equal({x:20, y:20});
            });

            it("returns points along the line", function(){
                expect(lBetweenPoints).to.deep.equal([
                    {
                        "controlX": 11.5,
                        "controlY": 20,
                        "x": 13,
                        "y": 20
                    },
                    {
                        "controlX": 14.5,
                        "controlY": 20,
                        "x": 16,
                        "y": 20
                    },
                    {
                        "controlX": 17.5,
                        "controlY": 20,
                        "x": 20,
                        "y": 20
                    }
                ]);
            });
        });

        describe("errors", function(){
            it("throws an error for intervals of length === 0", function(){
                try {
                    geo.getBetweenPoints(
                        {xFrom:10, yFrom:0, xTo:0, yTo:10},
                        0,
                        0
                    );
                    expect("won't come here because it should throw an error").to.equal("did come here nonetheless");
                } catch (e) {
                    expect(e.toString()).to.equal("Error: pInterval must be > 0");
                }
            });

            it("throws an error for intervals of length < 0", function(){
                try {
                    geo.getBetweenPoints(
                        {xFrom:10, yFrom:0, xTo:0, yTo:10},
                        -42,
                        0
                    );
                    expect("won't come here because it should throw an error").to.equal("did come here nonetheless");
                } catch (e) {
                    expect(e.toString()).to.equal("Error: pInterval must be > 0");
                }
            });
        });

    });

});
