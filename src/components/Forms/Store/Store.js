import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, FormControl, InputLabel, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'; // Icono de eliminar
import inventaryServices from "../../../service/inventary.services";

// Estilos
const Backgrond = {
    backgroundColor: 'rgba(223, 223, 223, 0.7)', 
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px',
    marginBottom: '-20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
    borderRadius: '8px', 
};

const buttonStyle = {
    width: '100%', // Ancho del botón (cuadrado)
    height: '100%', // Alto del botón (cuadrado)
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'none',
    padding: 2,
    color: 'black',
    backgroundColor:'#FFFFFF',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)', 

};

const searchStyle = {
    marginBottom: 2,
    width: '80%', // Ancho de la barra de búsqueda
    maxWidth: '600px', // Tamaño máximo
};

function Store() {
    const [data, setData] = useState([]);           // Datos del inventario
    const [search, setSearch] = useState('');        // Valor de búsqueda
    const [selectedItems, setSelectedItems] = useState([]);  // Arreglo de productos seleccionados

    useEffect(() => {
        fetchInventary();
    }, []);

    const fetchInventary = async () => {
        try {
            const response = await inventaryServices.getInventary();
            setData(response); // Asignar la respuesta al estado
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    // Filtrar los datos según la búsqueda
    const filteredData = data.filter(item => 
        (item.empresa && item.empresa.toLowerCase().includes(search.toLowerCase())) ||
        (item.referencia && item.referencia.toLowerCase().includes(search.toLowerCase()))
    );

    // Manejar cambio en el input de búsqueda
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    // Manejar clic en el botón para seleccionar el producto
    const handleSelect = (item) => {
        setSelectedItems((prevSelected) => [
            ...prevSelected,
            { 
                empresa: item.empresa, 
                referencia: item.referencia, 
                color: item.color, 
                valor: item.valor,
                publico: item.publico,
                talla: ''  // Inicializamos la talla vacía
            }
        ]);
    };

    // Manejar cambio de talla en la tabla
    const handleTallaChange = (event, index) => {
        const newSelectedItems = [...selectedItems];
        newSelectedItems[index].talla = event.target.value;  // Actualizar la talla
        setSelectedItems(newSelectedItems);
    };

    // Eliminar un producto de la lista seleccionada
    const handleDelete = (index) => {
        const newSelectedItems = selectedItems.filter((item, i) => i !== index);
        setSelectedItems(newSelectedItems);
    };

    const handleValorChange = (event, index) => {
        const newSelectedItems = [...selectedItems];
        newSelectedItems[index].valor = event.target.value; // Actualiza el valor
        setSelectedItems(newSelectedItems);
    };
    

    return (
        <Box sx={ { marginBottom: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            maxWidth: { xs: '350px', sm: '100%', md: '100%', lg: '100%', xl: '100%' } 

        }}>

            <Box sx={{ marginTop: 3,marginBottom:3, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>Productos Seleccionados</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ backgroundColor: 'rgba(227, 226, 226, 0.25)',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
                    borderRadius: '8px',
                    minWidth: 700 }} aria-label="Productos seleccionados">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Empresa</strong></TableCell>
                                <TableCell><strong>Referencia</strong></TableCell>
                                <TableCell><strong>Color</strong></TableCell>
                                <TableCell><strong>Valor</strong></TableCell>
                                <TableCell><strong>publico</strong></TableCell>

                                <TableCell><strong>Talla</strong></TableCell>
                                <TableCell><strong>Acciones</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedItems.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.empresa}</TableCell>
                                    <TableCell>{item.referencia}</TableCell>
                                    <TableCell>{item.color}</TableCell>
                                    <TableCell>
                                    <TextField
                                        type="number"
                                        value={item.valor}
                                        onChange={(event) => handleValorChange(event, index)}
                                        variant="outlined"
                                        size="small"
                                    />
                                </TableCell>

                                    <TableCell>{item.publico}</TableCell>

                                    <TableCell>
                                        <FormControl fullWidth>
                                            <InputLabel>Talla</InputLabel>
                                            <Select
                                                value={item.talla}
                                                label="Talla"
                                                onChange={(event) => handleTallaChange(event, index)}
                                            >
                                                    <MenuItem value="21">21</MenuItem>
                                                    <MenuItem value="22">22</MenuItem>
                                                    <MenuItem value="23">23</MenuItem>
                                                    <MenuItem value="24">24</MenuItem>
                                                    <MenuItem value="25">25</MenuItem>
                                                    <MenuItem value="26">26</MenuItem>
                                                    <MenuItem value="27">27</MenuItem>
                                                    <MenuItem value="28">28</MenuItem>
                                                    <MenuItem value="29">29</MenuItem>
                                                    <MenuItem value="30">30</MenuItem>
                                                    <MenuItem value="31">31</MenuItem>
                                                    <MenuItem value="32">32</MenuItem>
                                                    <MenuItem value="33">33</MenuItem>
                                                    <MenuItem value="34">34</MenuItem>
                                                    <MenuItem value="35">35</MenuItem>
                                                    <MenuItem value="36">36</MenuItem>
                                                    <MenuItem value="37">37</MenuItem>
                                                    <MenuItem value="38">38</MenuItem>
                                                    <MenuItem value="39">39</MenuItem>
                                                    <MenuItem value="40">40</MenuItem>
                                                    <MenuItem value="41">41</MenuItem>
                                                    <MenuItem value="42">42</MenuItem>
                                                    <MenuItem value="43">43</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton 
                                            color="error" 
                                            onClick={() => handleDelete(index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Button variant="contained" color="success" sx={{ marginTop: 3,marginBottom:3 }}>
              Factura
            </Button>

            <TextField
                label="Buscar"
                variant="outlined"
                value={search}
                onChange={handleSearchChange}
                sx={searchStyle}
            />
            <Grid container spacing={1} justifyContent="center" sx={{ width: '100%' }}>
                {filteredData.map((item) => (
                    <Grid item key={item.id} xs={6} sm={3} md={4} lg={2}>
                        <Button 
                            
                            sx={buttonStyle} 
                            onClick={() => handleSelect(item)}
                        >
                            <Box>
                                <strong>{item.empresa}</strong>
                                <p>{item.referencia}</p>
                                <p>{item.color}</p>
                                <strong>{item.valor}</strong>
                            </Box>
                        </Button>
                    </Grid>
                ))}
            </Grid>

            {/* Mostrar la lista de productos seleccionados en una tabla */}
            
        </Box>
    );
}

export default Store;
