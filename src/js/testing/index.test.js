"use strict";

;(function(){

var expect = chai.expect;



class Human{
  constructor(name, age){
    this.name = name;
    this.age = age;
  }
}


var grant = new Human('Grant Kiely', 24);


describe('Human', function(){
  it('should have a name: string', () => {
    expect(grant.name).to.be.a('string');

  });
  it('should have an age: number', () => {
    expect(grant.age).to.be.a('number');
  });
});




/*
Todo

- Get react build working



 */






})();