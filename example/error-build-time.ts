exports.handler = async function (event: any) {
  const { number } = event;

  const addNumbers = (number1: number, number2: number): number => {
    return number1 + number2;
  }

  const total = addNumbers(1,, number);
  console.log(total);

  return {
    statusCode: 200,
    body: JSON.stringify({ total: total })
  };
};
