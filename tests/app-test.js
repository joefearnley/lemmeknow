
var assert = require('assert');

describe('start()', function() {
    it('should return something when sending a request to the url', function() {

        // call the url

        app.start();
        var title = app.getTitle();

        assert.equal(title, 'Pig Design Patterns');
    });
});
