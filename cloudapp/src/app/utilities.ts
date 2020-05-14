
  /** Chunks array and returns array of arrays of specified size */
  const chunk = <T>(inputArray: Array<T>, size:number): Array<Array<T>> => {
    return inputArray.reduce((all,one,i) => {
      const ch = Math.floor(i/size); 
      all[ch] = [].concat((all[ch]||[]),one); 
      return all;
    }, []);
  }

  /** Map object */
  const omap = (o, f) => Object.assign({}, ...Object.keys(o).map(k => ({ [k]: f(o[k]) })));

  /** Combine array of objects */
  const combine = <T>(objects: Array<T>): T => {
    return Object.assign({}, ...objects);
  }

  export  { chunk, omap, combine };