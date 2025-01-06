import calzadoPecas from '../asset/images/imagePecas.png';

export function generateCashEnclosure(ventasFiltradas) {  
    
    
    
    let allData = ""; // Inicializar el acumulador
    let totalValue = 0;
    let iva = 0;
    let subtotal = 0;
    let debito = 0;
    let efectivo = 0;
    let credito = 0;
    let contdebito = 0;
    let contefectivo = 0;
    let contcredito = 0;

    const ivaRate = 0.19;
    ventasFiltradas.forEach((venta, index) => {
        // Extraer datos de cada venta
        const empresa = venta.empresa || "No Empresa";
        const serial = venta.serial || "No Referencia";
        const color = venta.color || "No Color";
        const talla = venta.talla_vendida || "No Talla";
        const valor = venta.valor || 0;
        const estado = venta.estado || "False";
        const cliente = venta.cliente_nombre || "NA";
        const ccCliente = venta.cliente_cedula || "NA";
        const tipo = venta.tipo_pago || "NA";
        const numericValue = parseFloat(valor) || 0;

        
        totalValue += numericValue;
        
        subtotal = Math.round(totalValue / (1 + ivaRate));
        iva = totalValue  - subtotal;
        
        if (tipo === "Debito") {
            debito += numericValue;
            contdebito += 1;
        }

        if (tipo === "Credito") {
            credito += numericValue;
            contcredito += 1;
        }

        if (tipo === "Efectivo") {
            efectivo += numericValue;
            contefectivo += 1;
        }
        // Construir el HTML con los datos procesados
        allData += `
            <div>
                <p style="margin: 0; padding: 0;">
                    <strong>Item #${index + 1}</strong>: <br>
                </p>
                <p style="margin-top: 0px;">
                    ${empresa} / ${serial} / ${color} / ${talla} / ${estado} / ${cliente} / ${ccCliente} / ${tipo} / ${numericValue.toLocaleString()}
                    
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
                <span> REPORTE </span><br>
                     
                </div>

                
               
                <hr style="border: none; border-top: 1px dashed black; margin: 10px 0;">
                ${allData}
                <hr style="border: none; border-top: 1px dashed black; margin: 10px 0; ">
                    <div style="font-family: Arial, sans-serif; margin: 10px 0;">
                    
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            
                            <span>Debito:   #${contdebito.toLocaleString()} </span>
                            <span>${debito.toLocaleString()}</span>
                        </div>

                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            
                            <span>Credito:  #${contcredito.toLocaleString()}</span>
                            <span>${credito.toLocaleString()}</span>
                        </div>

                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            
                            <span>Efectivo: #${contefectivo.toLocaleString()}</span>
                            <span>${efectivo.toLocaleString()}</span>
                        </div>

                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            
                            <span>Subtotal:</span>
                            <span>${subtotal.toLocaleString()}</span>
                        </div>

                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span>IVA (19%):</span>
                            <span>${iva.toLocaleString()}</span>
                        </div>

                        <div style="display: flex; justify-content: space-between; font-weight: bold; ">
                            <span>Total:</span>
                        <strong>Total: ${totalValue.toLocaleString()}</strong>
                        </div>
                    </div>
                
                <hr style="border: none; border-top: 1px dashed black; margin: 10px 0;">
                    
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