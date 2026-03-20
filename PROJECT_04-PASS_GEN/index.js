function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSpecialChars) {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let allowedChars = "";
    let password = "";

    allowedChars += includeUppercase ? uppercaseChars : "";
    allowedChars += includeLowercase ? lowercaseChars : "";
    allowedChars += includeNumbers ? numberChars : "";
    allowedChars += includeSpecialChars ? specialChars : "";

    if (length <= 0) {
        return "Password length must be greater than 0.";
    }
    if (allowedChars.length === 0) {
        return "At least one character type must be included.";
    }
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }
    return password;

}

const passwordLength = 12;
const uppercaseChars = true;
const lowercaseChars = true;
const numberChars = true;
const specialChars = true;

const password = generatePassword(passwordLength, uppercaseChars, lowercaseChars, numberChars, specialChars);
console.log("Generated Password:", password);