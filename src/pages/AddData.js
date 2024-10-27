import React from "react";
import { Box } from "@mui/material";
import ADDReferences from "../components/Forms/Inventary/Referencias/referencias";
import ADDTipoZapato from "../components/Forms/Inventary/Referencias/Tipozapato/tipozapato";


function AllData() {
    return (
        <div>
            <Box mb={1}> {/* Añade margen inferior al primer componente */}
                <ADDReferences />
            </Box>
            <ADDTipoZapato />
        </div>
    );
}

export default AllData;