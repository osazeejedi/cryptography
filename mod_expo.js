function modExp(base, exp, mod) {
  let result = 1n;
  base = BigInt(base);
  exp = BigInt(exp);
  mod = BigInt(mod);

  for (let i = 0n; i < exp; i++) {
    result = (result * base) % mod;
  }

  return result;
}

console.log(modExp(4, 13, 497)); // Output: 445
console.log(modExp(7, 256, 13)); // Output: 9