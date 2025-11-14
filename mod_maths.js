function mod(a, n) {
  return ((a % n) + n) % n;
}

console.log(mod(14, 12)); // 2
console.log(mod(23, 12)); // 11
