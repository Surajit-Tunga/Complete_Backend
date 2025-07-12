# Error & Debugging 

## types of Error

1. **Syntax Error:** Error in code structure.

```js
  console.log(hello); // missing " "
  const sum;  // value is not given 
```

2. **Logical Error:** Code will run but produces incorrect results due to wrong logic.
```js
  let x = 5;

  if (x=10) { // does not compare its assign the value.
    console.log("X is 10")
  }
```

3. **Runtime error:** error occurs while the program is running, due to invalid operations.
 ```js
  console.log(x); // x is not defined
  const sum = 10;  
  sum() // sum is not a funtion
```
---

## Using the Debugger
...........