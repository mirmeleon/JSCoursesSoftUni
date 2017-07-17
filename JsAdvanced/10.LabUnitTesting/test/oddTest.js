let isOddOrEven = require('../02.OddOrEven').isOddOrEven;
let expect = require('chai').expect;
let jsdom = require('jsdom-global')();
let $ = require('jquery');

describe('Is odd or even', () => {
   it('should return odd when string length is odd', () => {
      //arange
       let expected = 'odd';
       //act
       let actual = isOddOrEven('d');
       //assert
       expect(actual).to.be.equal(expected);

   });

    it('should return even when string length is even', () => {
        //arranhe
        let expected = 'even';

        //act
        let actual = isOddOrEven('de');
        //assert
        expect(actual).to.be.equal(expected);

    });

    it('should return undefined when number is inserted', () => {

        //arrange
        let expected = undefined;
        //act
        let actual = isOddOrEven(3);
        //assert
        expect(actual).to.be.undefined;
    });

    it('should return undefined when obj is inserted', () => {
        //arrange
        let expected =  undefined;
        //act
        let actual = isOddOrEven({name: 'deni'});
        //assert
        expect(actual).to.be.undefined;

    });

    it('with multiply checks, should return correct values', () => {
       //arranhe
        let expectedEven = 'even';
        let expectedOdd = 'odd';
        //act
        let actual = isOddOrEven('deni');
        let actual2 = isOddOrEven('den');
        let actual3 =isOddOrEven('kori');
        //assert
        expect(actual).to.be.equal(expectedEven);
        expect(actual2).to.be.equal(expectedOdd);
        expect(actual3).to.be.equal(expectedEven);
    });

    it('should return even for empty string', function(){
        expect(isOddOrEven('')).to.be.equal('even')
    });

});