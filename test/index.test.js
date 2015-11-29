"use strict";

;(function(){

var chai = require('chai');
var expect = chai.expect;



function Human(name, age){
    this.name = name;
    this.age = age;
}


var grant = new Human('Grant Kiely', 24);


describe('Human', function(){
  it('should have a name: string', function(){
    expect(grant.name).to.be.a('string').to.be.ok;
  });
  it('should have an age: number', function(){
    expect(grant.age).to.be.a('number');
  });
});




/*
Todo

- Get react build working



 */






})();