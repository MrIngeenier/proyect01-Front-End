
export function generatePrintInventary(ventasFiltradas) {  
    
   // alert(JSON.stringify(ventasFiltradas, null, 2));
    let allData = "";
   

    
    ventasFiltradas.forEach((venta) => {
        console.log(venta.id);
        // Extraer datos de cada venta
        const id = venta.id || "No ID";
        const empresa = venta.empresa || "No Empresa";
        const referencia = venta.referencia || "No Referencia";
        const color = venta.color || "No Color";
        const valor = venta.valor || 0;
        const publico = venta.publico || "No publico";
        const talla21 = venta.t21 || "No 21";
        const talla22 = venta.t22 || "No 22";
        const talla23 = venta.t23 || "No 23";
        const talla24 = venta.t24 || "No 24";
        const talla25 = venta.t25 || "No 25";
        const talla26 = venta.t26 || "No 26";
        const talla27 = venta.t27 || "No 27";
        const talla28 = venta.t28 || "No 28";
        const talla29 = venta.t29 || "No 29";
        const talla30 = venta.t30 || "No 30";
        const talla31 = venta.t31 || "No 31";
        const talla32 = venta.t32 || "No 32";
        const talla33 = venta.t33 || "No 33";
        const talla34 = venta.t34 || "No 34";
        const talla35 = venta.t35 || "No 35";
        const talla36 = venta.t36 || "No 36";
        const talla37 = venta.t37 || "No 37";
        const talla38 = venta.t38 || "No 38";
        const talla39 = venta.t39 || "No 39";
        const talla40 = venta.t40 || "No 40";
        const talla41 = venta.t41 || "No 41";
        const talla42 = venta.t42 || "No 42";
        const talla43 = venta.t43 || "No 43";

        let publicoInfo = '';

        switch (publico) {
            case 'niña':
                publicoInfo = `
                <div>
                    <p style="margin-top: 0px;">
                        ${empresa} / ${referencia} / ${color} / ${valor} / ${publico}
                    </p>
                    <ul style="margin-top: 0px; display: flex; flex-wrap: wrap; justify-content: space-between; padding: 0; list-style-position: inside;">
                        <li style="margin: 5px;">21: ${talla21}</li>
                        <li style="margin: 5px;">22: ${talla22}</li>
                        <li style="margin: 5px;">23: ${talla23}</li>
                        <li style="margin: 5px;">24: ${talla24}</li>
                        <li style="margin: 5px;">25: ${talla25}</li>
                        <li style="margin: 5px;">26: ${talla26}</li>
                        <li style="margin: 5px;">27: ${talla27}</li>
                        <li style="margin: 5px;">28: ${talla28}</li>
                        <li style="margin: 5px;">29: ${talla29}</li>
                        <li style="margin: 5px;">30: ${talla30}</li>
                        <li style="margin: 5px;">31: ${talla31}</li>
                        <li style="margin: 5px;">32: ${talla32}</li>
                        <li style="margin: 5px;">33: ${talla33}</li>
                        <li style="margin: 5px;">34: ${talla34}</li>
                        <li style="margin: 5px;">35: ${talla35}</li>
                    </ul>
                </div>`;
                break;


                case 'hombre':
                    publicoInfo = `
                    <div>
                        <p style="margin-top: 0px;">
                            ${empresa} / ${referencia} / ${color} / ${valor} / ${publico}
                        </p>
                        <ul style="margin-top: 0px; display: flex; flex-wrap: wrap; justify-content: space-between; padding: 0; list-style-position: inside;">
                            <li style="margin: 5px;">33: ${talla33}</li>
                            <li style="margin: 5px;">34: ${talla34}</li>
                            <li style="margin: 5px;">35: ${talla35}</li>
                            <li style="margin: 5px;">36: ${talla36}</li>
                            <li style="margin: 5px;">37: ${talla37}</li>
                            <li style="margin: 5px;">38: ${talla38}</li>
                            <li style="margin: 5px;">39: ${talla39}</li>
                            <li style="margin: 5px;">40: ${talla40}</li>
                            <li style="margin: 5px;">41: ${talla41}</li>
                            <li style="margin: 5px;">42: ${talla42}</li>
                            <li style="margin: 5px;">43: ${talla43}</li>
                        </ul>
                    </div>`;
                    break;
                    case 'mujer':
                        publicoInfo = `
                        <div>
                            <p style="margin-top: 0px;">
                                ${empresa} / ${referencia} / ${color} / ${valor} / ${publico}
                            </p>
                        <ul style="margin-top: 0px; display: flex; flex-wrap: wrap; justify-content: space-between; padding: 0; list-style-position: inside;">
                                <li style="margin: 5px;">33: ${talla33}</li>
                                <li style="margin: 5px;">34: ${talla34}</li>
                                <li style="margin: 5px;">35: ${talla35}</li>
                                <li style="margin: 5px;">36: ${talla36}</li>
                                <li style="margin: 5px;">37: ${talla37}</li>
                                <li style="margin: 5px;">38: ${talla38}</li>
                                <li style="margin: 5px;">39: ${talla39}</li>
                                <li style="margin: 5px;">40: ${talla40}</li>
                                <li style="margin: 5px;">41: ${talla41}</li>
                                
                            </ul>
                        </div>`;
                        break;
            default:
                publicoInfo = `
                    <p style="margin-top: 0px;">
                        PUBLICO NO ENCOTRADO ${publico} 
                    </p>
                `;
                break;
        }
       
        // Construir el HTML con los datos procesados
        allData += `
        <div>
            <p style="margin: 0; padding: 0;">
                <strong>ID : ${id}</strong> <br>
            </p>
            ${publicoInfo}
            <hr style="border: none; border-top: 1px dashed black; margin: 10px 0; ">
        </div>
    `;
    });

    // Crear un elemento de imagen y esperar a que se cargue
    
    
    
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
                <span> INVENTARIO </span><br>
                     
                </div>

                
               
                <hr style="border: none; border-top: 1px dashed black; margin: 10px 0;">
                ${allData}
                <hr style="border: none; border-top: 1px dashed black; margin: 10px 0; ">
                    
                
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
        printIframe.contentWindow.print();
       
    

    
}
