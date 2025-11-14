// Caesar Cipher (Shift Cipher)

function caesarCipher(text, shift) {
  const alphabetSize = 26;
  shift = shift % alphabetSize; // handle large shifts
  let result = "";

  for (let char of text) {
    // Encrypt uppercase letters
    if (char >= "A" && char <= "Z") {
      let code = ((char.charCodeAt(0) - 65 + shift + alphabetSize) % alphabetSize) + 65;
      result += String.fromCharCode(code);
    }
    // Encrypt lowercase letters
    else if (char >= "a" && char <= "z") {
      let code = ((char.charCodeAt(0) - 97 + shift + alphabetSize) % alphabetSize) + 97;
      result += String.fromCharCode(code);
    }
    // Leave non-alphabet characters unchanged
    else {
      result += char;
    }
  }

  return result;
}

// Example Usage
console.log(caesarCipher("HELLO Veritas", 5));   // Output: KHOOR
//console.log(caesarCipher("KHOOR", -3));  // Output: HELLO
