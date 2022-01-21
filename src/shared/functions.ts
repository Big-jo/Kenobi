import logger from './Logger';

export const pErr = (err: Error): void => {
    if (err) {
        logger.error(err);
    }
};

export const getRandomInt = (): number => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};


export const dateToNumber = (dateString: string): number => {
    // Convert date "26/06/2016" to 20160626
    const splitString = dateString.split("/");

    return Number(splitString[2] + splitString[1] + splitString[0]);
}

/**
 * 
 * @param data 
 * @param order - Order in which to sort, ASC -1, DESC - 0
 * @returns 
 *
 */
export const nameSort = (data: any[], order: string) => {
    if (order === '1') {
        return data.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        return data.sort((a, b) => b.name.localeCompare(a.name));
    }
}

/**
 * 
 * @param data - An array of objects which contain a gender
 * @param bias - A weight to sort by, either 'm | f'
 * @returns []
 */
export const genderSort = (data: any[], bias: string) => {

    // filter off n/a genders 
    const filtered = [];
    const redundant = []; // Data left after filtering
    let sorted = [];

    for (const character of data) {
        if (character.gender === "male" || character.gender === "female") filtered.push(character);
        else { redundant.push(character); }
    }

    // Assign male -> 0
    // Assign female -> 1
    for (const character of filtered) {

        if (character.gender === 'male') character.genderNumber = 0;
        if (character.gender === 'female') character.genderNumber = 1;
        // if (character.gender === 'n/a') character.genderNumber = 3;
    }

    if (bias === 'm') sorted = filtered.sort((a, b) => a.genderNumber - b.genderNumber);
    if (bias === 'f') sorted = filtered.sort((a, b) => b.genderNumber - a.genderNumber);

    return sorted.concat(redundant);
}

/**
 * 
 * @param data - An array of objects which contain a gender
 * @param bias -  A weight to filter by, either 'm | f'
 */
export const genderFilter = (data: any[], bias: string) => {
    if (bias === 'm') return data.filter((character) => character.gender === 'male');
    else { return data.filter((character) => character.gender === 'female'); }
}

/**
 * 
 * @param data 
 * @param order - Order in which to sort, ASC -1, DESC - 0
 * @returns 
 */
export const heightSort = (data: any[], order: string) => {
    if (order === '1') return data.sort((a, b) => a.height - b.height);
    else { return data.sort((a, b) => b.height - a.height); }
}

export const heightCalculator = (data: any[]) => {
    return data.reduce((a, b) => a + parseInt(b.height), 0);
}

export const toFeet = (cm: number) => {
    var realFeet = ((cm * 0.393700) / 12);

    var feet = Math.floor(realFeet);
    var inches = Math.round((realFeet - feet) * 12);
    return feet + "&prime;" + inches + '&Prime;';
  }
