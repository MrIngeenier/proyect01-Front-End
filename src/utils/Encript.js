import CryptoJS from 'crypto-js';

const secretKey = 'mi-clave-secreta';


export const encryptText = (plainText) => {
    const encrypted = CryptoJS.AES.encrypt(plainText, secretKey).toString();
    return encrypted;
};

export const decryptText = (encryptedText) => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
};
