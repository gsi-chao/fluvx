const delay = (timems: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, timems);
  });

export default delay;
