let mathEnforcer = require('../04.MathEnforcer').mathEnforcer;
let expect = require('chai').expect;


describe('MathEnforcer', () => {
    describe('addFive', () => {
        it('with a non-num param, should return correct (undefined) result', () => {
            //arrange
            //act
            let actual = mathEnforcer.addFive('deni');
            //assert
            expect(actual).to.be.undefined;
        });

        it('with a floating point num, should return correct result', () => {
            //arrange
            let expected = 7.3;
            //act
            let actual = mathEnforcer.addFive(2.3);
            //assert
            expect(actual).to.be.closeTo(expected, 0.01);
        });

        it('with a num, should return correct result', () => {
            //arrange
            let expected = 7;
            //act
            let actual = mathEnforcer.addFive(2);
            //assert
            expect(actual).to.be.equal(expected);
        });

        it('with a negative val, should return correct result', () => {
            //arrange
            let expected = 2;
            //act
            let actual = mathEnforcer.addFive(-3);
            //assert
            expect(actual).to.be.equal(expected);
        });

    });

    describe('substractTen', () => {

        it('with a non-num param, should return correct (undefined) result', () => {
            //arrange
            //act
            let actual = mathEnforcer.subtractTen('deni');
            //assert
            expect(actual).to.be.undefined;
        });

        it('with a floating point num, should return correct result', () => {
            //arrange
            let expected = -20.1;
            //act
            let actual = mathEnforcer.subtractTen(-10.1);
            //assert
            expect(actual).to.be.closeTo(expected, 0.01);
        });

        it('with a inout equal to num param, should return 0', () => {
            //arrange
            let expected = 0;
            //act
            let actual = mathEnforcer.subtractTen(10);
            //assert
            expect(actual).to.be.equal(expected);
        });
        //ev celi otricatelni chisla

    });

    describe('sum', () => {
        it('with a non-num param, should return correct (undefined) result', () => {
            //arrange
            //act
            let actual = mathEnforcer.sum('deni');
            //assert
            // expect(actual).to.be.undefined;
            expect(actual).to.be.undefined;
        });

        it('with a non-num param, should return correct (undefined) result', () => {
            //arrange
            //act
            let actual = mathEnforcer.sum(3, 'deni');
            //assert
            expect(actual).to.be.undefined;
        });

        it('with a non-num param, should return correct (undefined) result', () => {
            //arrange
            //act
            let actual = mathEnforcer.sum('deni', 2);
            //assert
            expect(actual).to.be.undefined;
        });

        it('with a floating point num, should return correct result', () => {
            //arrange
            let expected = 12.1;
            //act
            let actual = mathEnforcer.sum(10.1, 2 );
            //assert
            expect(actual).to.be.closeTo(expected, 0.01);
        });

        it('with negative param, should return negative num', () =>{
            "use strict";
            //arange
            let expected = -3;
            //act
            let actual = mathEnforcer.sum(10, -13);
            //arrange
            expect(actual).to.be.equal(expected);
        });

        it('with 2 floating point param, should return num', () =>{
            "use strict";
            //arange
            let expected = 2.2;
            //act
            let actual = mathEnforcer.sum(1.1, 1.1);
            //arrange
            expect(actual).to.be.equal(expected, 0.01);
        })

    });

});