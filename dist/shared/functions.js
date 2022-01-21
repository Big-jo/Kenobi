"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFeet = exports.heightCalculator = exports.heightSort = exports.genderFilter = exports.genderSort = exports.nameSort = exports.dateToNumber = exports.getRandomInt = exports.pErr = void 0;
const tslib_1 = require("tslib");
const Logger_1 = tslib_1.__importDefault(require("./Logger"));
exports.pErr = (err) => {
    if (err) {
        Logger_1.default.error(err);
    }
};
exports.getRandomInt = () => {
    return Math.floor(Math.random() * 1000000000000);
};
exports.dateToNumber = (dateString) => {
    const splitString = dateString.split("/");
    return Number(splitString[2] + splitString[1] + splitString[0]);
};
exports.nameSort = (data, order) => {
    if (order === '1') {
        return data.sort((a, b) => a.name.localeCompare(b.name));
    }
    else {
        return data.sort((a, b) => b.name.localeCompare(a.name));
    }
};
exports.genderSort = (data, bias) => {
    const filtered = [];
    const redundant = [];
    let sorted = [];
    for (const character of data) {
        if (character.gender === "male" || character.gender === "female")
            filtered.push(character);
        else {
            redundant.push(character);
        }
    }
    for (const character of filtered) {
        if (character.gender === 'male')
            character.genderNumber = 0;
        if (character.gender === 'female')
            character.genderNumber = 1;
    }
    if (bias === 'm')
        sorted = filtered.sort((a, b) => a.genderNumber - b.genderNumber);
    if (bias === 'f')
        sorted = filtered.sort((a, b) => b.genderNumber - a.genderNumber);
    return sorted.concat(redundant);
};
exports.genderFilter = (data, bias) => {
    if (bias === 'm')
        return data.filter((character) => character.gender === 'male');
    else {
        return data.filter((character) => character.gender === 'female');
    }
};
exports.heightSort = (data, order) => {
    if (order === '1')
        return data.sort((a, b) => a.height - b.height);
    else {
        return data.sort((a, b) => b.height - a.height);
    }
};
exports.heightCalculator = (data) => {
    return data.reduce((a, b) => a + parseInt(b.height), 0);
};
exports.toFeet = (cm) => {
    var realFeet = ((cm * 0.393700) / 12);
    var feet = Math.floor(realFeet);
    var inches = Math.round((realFeet - feet) * 12);
    return feet + "&prime;" + inches + '&Prime;';
};
