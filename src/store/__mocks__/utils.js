const randomDataGenerator = {
  /**
   * Return a date between 2 dates
   * 
   * @param {Date} start 
   * @param {Date} end 
   */
  dateFromInterval(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  },
  /**
   * Returns a number between the min and max included
   * 
   * @param {number} min 
   * @param {number} max 
   */
  intFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  /**
   * Returns a number between 100 and 300
   * 
   */
  apiWait() {
    return this.intFromInterval(100, 300);
  },
  /**
   * Returns a date according to the ISO format
   * 
   * @param {Date} start 
   * @param {Date} end 
   */
  isoDate(start, end) {
    return (new Date(Math.random() * (end.getTime() - start.getTime()) + start.getTime())).toISOString();
  },
  /**
   * Returns a value from a list
   * 
   * @param {Array} list 
   */
  listValue(list) {
    return list[Math.floor(Math.random() * list.length)];
  },
  /**
   * Shuffles array in place. ES6 version
   * 
   * @param {Array} a
   */
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
};

export default randomDataGenerator;
