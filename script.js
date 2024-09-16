// import { counter } from "./test.mjs";
// console.log(counter);

/*
     TO MAKE THIS CUSTOM (nls) COMMAND WORKING IN LINUX OR MAC_OS
     YOU SHOULD DO TWO STEPS MORE.
     1-) CHANGE FILE PERMISSION
            run: chmod +x fileName.js(current file)
    2-) Add comment to fileName.js(current file) file to allow it to be treated like an executable
         #!/usr/bin/env node
    KINDLY MAKE SURE TO RUN ==> npm link (link your file)
*/

import fs from "fs";
import path from "path";
import chalk from "chalk";

//process.cwd() method returns the current working Node.js process.
//APPROACH 3 TO FIX (EXTREMELY BAD CODE)
const { lstat } = fs.promises;
// console.log(process.argv);
const targetDir = process.argv[2] || process.cwd();
fs.readdir(targetDir, async (err, fileNames) => {
  if (err) console.log(err);
  //3RD AND IN MY OPINION BEST APPROACH.
  const statPromises = fileNames.map((fileName) => {
    //return the promise; lstat receives the relative or absolute path.
    // console.log(path.join(targetDir, fileName));
    return lstat(path.join(targetDir, fileName));
  });
  const allStats = await Promise.all(statPromises);
  for (let stats of allStats) {
    const idx = allStats.indexOf(stats);
    // console.log(fileNames[idx], stats.isFile());
    if (stats.isFile()) console.log(fileNames[idx]);
    else console.log(chalk.bgGray.bold(fileNames[idx]));
  }
  /*
   * EITHER err exist OR NOT.
   * IF ERROR SOME THING WENT WRONG
   * ELSE EVERYTHING IS WORKING WELL.
   */
  //   console.log(fileNames);
  /* TODO:
  //EXTREMELY BAD CODE.
  for (let fileName of fileNames) {
    //lstat will be called for every iteration.
    fs.lstat(fileName, (err, stats) => {
        if (err) console.log(err);
        console.log(fileName, stats.isFile());
    });
    }
    //1st approach to fix (EXTREMELY BAD CODE)
    const allStats = Array(fileNames.length).fill(null);
    for (let fileName of fileNames) {
      const idx = fileNames.indexOf(fileName);
      fs.lstat(fileName, (err, stat) => {
        if (err) console.log(err);
        allStats[idx] = stat;
  
        //it will return true or false.
        const ready = allStats.every((stats) => {
          //it can be null or object.
          return stats;
        });
        if (ready) {
          allStats.forEach((stat, index) => {
            console.log(fileNames[index], stat.isFile());
          });
        }
      });
    }
    //2nd approach to fix (EXTREMELY BAD CODE)
    for (let fileName of fileNames) {
      const stats = await lStat(fileName);
      try {
        console.log(fileName, stats.isFile());
      } catch (err) {
        console.log(err);
      }
    }
*/
});

/*
APPROACH 2 TO FIX (EXTREMELY BAD APPROACH)
// THE BELOW WRITTEN CODE IS THE OUTPUT OF 
// import util from 'util';
// const lStat = util.promisify(fs.lstat);
//OUTPUT:
// const lStat = (fileName) => {
    //   return new Promise((resolve, reject) => {
        //     fs.lstat(fileName, (err, stat) => {
            //       if (err) reject(err);
            
            //       resolve(stat);
            //     });
            //   });
            // };
*/
