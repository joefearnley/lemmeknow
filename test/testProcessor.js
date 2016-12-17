'use strict';

let assert = require('assert');

let Processor = require('../app/classes/Processor');

describe('Test Processor', function() {
    let proccesor;

    before(function() {
        let html = '<h1>This is a Header</h1>';
        
        proccesor = new Processor(html);
    });
    
    describe('#contructor', function() {
        it('should have all attributes set', function() {
          assert.equal(proccesor.html, '<h1>This is a Header</h1>');
        });
    });

});