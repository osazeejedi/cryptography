// toy RSA numbers
const p = 11n, q = 13n;
const n = p * q;          // 143
const phi = (p - 1n) * (q - 1n); // 120
const e = 7n;             // public exponent
const d = 103n;           // private exponent (precomputed)

// encryption
const M = 9n;
const C = modExp(M, e, n); // 48
// decryption
const M_recovered = modExp(C, d, n); // 9

console.log({ n: n.toString(), e: e.toString(), d: d.toString(), C: C.toString(), M_recovered: M_recovered.toString() });

// fast modular exponentiation
function modExp(base, exp, mod) {
  base = base % mod;
  let result = 1n;
  while (exp > 0n) {
    if (exp & 1n) result = (result * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return result;
}
