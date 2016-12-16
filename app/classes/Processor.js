
'use strict';

const dateFormat = require('dateformat');

class Processor {
    
    contructor(html) {
        this.html = html;
    }
    
    html() {
        return this.html;
    }
    
    date() {
        let now = new Date();
        return dateFormat(now, 'dddd, mmmm dS, yyyy');
    }
    
    body() {
        return `
            <h3> PackPub Free Book of the Day</h3>
            <p>The title of the free book today is <strong>{this.title}</strong></p>
            <p> Check it out here: {this.url}</p> 
        `;
    }
    
    subject() {
        return 'PackPub Free Book of the Day for ' + this.date;
    }
}

module.exports = Processor;