const sumReq = (req, res) => {
  const body = [];

  req.on('data', chunk => {
    body.push(chunk);
  });

  req.on('end', () => {
    const bodyStr = Buffer.concat(body).toString();
    const params = new URLSearchParams(bodyStr);
    const bodyObj = Object.fromEntries(params);

    // Convert string inputs to numbers
    const num1 = Number(bodyObj.num1);
    const num2 = Number(bodyObj.num2);
    const result = num1 + num2;

    console.log(`Result: ${result}`);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Sum is: ${result}`);
  });
};

exports.sumReq = sumReq;
