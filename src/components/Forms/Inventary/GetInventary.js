import React, { useState, useEffect } from 'react';
import {
    Button,Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Box
} from '@mui/material';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

import inventaryServices from '../../../service/inventary.services';

function Inventary() {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        fetchInventary();
    }, []);

    const applyFilters = (searchValue, filters) => {
        let filtered = data; // Aquí asumes que ya tienes `data` cargado con los datos originales
    
        // Aplicar búsqueda general
        if (searchValue) {
            filtered = filtered.filter(item => 
                item.empresa.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.referencia.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.color.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.lugar.toLowerCase().includes(searchValue.toLowerCase())
            );
        }
    
        // Aplicar filtros específicos
        if (filters.empresa) {
            filtered = filtered.filter(item => 
                item.empresa.toLowerCase().includes(filters.empresa.toLowerCase())
            );
        }
        if (filters.referencia) {
            filtered = filtered.filter(item => 
                item.referencia.toLowerCase().includes(filters.referencia.toLowerCase())
            );
        }
        if (filters.color) {
            filtered = filtered.filter(item => 
                item.color.toLowerCase().includes(filters.color.toLowerCase())
            );
        }
        if (filters.lugar) {
            filtered = filtered.filter(item => 
                item.lugar.toLowerCase().includes(filters.lugar.toLowerCase())
            );
        }
    
        setFilteredData(filtered); // Actualizas `filteredData` con los resultados filtrados
    };
    
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => {
            const updatedFilters = {
                ...prevFilters,
                [name]: value
            };
            applyFilters(search, updatedFilters); // Aplica búsqueda y filtros
            return updatedFilters;
        });
    };
    
    const fetchInventary = async () => {
        try {
            const response = await inventaryServices.getInventary();
            //console.log('Response from backend:', response); // Verifica la estructura de los datos aquí

            setData(response); // Asignar la respuesta al estado
            setFilteredData(response); // Inicializar también filteredData
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearch(value);
        applyFilters(value, filters); // Aplica búsqueda y filtros
    };
    

    const handlePdfClick = async (item) => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.setLineWidth(0.5);
       

        // Generar el QR en base64
        try {
            if(item.publico === 'hombre'){
                const qrDataUrl34 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${34}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 20, 180, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 10,  20, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 30,  20, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 50,  20, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 70,  20, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 90,  20, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 110, 20, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 130, 20, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 150, 20, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 170, 20, 20, 20);
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico}/34`, 
                        80, 45);

                const qrDataUrl35 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${35}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 50, 180, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 10,  50, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 30,  50, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 50,  50, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 70,  50, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 90,  50, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 110, 50, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 130, 50, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 150, 50, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 170, 50, 20, 20);
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico}/35`,
                        80, 75);

                const qrDataUrl36 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${36}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 80, 180, 20); 
                    doc.addImage(qrDataUrl36, 'PNG', 10,  80, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 30,  80, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 50,  80, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 70,  80, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 90,  80, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 110, 80, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 130, 80, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 150, 80, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 170, 80, 20, 20);
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}36`,
                        80, 105);

                const qrDataUrl37 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${37}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 110, 180, 20); 
                    doc.addImage(qrDataUrl37, 'PNG', 10,  110, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 30,  110, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 50,  110, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 70,  110, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 90,  110, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 110, 110, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 130, 110, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 150, 110, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 170, 110, 20, 20);
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}37`,
                        80, 135);
                        
                const qrDataUrl38 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${38}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 140, 180, 20); 
                    doc.addImage(qrDataUrl38, 'PNG', 10,  140, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 30,  140, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 50,  140, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 70,  140, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 90,  140, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 110, 140, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 130, 140, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 150, 140, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 170, 140, 20, 20);

                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}38`,
                        80, 165);

                    doc.rect(10, 170, 180, 20); 
                    const qrDataUrl39 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${39}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.addImage(qrDataUrl39, 'PNG', 10,  170, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 30,  170, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 50,  170, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 70,  170, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 90,  170, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 110, 170, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 130, 170, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 150, 170, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 170, 170, 20, 20);

                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}39`,
                        80, 195);
                        doc.rect(10, 200, 180, 20); 

                const qrDataUrl40 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${40}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.addImage(qrDataUrl40, 'PNG', 10,  200, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 30,  200, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 50,  200, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 70,  200, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 90,  200, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 110, 200, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 130, 200, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 150, 200, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 170, 200, 20, 20);
        
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}40`,
                        80, 225);
                        doc.rect(10, 230, 180, 20); 

                const qrDataUrl41 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${41}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.addImage(qrDataUrl41, 'PNG', 10,  230, 20, 20);
                    doc.addImage(qrDataUrl41, 'PNG', 30,  230, 20, 20);
                    doc.addImage(qrDataUrl41, 'PNG', 50,  230, 20, 20);
                    doc.addImage(qrDataUrl41, 'PNG', 70,  230, 20, 20);
                    doc.addImage(qrDataUrl41, 'PNG', 90,  230, 20, 20);
                    doc.addImage(qrDataUrl41, 'PNG', 110, 230, 20, 20);
                    doc.addImage(qrDataUrl41, 'PNG', 130, 230, 20, 20);
                    doc.addImage(qrDataUrl41, 'PNG', 150, 230, 20, 20);
                    doc.addImage(qrDataUrl41, 'PNG', 170, 230, 20, 20);
        
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}41`,
                        80, 255);
                        doc.rect(10, 260, 180, 20); 
                        
                const qrDataUrl42 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${42}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                        doc.addImage(qrDataUrl42, 'PNG', 10,  260, 20, 20);
                        doc.addImage(qrDataUrl42, 'PNG', 30,  260, 20, 20);
                        doc.addImage(qrDataUrl42, 'PNG', 50,  260, 20, 20);
                        doc.addImage(qrDataUrl42, 'PNG', 70,  260, 20, 20);
                        doc.addImage(qrDataUrl42, 'PNG', 90,  260, 20, 20);
                        doc.addImage(qrDataUrl42, 'PNG', 110, 260, 20, 20);
                        doc.addImage(qrDataUrl42, 'PNG', 130, 260, 20, 20);
                        doc.addImage(qrDataUrl42, 'PNG', 150, 260, 20, 20);
                        doc.addImage(qrDataUrl42, 'PNG', 170, 260, 20, 20);
            
                        doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}42`,
                            80, 285);

                            doc.addPage(); 

                    const qrDataUrl43 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${43}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 20, 180, 20);
                    doc.addImage(qrDataUrl43, 'PNG', 10,  20, 20, 20);
                    doc.addImage(qrDataUrl43, 'PNG', 30,  20, 20, 20);
                    doc.addImage(qrDataUrl43, 'PNG', 50,  20, 20, 20);
                    doc.addImage(qrDataUrl43, 'PNG', 70,  20, 20, 20);
                    doc.addImage(qrDataUrl43, 'PNG', 90,  20, 20, 20);
                    doc.addImage(qrDataUrl43, 'PNG', 110, 20, 20, 20);
                    doc.addImage(qrDataUrl43, 'PNG', 130, 20, 20, 20);
                    doc.addImage(qrDataUrl43, 'PNG', 150, 20, 20, 20);
                    doc.addImage(qrDataUrl43, 'PNG', 170, 20, 20, 20);
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico}/43`, 
                        80, 45);
            // Guardar el PDF
            //doc.save(`QR_${item.empresa+' '+item.referencia+' '+item.color}.pdf`);
            }
            if(item.publico === 'mujer' ){
                const qrDataUrl34 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${34}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 20, 180, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 10,  20, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 30,  20, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 50,  20, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 70,  20, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 90,  20, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 110, 20, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 130, 20, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 150, 20, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 170, 20, 20, 20);
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico}/34`, 
                        80, 45);

                    const qrDataUrl35 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${35}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 50, 180, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 10,  50, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 30,  50, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 50,  50, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 70,  50, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 90,  50, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 110, 50, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 130, 50, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 150, 50, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 170, 50, 20, 20);
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico}/35`,
                        80, 75);

                    const qrDataUrl36 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${36}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 80, 180, 20); 
                    doc.addImage(qrDataUrl36, 'PNG', 10,  80, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 30,  80, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 50,  80, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 70,  80, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 90,  80, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 110, 80, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 130, 80, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 150, 80, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 170, 80, 20, 20);
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}36`,
                        80, 105);

                    const qrDataUrl37 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${37}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 110, 180, 20); 
                    doc.addImage(qrDataUrl37, 'PNG', 10,  110, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 30,  110, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 50,  110, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 70,  110, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 90,  110, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 110, 110, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 130, 110, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 150, 110, 20, 20);
                    doc.addImage(qrDataUrl37, 'PNG', 170, 110, 20, 20);
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}37`,
                        80, 135);
                        
                    const qrDataUrl38 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${38}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 140, 180, 20); 
                    doc.addImage(qrDataUrl38, 'PNG', 10,  140, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 30,  140, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 50,  140, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 70,  140, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 90,  140, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 110, 140, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 130, 140, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 150, 140, 20, 20);
                    doc.addImage(qrDataUrl38, 'PNG', 170, 140, 20, 20);

                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}38`,
                        80, 165);

                    doc.rect(10, 170, 180, 20); 
                    const qrDataUrl39 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${39}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.addImage(qrDataUrl39, 'PNG', 10,  170, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 30,  170, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 50,  170, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 70,  170, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 90,  170, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 110, 170, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 130, 170, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 150, 170, 20, 20);
                    doc.addImage(qrDataUrl39, 'PNG', 170, 170, 20, 20);

                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}39`,
                        80, 195);
                        doc.rect(10, 200, 180, 20); 

                    const qrDataUrl40 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${40}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.addImage(qrDataUrl40, 'PNG', 10,  200, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 30,  200, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 50,  200, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 70,  200, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 90,  200, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 110, 200, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 130, 200, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 150, 200, 20, 20);
                    doc.addImage(qrDataUrl40, 'PNG', 170, 200, 20, 20);
        
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}40`,
                        80, 225);

                   
                        doc.rect(10, 230, 180, 20); 
                        
                        const qrDataUrl42 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${41}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                        doc.addImage(qrDataUrl42, 'PNG', 10,  230, 20, 20);
                        doc.addImage(qrDataUrl42, 'PNG', 30,  230, 20, 20);
                        doc.addImage(qrDataUrl42, 'PNG', 50,  230, 20, 20);
                        doc.addImage(qrDataUrl42, 'PNG', 70,  230, 20, 20);
                        doc.addImage(qrDataUrl42, 'PNG', 90,  230, 20, 20);
                        doc.addImage(qrDataUrl42, 'PNG', 110, 230, 20, 20);
                        doc.addImage(qrDataUrl42, 'PNG', 130, 230, 20, 20);
                        doc.addImage(qrDataUrl42, 'PNG', 150, 230, 20, 20);
                        doc.addImage(qrDataUrl42, 'PNG', 170, 230, 20, 20);
            
                        doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}41`,
                            80, 255);
            // Guardar el PDF
            //doc.save(`QR_${item.empresa+' '+item.referencia+' '+item.color}.pdf`);
            }
            if(item.publico === 'niña'){
                const qrDataUrl21 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${21}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 20, 180, 20);
                    doc.addImage(qrDataUrl21, 'PNG', 10,  20, 20, 20);
                    doc.addImage(qrDataUrl21, 'PNG', 30,  20, 20, 20);
                    doc.addImage(qrDataUrl21, 'PNG', 50,  20, 20, 20);
                    doc.addImage(qrDataUrl21, 'PNG', 70,  20, 20, 20);
                    doc.addImage(qrDataUrl21, 'PNG', 90,  20, 20, 20);
                    doc.addImage(qrDataUrl21, 'PNG', 110, 20, 20, 20);
                    doc.addImage(qrDataUrl21, 'PNG', 130, 20, 20, 20);
                    doc.addImage(qrDataUrl21, 'PNG', 150, 20, 20, 20);
                    doc.addImage(qrDataUrl21, 'PNG', 170, 20, 20, 20);
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico}/21`, 
                        80, 45);

                    const qrDataUrl22 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${22}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 50, 180, 20);
                    doc.addImage(qrDataUrl22, 'PNG', 10,  50, 20, 20);
                    doc.addImage(qrDataUrl22, 'PNG', 30,  50, 20, 20);
                    doc.addImage(qrDataUrl22, 'PNG', 50,  50, 20, 20);
                    doc.addImage(qrDataUrl22, 'PNG', 70,  50, 20, 20);
                    doc.addImage(qrDataUrl22, 'PNG', 90,  50, 20, 20);
                    doc.addImage(qrDataUrl22, 'PNG', 110, 50, 20, 20);
                    doc.addImage(qrDataUrl22, 'PNG', 130, 50, 20, 20);
                    doc.addImage(qrDataUrl22, 'PNG', 150, 50, 20, 20);
                    doc.addImage(qrDataUrl22, 'PNG', 170, 50, 20, 20);
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico}/22`,
                        80, 75);

                    const qrDataUrl23 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${23}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 80, 180, 20); 
                    doc.addImage(qrDataUrl23, 'PNG', 10,  80, 20, 20);
                    doc.addImage(qrDataUrl23, 'PNG', 30,  80, 20, 20);
                    doc.addImage(qrDataUrl23, 'PNG', 50,  80, 20, 20);
                    doc.addImage(qrDataUrl23, 'PNG', 70,  80, 20, 20);
                    doc.addImage(qrDataUrl23, 'PNG', 90,  80, 20, 20);
                    doc.addImage(qrDataUrl23, 'PNG', 110, 80, 20, 20);
                    doc.addImage(qrDataUrl23, 'PNG', 130, 80, 20, 20);
                    doc.addImage(qrDataUrl23, 'PNG', 150, 80, 20, 20);
                    doc.addImage(qrDataUrl23, 'PNG', 170, 80, 20, 20);
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}23`,
                        80, 105);

                    const qrDataUrl24 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${24}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 110, 180, 20); 
                    doc.addImage(qrDataUrl24, 'PNG', 10,  110, 20, 20);
                    doc.addImage(qrDataUrl24, 'PNG', 30,  110, 20, 20);
                    doc.addImage(qrDataUrl24, 'PNG', 50,  110, 20, 20);
                    doc.addImage(qrDataUrl24, 'PNG', 70,  110, 20, 20);
                    doc.addImage(qrDataUrl24, 'PNG', 90,  110, 20, 20);
                    doc.addImage(qrDataUrl24, 'PNG', 110, 110, 20, 20);
                    doc.addImage(qrDataUrl24, 'PNG', 130, 110, 20, 20);
                    doc.addImage(qrDataUrl24, 'PNG', 150, 110, 20, 20);
                    doc.addImage(qrDataUrl24, 'PNG', 170, 110, 20, 20);
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}24`,
                        80, 135);
                        
                    const qrDataUrl25 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${25}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 140, 180, 20); 
                    doc.addImage(qrDataUrl25, 'PNG', 10,  140, 20, 20);
                    doc.addImage(qrDataUrl25, 'PNG', 30,  140, 20, 20);
                    doc.addImage(qrDataUrl25, 'PNG', 50,  140, 20, 20);
                    doc.addImage(qrDataUrl25, 'PNG', 70,  140, 20, 20);
                    doc.addImage(qrDataUrl25, 'PNG', 90,  140, 20, 20);
                    doc.addImage(qrDataUrl25, 'PNG', 110, 140, 20, 20);
                    doc.addImage(qrDataUrl25, 'PNG', 130, 140, 20, 20);
                    doc.addImage(qrDataUrl25, 'PNG', 150, 140, 20, 20);
                    doc.addImage(qrDataUrl25, 'PNG', 170, 140, 20, 20);

                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}25`,
                        80, 165);

                    doc.rect(10, 170, 180, 20); 
                    const qrDataUrl26 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${26}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.addImage(qrDataUrl26, 'PNG', 10,  170, 20, 20);
                    doc.addImage(qrDataUrl26, 'PNG', 30,  170, 20, 20);
                    doc.addImage(qrDataUrl26, 'PNG', 50,  170, 20, 20);
                    doc.addImage(qrDataUrl26, 'PNG', 70,  170, 20, 20);
                    doc.addImage(qrDataUrl26, 'PNG', 90,  170, 20, 20);
                    doc.addImage(qrDataUrl26, 'PNG', 110, 170, 20, 20);
                    doc.addImage(qrDataUrl26, 'PNG', 130, 170, 20, 20);
                    doc.addImage(qrDataUrl26, 'PNG', 150, 170, 20, 20);
                    doc.addImage(qrDataUrl26, 'PNG', 170, 170, 20, 20);

                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}26`,
                        80, 195);
                        doc.rect(10, 200, 180, 20); 

                    const qrDataUrl27 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${27}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.addImage(qrDataUrl27, 'PNG', 10,  200, 20, 20);
                    doc.addImage(qrDataUrl27, 'PNG', 30,  200, 20, 20);
                    doc.addImage(qrDataUrl27, 'PNG', 50,  200, 20, 20);
                    doc.addImage(qrDataUrl27, 'PNG', 70,  200, 20, 20);
                    doc.addImage(qrDataUrl27, 'PNG', 90,  200, 20, 20);
                    doc.addImage(qrDataUrl27, 'PNG', 110, 200, 20, 20);
                    doc.addImage(qrDataUrl27, 'PNG', 130, 200, 20, 20);
                    doc.addImage(qrDataUrl27, 'PNG', 150, 200, 20, 20);
                    doc.addImage(qrDataUrl27, 'PNG', 170, 200, 20, 20);
        
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}27`,
                        80, 225);
                        doc.rect(10, 230, 180, 20); 

                    const qrDataUrl28 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${28}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.addImage(qrDataUrl28, 'PNG', 10,  230, 20, 20);
                    doc.addImage(qrDataUrl28, 'PNG', 30,  230, 20, 20);
                    doc.addImage(qrDataUrl28, 'PNG', 50,  230, 20, 20);
                    doc.addImage(qrDataUrl28, 'PNG', 70,  230, 20, 20);
                    doc.addImage(qrDataUrl28, 'PNG', 90,  230, 20, 20);
                    doc.addImage(qrDataUrl28, 'PNG', 110, 230, 20, 20);
                    doc.addImage(qrDataUrl28, 'PNG', 130, 230, 20, 20);
                    doc.addImage(qrDataUrl28, 'PNG', 150, 230, 20, 20);
                    doc.addImage(qrDataUrl28, 'PNG', 170, 230, 20, 20);
        
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}28`,
                        80, 255);
                        doc.rect(10, 260, 180, 20); 
                        
                        const qrDataUrl29 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${29}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                        doc.addImage(qrDataUrl29, 'PNG', 10,  260, 20, 20);
                        doc.addImage(qrDataUrl29, 'PNG', 30,  260, 20, 20);
                        doc.addImage(qrDataUrl29, 'PNG', 50,  260, 20, 20);
                        doc.addImage(qrDataUrl29, 'PNG', 70,  260, 20, 20);
                        doc.addImage(qrDataUrl29, 'PNG', 90,  260, 20, 20);
                        doc.addImage(qrDataUrl29, 'PNG', 110, 260, 20, 20);
                        doc.addImage(qrDataUrl29, 'PNG', 130, 260, 20, 20);
                        doc.addImage(qrDataUrl29, 'PNG', 150, 260, 20, 20);
                        doc.addImage(qrDataUrl29, 'PNG', 170, 260, 20, 20);
            
                        doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}29`,
                            80, 285);

                            doc.addPage(); 

                    const qrDataUrl30 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${30}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 20, 180, 20);
                    doc.addImage(qrDataUrl30, 'PNG', 10,  20, 20, 20);
                    doc.addImage(qrDataUrl30, 'PNG', 30,  20, 20, 20);
                    doc.addImage(qrDataUrl30, 'PNG', 50,  20, 20, 20);
                    doc.addImage(qrDataUrl30, 'PNG', 70,  20, 20, 20);
                    doc.addImage(qrDataUrl30, 'PNG', 90,  20, 20, 20);
                    doc.addImage(qrDataUrl30, 'PNG', 110, 20, 20, 20);
                    doc.addImage(qrDataUrl30, 'PNG', 130, 20, 20, 20);
                    doc.addImage(qrDataUrl30, 'PNG', 150, 20, 20, 20);
                    doc.addImage(qrDataUrl30, 'PNG', 170, 20, 20, 20);
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico}/30`, 
                        80, 45);

                    const qrDataUrl31 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${31}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 50, 180, 20);
                    doc.addImage(qrDataUrl31, 'PNG', 10,  50, 20, 20);
                    doc.addImage(qrDataUrl31, 'PNG', 30,  50, 20, 20);
                    doc.addImage(qrDataUrl31, 'PNG', 50,  50, 20, 20);
                    doc.addImage(qrDataUrl31, 'PNG', 70,  50, 20, 20);
                    doc.addImage(qrDataUrl31, 'PNG', 90,  50, 20, 20);
                    doc.addImage(qrDataUrl31, 'PNG', 110, 50, 20, 20);
                    doc.addImage(qrDataUrl31, 'PNG', 130, 50, 20, 20);
                    doc.addImage(qrDataUrl31, 'PNG', 150, 50, 20, 20);
                    doc.addImage(qrDataUrl31, 'PNG', 170, 50, 20, 20);
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico}/31`,
                        80, 75);

                    const qrDataUrl32 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${32}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 80, 180, 20); 
                    doc.addImage(qrDataUrl32, 'PNG', 10,  80, 20, 20);
                    doc.addImage(qrDataUrl32, 'PNG', 30,  80, 20, 20);
                    doc.addImage(qrDataUrl32, 'PNG', 50,  80, 20, 20);
                    doc.addImage(qrDataUrl32, 'PNG', 70,  80, 20, 20);
                    doc.addImage(qrDataUrl32, 'PNG', 90,  80, 20, 20);
                    doc.addImage(qrDataUrl32, 'PNG', 110, 80, 20, 20);
                    doc.addImage(qrDataUrl32, 'PNG', 130, 80, 20, 20);
                    doc.addImage(qrDataUrl32, 'PNG', 150, 80, 20, 20);
                    doc.addImage(qrDataUrl32, 'PNG', 170, 80, 20, 20);
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}32`,
                        80, 105);

                    const qrDataUrl33 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${33}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 110, 180, 20); 
                    doc.addImage(qrDataUrl33, 'PNG', 10,  110, 20, 20);
                    doc.addImage(qrDataUrl33, 'PNG', 30,  110, 20, 20);
                    doc.addImage(qrDataUrl33, 'PNG', 50,  110, 20, 20);
                    doc.addImage(qrDataUrl33, 'PNG', 70,  110, 20, 20);
                    doc.addImage(qrDataUrl33, 'PNG', 90,  110, 20, 20);
                    doc.addImage(qrDataUrl33, 'PNG', 110, 110, 20, 20);
                    doc.addImage(qrDataUrl33, 'PNG', 130, 110, 20, 20);
                    doc.addImage(qrDataUrl33, 'PNG', 150, 110, 20, 20);
                    doc.addImage(qrDataUrl33, 'PNG', 170, 110, 20, 20);
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}33`,
                        80, 135);


                    const qrDataUrl34 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${34}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.rect(10, 140, 180, 20); 
                    doc.addImage(qrDataUrl34, 'PNG', 10,  140, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 30,  140, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 50,  140, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 70,  140, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 90,  140, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 110, 140, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 130, 140, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 150, 140, 20, 20);
                    doc.addImage(qrDataUrl34, 'PNG', 170, 140, 20, 20);

                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}34`,
                        80, 165);

                    doc.rect(10, 170, 180, 20); 
                    const qrDataUrl35 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${35}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.addImage(qrDataUrl35, 'PNG', 10,  170, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 30,  170, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 50,  170, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 70,  170, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 90,  170, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 110, 170, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 130, 170, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 150, 170, 20, 20);
                    doc.addImage(qrDataUrl35, 'PNG', 170, 170, 20, 20);

                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}35`,
                        80, 195);
                        doc.rect(10, 200, 180, 20); 

                    const qrDataUrl36 = await QRCode.toDataURL(`${item.empresa}'/'${item.referencia}'/'${item.color}'/'${item.lugar}'/'${36}'/'${item.publico}`, { errorCorrectionLevel: 'H' });
                    doc.addImage(qrDataUrl36, 'PNG', 10,  200, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 30,  200, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 50,  200, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 70,  200, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 90,  200, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 110, 200, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 130, 200, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 150, 200, 20, 20);
                    doc.addImage(qrDataUrl36, 'PNG', 170, 200, 20, 20);
        
                    doc.text(`${item.empresa+'/'+item.referencia+'/'+item.color+'/'+item.lugar+'/'+item.publico+'/'}36`,
                        80, 225);
                        
            // Guardar el PDF
           // doc.save(`QR_${item.empresa+' '+item.referencia+' '+item.color+' '+item.publico}.pdf`);
            }

            doc.save(`QR_${item.empresa+' '+item.referencia+' '+item.color+' '+item.publico}.pdf`);

            
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    

    return (
        <Container
            maxWidth="lg"
            sx={{
                backgroundColor: '#121212',
                color: 'white',
                border: '2px solid #333',
                borderRadius: '8px',
                opacity: 0.9,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7)',
                padding: '20px',
            }}
        >
            <Box display="flex" alignItems="center" sx={{ padding: '20px 0px' }}>
                <TextField
                    label="Buscar por Empresa, Referencia, Color o Lugar"
                    variant="outlined"
                    value={search}
                    onChange={handleSearchChange}
                    sx={{ width: '80%', margin: 'normal', height: '56px' }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: {
                            color: 'white',
                            backgroundColor: '#333',
                        },
                    }}
                />
                <Button
                    variant="outlined"
                    color='primary'
                    sx={{ borderColor: 'white', color: 'white', height: '56px', marginLeft: '8px', width: '20%' }}
                    onClick={fetchInventary}
                >
                    ACTUALIZAR
                </Button>
            </Box>
    
            <Box display="flex" sx={{ padding: '20px 0px' }}>
                <TextField
                    label="Filtro Empresa"
                    variant="outlined"
                    name="empresa"
                    onChange={handleFilterChange}
                    sx={{ width: '25%', margin: '0 8px' }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: {
                            color: 'white',
                            backgroundColor: '#333',
                        },
                    }}
                />
                <TextField
                    label="Filtro Referencia"
                    variant="outlined"
                    name="referencia"
                    onChange={handleFilterChange}
                    sx={{ width: '25%', margin: '0 8px' }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: {
                            color: 'white',
                            backgroundColor: '#333',
                        },
                    }}
                />
                <TextField
                    label="Filtro Color"
                    variant="outlined"
                    name="color"
                    onChange={handleFilterChange}
                    sx={{ width: '25%', margin: '0 8px' }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: {
                            color: 'white',
                            backgroundColor: '#333',
                        },
                    }}
                />
                <TextField
                    label="Filtro Lugar"
                    variant="outlined"
                    name="lugar"
                    onChange={handleFilterChange}
                    sx={{ width: '25%', margin: '0 8px' }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: {
                            color: 'white',
                            backgroundColor: '#333',
                        },
                    }}
                />
            </Box>
    
            {/* Contenedor de la tabla con barra de desplazamiento */}
            <Box sx={{
                maxHeight: { xs: '300px', sm: '400px', md: '500px' },
                overflowY: 'auto',
                maxWidth: { xs: '100%', sm: 'auto', md: 'auto' },
                width: '100%',
                margin: '0 auto',
                backgroundColor: '#121212',
                color: 'white',
                border: '2px solid #333',
                borderRadius: '8px',
                padding: '20px',
            }}>
                <TableContainer component={Paper} sx={{ backgroundColor: '#333', borderRadius: '8px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'white' }}>ID</TableCell>
                                <TableCell sx={{ color: 'white' }}>Empresa</TableCell>
                                <TableCell sx={{ color: 'white' }}>Referencia</TableCell>
                                <TableCell sx={{ color: 'white' }}>Color</TableCell>
                                <TableCell sx={{ color: 'white' }}>Lugar</TableCell>
                                <TableCell sx={{ color: 'white' }}>Público</TableCell>
                                <TableCell sx={{ color: 'white' }}>Estado</TableCell>
                                <TableCell sx={{ color: 'white' }}>Valor</TableCell>
                                <TableCell sx={{ color: 'white' }}>21</TableCell>
                                <TableCell sx={{ color: 'white' }}>22</TableCell>
                                <TableCell sx={{ color: 'white' }}>23</TableCell>
                                <TableCell sx={{ color: 'white' }}>24</TableCell>
                                <TableCell sx={{ color: 'white' }}>25</TableCell>
                                <TableCell sx={{ color: 'white' }}>26</TableCell>
                                <TableCell sx={{ color: 'white' }}>27</TableCell>
                                <TableCell sx={{ color: 'white' }}>28</TableCell>
                                <TableCell sx={{ color: 'white' }}>29</TableCell>
                                <TableCell sx={{ color: 'white' }}>30</TableCell>
                                <TableCell sx={{ color: 'white' }}>31</TableCell>
                                <TableCell sx={{ color: 'white' }}>32</TableCell>
                                <TableCell sx={{ color: 'white' }}>33</TableCell>
                                <TableCell sx={{ color: 'white' }}>34</TableCell>
                                <TableCell sx={{ color: 'white' }}>35</TableCell>
                                <TableCell sx={{ color: 'white' }}>36</TableCell>
                                <TableCell sx={{ color: 'white' }}>37</TableCell>
                                <TableCell sx={{ color: 'white' }}>38</TableCell>
                                <TableCell sx={{ color: 'white' }}>39</TableCell>
                                <TableCell sx={{ color: 'white' }}>40</TableCell>
                                <TableCell sx={{ color: 'white' }}>41</TableCell>
                                <TableCell sx={{ color: 'white' }}>42</TableCell>
                                <TableCell sx={{ color: 'white' }}>43</TableCell>
                                {/* Agrega más celdas según sea necesario */}
                                <TableCell sx={{ textAlign: 'center' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell sx={{ color: 'white' }}>{item.id}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.empresa}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.referencia}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.color}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.lugar}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.publico}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.estado}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.valor}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t21}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t22}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t23}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t24}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t25}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t26}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t27}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t28}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t29}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t30}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t31}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t32}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t33}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t34}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t35}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t36}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t37}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t38}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t39}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t40}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t41}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t42}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{item.t43}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            sx={{ borderColor: 'white', color: 'white' }}
                                            onClick={() => handlePdfClick(item)}
                                        >
                                            PDF
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
    
    
    
    
}

export default Inventary;
