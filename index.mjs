//import for the name export should be same as the time of export.
//import for the default don't have any hard and fix rules name it whatever you want.

import countObj1, { counter } from "./test.mjs";
console.log("Counter", counter);
console.log(countObj1.getCounter()); //0
countObj1.incrementCounter();
console.log("Counter", counter);
console.log(countObj1.getCounter()); //1
import countObj2 from "./test.mjs";
console.log(countObj2.getCounter()); //1
console.log("Counter", counter);
