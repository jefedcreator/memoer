const path = require('path');
const { readFileSync } = require('fs');
var chai = require('chai');
var expect = chai.expect;

it('should have queries written inside the file',() => {
    const sqlFile = readFileSync(path.join(__dirname, '../notesdb.sql'), 'utf-8');
    console.log(sqlFile.length);
    expect(sqlFile.length).to.be.greaterThan(1000);
    expect(sqlFile).to.match(/(select|insert|delete|create|join)/i);
 });