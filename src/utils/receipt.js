import calzadoPecas from '../asset/images/imagePecas.png';

export function generateReceipt(ventasData, cliente, cedula, correo, telefono) {  
    let allData = '';
    ventasData.forEach((venta, index) => {
        // Separar los datos del QR
        const qrDataParts = venta.qrData.split('/').map(item => item.replace(/^'|'$/g, '').trim());
        const [nombreEmpresa, serial, color, ubicacionDescripcion, talla, tipopublico] = qrDataParts;

        // Construir el HTML con los datos procesados
        allData += `
            <div>
                <p style="">
                    <strong>Item #${index + 1}</strong>
                    Empresa: ${nombreEmpresa}\n
                    Referencia: ${serial}\n
                    Color: ${color}\n
                    Ubicación: ${ubicacionDescripcion}\n
                    Talla: ${talla}\n
                    Público: ${tipopublico}\n
                </p>
            </div>
        `;
    });

    // Crear un elemento de imagen y esperar a que se cargue
    const img = new Image();
    img.src = calzadoPecas;
    img.onload = () => {
        const receipt = `
            <div>
                <div style="width: 300px; display: flex; flex-direction: column; align-items: center;">
                    <img src="${calzadoPecas}" alt="Descripción de la imagen" style="width: 100px; height: 100px;" />
                </div>
                <p style=";">
                    CLIENTE ${cliente} 
                    CEDULA ${cedula}
                    CORREO ${correo}
                    TELEFONO ${telefono} 
                </p>
                ${allData}          
                <hr />  
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
    };

    img.onerror = () => {
        console.error('Error al cargar la imagen');
    };
}