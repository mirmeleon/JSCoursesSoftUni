/**
 * Created by Dell on 07-Jul-17.
 */
let isSymmetric = require('../sim').isSymmetric;
let expect = require('chai').expect;

//isSymmetric([1,2,1]);

describe('Check symetry', () => {
  describe('General tests', () => {
      it('should be a function', () => {
         expect(typeof isSymmetric).to.equal('function');
      });
    });

    describe("Value tests", () => {
       it("should return true for [1,2,3,3,2,1]", () => {

           expect(isSymmetric([1,2,3,3,2,1])).to.be.true;
       });

        it("should return false for [1,2,3,4,2,1]", () => {

            expect(isSymmetric([1,2,3,4,2,1])).to.be.false;
        });

        it("should return true for [1,2,3,2,1]", () => {

            expect(isSymmetric([1,2,3,2,1])).to.be.true;
        });

        it("should return false for [1,2,3,4,1]", () => {

            expect(isSymmetric([1,2,3,4,1])).to.be.false;
        });

        it("should return false for [1,2]", () => {

            expect(isSymmetric([1,2])).to.be.false;
        });

        it("should return true for [1]", () => {

            expect(isSymmetric([1])).to.be.true;
        });

        it("should return true for [5,'hi',{a:5},new Date(),{a:5},'hi',5] ", () => {

            expect(isSymmetric([5,'hi',{a:5},new Date(),{a:5},'hi',5] )).to.be.true;
        });

        it("should return false for [5,'hi',{a:5},new Date(),{a:5},5] ", () => {

            expect(isSymmetric([5,'hi',{a:5},new Date(),{a:5},5] )).to.be.false;
        });

        it("should return false for 1,2,3", () => {

            expect(isSymmetric(1,2,3)).to.be.false;
        });
    });

});