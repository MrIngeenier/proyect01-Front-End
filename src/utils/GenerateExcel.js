import * as XLSX from 'xlsx';
import { encryptText } from './Encript';

export function generateExcel(ventasFiltradas) {
  const result = [];
  //console.log(ventasFiltradas);

  // Iterar sobre los productos filtrados
  ventasFiltradas.forEach(item => {
    // Iterar sobre las tallas definidas
    ['t21', 't22', 't23', 't24', 't25', 't26', 't27', 't28', 't29', 't30', 't31', 't32', 't33', 't34', 't35', 't36', 't37', 't38', 't39', 't40', 't41', 't42', 't43'].forEach(talla => {
      // Si la talla tiene una cantidad mayor que 0, agregar la fila
      const tallaNumero = talla.slice(1); 


      if (item[talla] > 0) {
        const QR = `${item.empresa}/${item.referencia}/${item.color}/${item.lugar}/${tallaNumero}/${item.publico}/${item.valor}`;
        //console.log("QR: "+QR);
        const encryptedQR = encryptText(QR);
        result.push({
          EMPRESA: item.empresa,
          REFERENCIA: item.referencia,
          COLOR: item.color,
          LUGAR: item.lugar,
          PUBLICO: item.publico,
          TALLA: tallaNumero,
          CANTIDAD: item[talla],
          VALOR: item.valor,
          QR: encryptedQR,
        });
      }
    });
  });

  // Convertir el array de objetos a hoja de trabajo de Excel
  const worksheet = XLSX.utils.json_to_sheet(result, {
    header: ['EMPRESA', 'REFERENCIA', 'COLOR','LUGAR','PUBLICO', 'TALLA', 'CANTIDAD','VALOR', 'QR'],
  });

  // Crear el libro de trabajo
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventario');

  // Generar y descargar el archivo Excel
  XLSX.writeFile(workbook, 'Libro 3.xlsx');
}
