const parseArgs = () => {
  const args = process.argv.slice(2);
  args.forEach((arg, index, args) => {
    if (index % 2 === 0 && args[index + 1]) {
      const propName = arg.slice(2);
      const value = args[index + 1];
      
      console.log(`${propName} is ${value}`);
    }
  });
};

parseArgs();
