//name export;
export let counter = 0;
//default export;
export default {
  incrementCounter() {
    counter += 1;
  },
  getCounter() {
    return counter;
  },
};
/*
 * Whenever we export any thing the copy of that thing
 * will be store in the cache and next time when we refer
 * to same file, the data we get will coming from the cache.
 * Rather than exporting all the file data we need again.
 */
