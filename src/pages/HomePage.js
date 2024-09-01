import SiderbarHomePage from '../components/HomePage/Sidebar/SidebarHomePage'
import BodyHompage from '../components/HomePage/Body/BodyHomePage';
function HomePage(){
    return(
        <div className="principal" style={{display:'flex'}}>
            
            <SiderbarHomePage/>
            <BodyHompage/>
            
        </div>
    );
}

export default HomePage;