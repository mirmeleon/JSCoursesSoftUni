function isSymmetric(arr) {
    if (!Array.isArray(arr))
        return false; // Non-arrays are non-symmetric
    let reversed = arr.slice(0).reverse(); // Clone + reverse
    let equal =(JSON.stringify(arr) == JSON.stringify(reversed));
    return equal;
}

module.exports = {isSymmetric};  //taka prevrushtame gornia fail v module

// let expect = require('chai').expect;
//
// describe('Test summator', function (){
//     it('should return 3 for [1,2]', function () {
//         //arange
//         let expected = 3;
//         //act
//         let actual = sum([1, 2]);
//         //assert
//         expect(actual).to.equal(expected)
//     });
//
//
//     //2ri test
//     it('Should return 0 for []', function(){
//         let expected = 0;
//         let actual = sum([]);
//
//         expect(actual).to.equal(expected);
//
//     });
//
// });
