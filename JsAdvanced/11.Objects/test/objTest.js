
let expect = require('chai').expect;
let jsdom = require('jsdom-global')();
let $ = require('jquery');
let sharedObject = require('../obj').sharedObject;

document.body.innerHtml = `<body>
<div id="wrapper">
        <input type="text" id="name">
        <input type="text" id="income">
    </div>
</body>`;




describe('Shared Object Unit Tests', function () {

    describe('Initial value tests', function () {
        it('test name initial value', function () {
            expect(sharedObject.name).to.be.null;
        });
        it('test income initial value', function () {
            expect(sharedObject.income).to.be.null;
        });
    });
    describe('changeName tests', function () {
        it('with empty string (name should be null)', function () {
            sharedObject.changeName('');
            expect(sharedObject.name).to.be.null;
        });
        it('with a non-empty string (name should not be null)', function () {
            sharedObject.changeName('Pesho');
            expect(sharedObject.name).to.be.equal('Pesho', 'Name did not change correctly!');
        });

        describe('Name input tests', function () {
            it('with empty string (name should be null)', function () {
                sharedObject.changeName('Nakov');
                sharedObject.changeName('');
                let nameTxtVal = $('#name');
                expect(nameTxtVal.val()).to.be.equal('Nakov', 'Name did not change correctly!');
            });
            it('with a non-empty string (name should not be null)', function () {
                sharedObject.changeName('Pesho');
                let nameTxtVal = $('#name');
                expect(nameTxtVal.val()).to.be.equal('Pesho', 'Name did not change correctly!');
            });
        });
    });

    describe('ChangeIncome tests', function () {
        it('with a string (should stay null)', function () {
            sharedObject.changeIncome('d');
            expect(sharedObject.income).to.be.null;
        });
        it('with a positive number (should change correctly)', function () {
            sharedObject.changeIncome(5);
            expect(sharedObject.income).to.be.equal(5, 'Income did not change correctly');
        });
        it('with a floating-point', function () {
            sharedObject.changeIncome(5);
            sharedObject.changeIncome(4.11);
            expect(sharedObject.income).to.be.equal(5, 'Income did not change correctly!');
        });
        it('with a negative number', function () {
            sharedObject.changeIncome(5);
            sharedObject.changeIncome(-4);
            expect(sharedObject.income).to.be.equal(5, 'Income did not change correctly!');
        });
        it('with zero', function () {
            sharedObject.changeIncome(5);
            sharedObject.changeIncome(0);
            expect(sharedObject.income).to.be.equal(5, 'Income did not change correctly!');
        });

        describe('Income input tests', function () {
            it('with a string (should not change correctly)', function () {
                sharedObject.changeIncome(5);
                sharedObject.changeIncome('d');
                let incomeTxt = $('#income');
                expect(incomeTxt.val()).to.be.equal('5', 'Income input did not change correctly!')
            });
            it('with a positive number', function () {
                sharedObject.changeIncome(5);
                let incomeTxt = $('#income');
                expect(incomeTxt.val()).to.be.equal('5', 'Income input did not change correctly!')
            });
            it('with a floating-point number', function () {
                sharedObject.changeIncome(5);
                sharedObject.changeIncome(2.11);
                let incomeTxt = $('#income');
                expect(incomeTxt.val()).to.be.equal('5', 'Income input did not change correctly!')
            });
            it('with a negative number', function () {
                sharedObject.changeIncome(5);
                sharedObject.changeIncome(-5);
                let incomeTxt = $('#income');
                expect(incomeTxt.val()).to.be.equal('5', 'Income input did not change correctly!')
            });
            it('with a floating-point number', function () {
                sharedObject.changeIncome(5);
                sharedObject.changeIncome(0);
                let incomeTxt = $('#income');
                expect(incomeTxt.val()).to.be.equal('5', 'Income input did not change correctly!')
            });
        })
    });

    describe('UpdateName tests', function () {
        it('with an empty string (should n0t change property)', function () {
            sharedObject.changeName('Viktor');
            let nameEl = $('#name');
            nameEl.val('');
            sharedObject.updateName();
            expect(sharedObject.name).to.be.equal('Viktor', 'Name did not update correctly!');
        });
        it('with an non-empty string (should change property)', function () {
            sharedObject.changeName('Viktor');
            let nameEl = $('#name');
            nameEl.val('Kiril');
            sharedObject.updateName();
            expect(sharedObject.name).to.be.equal('Kiril', 'Name did not update correctly!');
        });
    });

    describe('UpdateIncome tests', function () {
        it('with a string (should not change income property)', function () {
            sharedObject.changeIncome(3);
            let incomeEl = $('#income');
            incomeEl.val('income');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(3, 'Income did not update correctly!');
        });
        it('with a floating-point (should not change income property)', function () {
            sharedObject.changeIncome(3);
            let incomeEl = $('#income');
            incomeEl.val('3.11');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(3, 'Income did not update correctly!');
        });
        it('with a negative number (should not change income property)', function () {
            sharedObject.changeIncome(3);
            let incomeEl = $('#income');
            incomeEl.val('-5');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(3, 'Income did not update correctly!');
        });
        it('with zero (should not change income property)', function () {
            sharedObject.changeIncome(3);
            let incomeEl = $('#income');
            incomeEl.val('0');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(3, 'Income did not update correctly!');
        });
        it('with a positive integer (should change income property)', function () {
            sharedObject.changeIncome(3);
            let incomeEl = $('#income');
            incomeEl.val('5');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(5, 'Income did not update correctly!');
        });
    });
});