// Compute GCD
function gcd(a, b) {
  while (b !== 0n) {
    let temp = a % b;
    a = b;
    b = temp;
  }
  return a;
}

// Extended Euclidean Algorithm - finds inverse (we d such that e*d ≡ 1 (mod phi))
function modInverse(e, phi) {
  let [old_r, r] = [e, phi]; // old_r = e, r = phi these track the remainders (like a, b in Euclid's algorithm)
  let [old_s, s] = [1n, 0n];// old_s = 1, s = 0 these track the coefficients so that old_s*e + old_t*phi = old_r
  let [old_t, t] = [0n, 1n]; // old_t = 0n, t = 1n complementary coefficients

  while (r !== 0n) {
    let q = old_r / r; // q = floor(old_r / r)
    [old_r, r] = [r, old_r - q * r];
    [old_s, s] = [s, old_s - q * s];
    [old_t, t] = [t, old_t - q * t];
  }

  // old_s is the modular inverse
  if (old_s < 0n) old_s += phi; 
  return old_s;
}

// Modular exponentiation "base ^ exponent % mod"
function modPow(base, exponent, mod) {
  let result = 1n;
  base = base % mod;

  while (exponent > 0n) {
    if (exponent % 2n === 1n)
      result = (result * base) % mod;

    exponent = exponent / 2n;
    base = (base * base) % mod;
  }

  return result;
}


function text2number (text) {
  return Array.from(text).map(char => BigInt(char.charCodeAt(0)));
}

function number2text (numbers) {
  return numbers.map(num => String.fromCharCode(Number(num))).join(''); 
}

let n, phi, e, d;

// Generate RSA Keys
function generateKeys() {
  let p = BigInt(document.getElementById("p").value);
  let q = BigInt(document.getElementById("q").value);

  n = p * q;
  phi = (p - 1n) * (q - 1n);

  // Choose the smallest common e value commonly used: 3, 5, 17, 257, 65537
  let candidates = [3n, 5n, 17n, 257n, 65537n];
  e = candidates.find(x => gcd(x, phi) === 1n);

  d = modInverse(e, phi);

  document.getElementById("nVal").textContent = n;
  document.getElementById("phiVal").textContent = phi;
  document.getElementById("eVal").textContent = e;
  document.getElementById("dVal").textContent = d;
}

// Encrypt
function encrypt() {
  let m = document.getElementById("message").value;
  let m_numbers = text2number(m);
  let c = m_numbers.map(num => modPow(num, e, n));
  document.getElementById("cipherVal").textContent = c.join(", ");
} 

// Decrypt
function decrypt() {
  let c = document.getElementById("cipher").value.split(", ").map(x => BigInt(x.trim()));
  let m = c.map(num => modPow(num, d, n));
  m = number2text(m);
  document.getElementById("plainVal").textContent = m;
}
