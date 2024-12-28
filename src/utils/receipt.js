import calzadoPecas from '../asset/images/imagePecas.png';

export function generateReceipt(ventasData, cliente, cedula, correo, telefono) {  
    let allData = '';
    let total = 0; // Variable para acumular el total de los valores

    ventasData.forEach((venta, index) => {
        // Separar los datos del QR
        const qrDataParts = venta.qrData.split('/').map(item => item.replace(/^'|'$/g, '').trim());
        const [nombreEmpresa, serial, color, ubicacionDescripcion, talla, tipopublico, valor] = qrDataParts;

        // Convertir el valor a número
        const numericValue = parseFloat(valor) || 0;
        total += numericValue; // Sumar el valor al total

        // Construir el HTML con los datos procesados
        allData += `
            <div>
                <p style="margin: 0; padding: 0;">
                    <strong>Item #${index + 1}</strong>: <br>
                </p>
                <p style="margin-top: 0px;">
                    Empresa: ${nombreEmpresa}<br>
                    Referencia: ${serial}<br>
                    Color: ${color}<br>
                    Talla: ${talla}<br>
                    valor: ${numericValue.toLocaleString()}<br>
                    Público: ${tipopublico}<br>
                </p>
            </div>
        `;
    });

    // Crear un elemento de imagen y esperar a que se cargue
    const img = new Image();
    img.src = calzadoPecas;
    img.onload = () => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString(); 
        const formattedTime = now.toLocaleTimeString();
        const receipt = `
            <div>
                <div style="display: flex; justify-content: space-between; margin: 10px 0; font-family: Arial, sans-serif;">
                    <span>Fecha: ${formattedDate}</span>
                    <span>Hora: ${formattedTime}</span>
                </div>
                
                <br>
                <div style="width: 300px; display: flex; flex-direction: column; align-items: center; font-family: Arial, sans-serif;">
                <span> CALZADO PECAS </span><br>
                    <forte> NIT: 31948008-0 </forte>
                    <span> TEL: 3053212942 </span>
                    <span> Carrera 1 calle 70 CC calima </span>
                    <span> Santiago de Cali </span><br>    
                <img src="${calzadoPecas}" alt="Descripción de la imagen" style="width: 100px; height: 100px;" />
                </div>

                
                <p style="font-family: Arial, sans-serif;">
                    Cliente: ${cliente}<br>
                    Cédula: ${cedula}<br>
                    Correo: ${correo}<br>
                    Teléfono: ${telefono}<br> 
                </p>
                <hr style="border: none; border-top: 1px dashed black; margin: 10px 0;">
                ${allData}
                <hr style="border: none; border-top: 1px dashed black; margin: 10px 0;">
                <p style="text-align: right; font-weight: bold;">
                    Total: ${total.toLocaleString()}
                </p>
                
                <hr style="border: none; border-top: 1px dashed black; margin: 10px 0;">
                <div style="width: 300px; display: flex; flex-direction: column; align-items: center; font-family: Arial, sans-serif;">
               
                    <span> GRACIAS POR SU COMPRA </span>
                   <br>
                </div>
            </div>
        `;

        // Crear un iframe para enviar el contenido a la impresora
        const printIframe = document.createElement('iframe');
        document.body.appendChild(printIframe);
        printIframe.style.position = 'absolute';
        printIframe.style.width = '0';
        printIframe.style.height = '0';
        printIframe.style.border = 'none';

        // Escribir el contenido en el iframe
        printIframe.contentWindow.document.open();
        printIframe.contentWindow.document.write(receipt);
        printIframe.contentWindow.document.close();

        // Imprimir el contenido del iframe
        printIframe.contentWindow.print();
        sendCutCommandToPrinter();
    };

    img.onerror = () => {
        console.error('Error al cargar la imagen');
    };
}
function sendCutCommandToPrinter() {
    // Este comando corresponde a ESC/POS para cortar el papel
    const cutCommand = '\x1D\x56\x00';  // Comando ESC/POS para cortar el papel

    console.log('Enviando comando de corte:', cutCommand);
    
}