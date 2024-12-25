import calzadoPecas from '../asset/images/CALZADO PECAS (2).png';

export function generateReceipt(ventasData) {  

let allData = '';
ventasData.forEach((venta, index) => {
    // Separar los datos del QR
    const qrDataParts = venta.qrData.split('/').map(item => item.replace(/^'|'$/g, '').trim());
    const [nombreEmpresa, serial, color, ubicacionDescripcion, talla, tipopublico] = qrDataParts;

    // Construir el HTML con los datos procesados
    allData += `
        <div>
           <p style="margin: -40px -200px ;">
                <strong>Item #${index + 1}</strong>
                Empresa: ${nombreEmpresa}
                Referencia: ${serial}
                Color: ${color}
                Ubicación: ${ubicacionDescripcion}
                Talla: ${talla}
                Público: ${tipopublico}
            </p>
        </div>
    `;
});

// Ahora puedes usar `allData` como parte de tu recibo o salida


    const receipt = `
       <div style="  width: 280px; display: flex; flex-direction: column; align-items: center;">
            <img src="${calzadoPecas}" alt="Descripción de la imagen" style="width: 100px; height: 100px;" />
            </br>  
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

  //console.log('Factura Electrónica seleccionada: ' + JSON.stringify(ventasData, null, 2));
    //alert('Factura Electrónica seleccionada: ' + JSON.stringify(ventasData, null, 2));
    const printDocument = printIframe.contentWindow.document;
    printDocument.open();
    printDocument.write(`<pre>${receipt}</pre>`); // Formatea como texto
    printDocument.close();

    printIframe.contentWindow.focus();
    printIframe.contentWindow.print();

    // Eliminar el iframe después de imprimir
    setTimeout(() => {
        document.body.removeChild(printIframe);
    }, 1000);
}