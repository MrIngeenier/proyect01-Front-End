import ADDInventary from "../components/Forms/Inventary/Inventary.js";
import Inventary from "../components/Forms/Inventary/GetInventary";

function PageInventary(){
    return(
        <div>
            <ADDInventary/>{/* <Inventary/> */}
            <Inventary/>
        </div>
    );
}

export default PageInventary;