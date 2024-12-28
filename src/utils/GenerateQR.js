import { jsPDF } from 'jspdf';

export const GenerateQR = (data) => {

        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.setLineWidth(0.5);

    return QRCode.toDataURL(data)
        .then(url => {
            return url
        })
        .catch(err => {
            console.error(err)
        })
}