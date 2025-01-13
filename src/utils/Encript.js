//import CryptoJS from 'crypto-js';
import LZString from 'lz-string';

//const secretKey = 'mi-clave-secreta';


export const encryptText = (plainText) => {
    const compressed = LZString.compressToBase64(plainText);
    console.log('Texto plano:', plainText.length);
    console.log('Texto comprimido:', compressed.length);
    console.log('----------------------------------');
    return compressed;
    
};

export const decryptText = (compressedText) => {
    const decompressed = LZString.decompressFromBase64(compressedText);
    console.log('Texto comprimido:', compressedText.length);
    console.log('Texto descomprimido:', decompressed.length);
    console.log('----------------------------------');
    return decompressed;
};
