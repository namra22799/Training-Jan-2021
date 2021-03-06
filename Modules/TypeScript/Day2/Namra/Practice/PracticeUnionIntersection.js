//Union types
function padLeft(value, padding) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error("Expected string or number, got '" + typeof padding + "'.");
}
padLeft("Hello world", 4); // returns "    Hello world"
// let pet = getSmallPet();
// pet.layEggs(); // common function is accessible
// Only available in one of the two possible types
//pet.swim(); will raise an error 
var code; //let code : string | number;
code = 123;
code = "ABc";
// code = true; will raise an error;
// Union type in Function parameter
function display(value) {
    if (typeof (value) === "number")
        console.log('The given value is of type number.');
    else if (typeof (value) === 'string')
        console.log('the given value is of type string.');
}
display(123);
display('as');
//display(true); will raise an error as the type of parameter is boolean
