let lookupChar = require('../03.CharLookup').lookupChar;
let expect = require('chai').expect;

describe('Tests', () => {
    describe('general tests', () => {
        it('should return undefined when 1 param no string is passed', () => {

            //act
            let actual = lookupChar({name:'deni'});
            //assert
            expect(actual).to.be.undefined;
        });

        it('should return undefined when 2 params are passed but 1 is no string', ()=>{

            //act
            let actual = lookupChar({name:'deni'}, 3);
            //asert
            expect(actual).to.be.undefined;

        });

        it('should return undefined when 2 params are passed but second is not a number', () => {
           //act
            let actual = lookupChar('deni', [1,2,3]);
            //assert
            expect(actual).to.be.undefined;

        });

        it('should return undefined when 2 params are passed but second is double', () => {
            "use strict";
            //act
            let actual = lookupChar('deni', 3.3);
            //assert
            expect(actual).to.be.undefined;
        });

        it('should return Incorrect index when 2nd num is negative number', () => {

            //arange
            let expected = "Incorrect index";
            //act
            let actual = lookupChar('deni', -2);
            //assert
            expect(actual).to.be.equal(expected);
        });

        it('should return Incorrect index when 2nd num is bigger then string length', () => {

            //arange
            let expected = "Incorrect index";
            //act
            let actual = lookupChar('deni', 12);
            //assert
            expect(actual).to.be.equal(expected);
        });

        it('should return Incorrect index when 2nd num is equal to string length', () => {

            //arange
            let expected = "Incorrect index";
            //act
            let actual = lookupChar('deni', 4);
            //assert
            expect(actual).to.be.equal(expected);
        });

        it('should return char at given index', () => {

            //arange
            let expected = "e";
            //act
            let actual = lookupChar('deni', 1);
            //assert
            expect(actual).to.be.equal(expected);
        });

        it('should return type char ', () => {

            //arange
            let expected = 'deni'.charAt(1);
            //act
            let actual = lookupChar('deni', 1);
            //assert
            expect(actual).to.be.equal(expected);
        });
    })
});
