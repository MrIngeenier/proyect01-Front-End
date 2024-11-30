import React from "react";
import { Box } from "@mui/material";
import ADDReferences from "../components/Forms/Inventary/Referencias/referencias";
import ADDTipoZapato from "../components/Forms/Inventary/Referencias/Tipozapato/tipozapato";
import TipoIngreso from "../components/Forms/Inventary/TipoIngreso/tipoIngreso";
import ADDEmpresa from "../components/Forms/Empresas/Empresa";

function AllData() {
    return (
        <div>
            <Box mb={1}> {/* Añade margen inferior al primer componente */}
                <ADDReferences />
            </Box>
            <Box mb={1}> {/* Añade margen inferior al primer componente */}
                <ADDTipoZapato />
            </Box>
            <Box mb={1}> {/* Añade margen inferior al primer componente */}
                <TipoIngreso />
            </Box>
            <Box mb={1}> {/* Añade margen inferior al primer componente */}
                <ADDEmpresa />
            </Box>
            
            

        </div>
    );
}

export default AllData;