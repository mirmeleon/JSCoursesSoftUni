function sum(arr){

    let sum =0;
    for(num of arr){
        sum += Number(num);
    }
    return sum;
}
let expect = require('chai').expect; //reqire e funkcia ot node.js; ot cialata library zimame samo .expect shtoto samo to ni triabva

describe('Test summator', function (){
   describe("Group1", function (){

       it('should return 3 for [1,2]', function () {
           //arange
           let expected = 3;
           //act
           let actual = sum([1, 2]);
           //assert
           expect(actual).to.equal(expected)
       });


       //2ri test
       it('Should return NaN', function(){
           let expected = NaN;
           let actual = sum(['pesho',1,2]);

           expect(actual).to.be.NaN;

       });

   });

   describe("Group2", function (){
       it('should return 0 for []', function () {

           let actual = sum([1.1,1.1,1.1]);

           expect(actual).to.be.closeTo(3.3, 0.0001);
       });

   })

});

//describe('test summator', test1);