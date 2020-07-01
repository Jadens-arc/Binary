/** Convert from decimal to binary and vice versa */
class Converter {

    /**
    * Convert binary number to decimal number
    * @param  {String} binary The binary sequence
    * @return {Number}        The converted decimal number
    */
    toDecimal(binary) {
        // if the parameter is not in the type of String then throw error 
        if (typeof(binary) !== 'string') throw "binary must be type string"
        
        let totalNum = 0; // the decimal number that the binary is being converted to
        let place = 1; // the value of each position in a binary sequence 

        // loop through string in reverse
        for (let i = binary.length - 1; i != -1; i--) {
            // if the current char isn't a binary number throw error
            if (binary.charAt(i) != '1' && binary.charAt(i) != '0') {
                throw `non-binary character (${binary.charAt(i)}) in string at ${i}`;
            }

            // if the binary number is a 1 then add it's value 
            // relative to it's location in the string to totalNum 
            if (binary.charAt(i) == '1') {
                totalNum += place; // add the relative value to totalNum
            }

            place = place * 2; // double the relative value according to binary (ex 1, 2, 4, 8, 16, 32, etc)
        }

        return totalNum; // return the decimal number
    }

    /**
    * Convert decimal number to binary number 
    * @param  {Number} decimal The decimal number
    * @return {String}         The converted binary sequence
    */
    toBinary(decimal) {
        /**
        * generates list of binary place values that the received decimal number can use
        * in greatest to least order
        * ex etc, 64, 32, 16, 8, 4, 2, 1
        */
        let place = 1; // keeps track of the place value that our decimal number can fit into 
        let possiblePlaces = [1]; // keeps track of the possible place values

        while (place < decimal) {
            place = place * 2;
            possiblePlaces.unshift(place); // adds newly found place value to the beginning of array
        }


        let curDecimal = decimal; 
        let binary = '';

        /**
        * loops through array of possible numbers to see if the greatest possible place value
        * is less than the input decimal
        * if True:
        *   then adds a 0 to the binary sequence and removes that place value from the array
        * if False:
        *   then adds a 1 to the binary sequence, subtracts the place value from the decimal number and 
        *   removes it from the array
        */
        while (possiblePlaces.length != 0) {
            if (curDecimal < possiblePlaces[0]){
                binary += '0';
            } else {
                binary += '1';
                curDecimal -= possiblePlaces[0];
            }
            possiblePlaces.shift(); // removes first number (the greatest place value)
        }

        return binary;

    }
}

// test case
if (require.main === module) {
    myConverter = new Converter();

    let myBinary = myConverter.toBinary(54);
    console.log(myBinary);

    let myNum = myConverter.toDecimal(myBinary);
    console.log(myNum);
}