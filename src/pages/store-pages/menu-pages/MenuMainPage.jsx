import PaginationButton from "../../../components/store-components/PaginationButton";
import {Outlet, useParams} from 'react-router-dom'


export default function MenuMainPage() {
    const params= useParams();
    console.log("param store on menu main page", params.storeId);
  
    return (
    <>
        <h1 className="text-center mx-auto text-4xl">List Menu</h1>
        <button className="">Create Menu</button>
        {/* <div className="flex justify-end mb-8">
            <button className="rounded-lg bg-orange-400 pl-3 pr-4 pt-2 pb-2 flex flex-row items-center hover:bg-orange-100" onClick={handleCreateButtonClick}><HiOutlinePlusSm />Create new product</button>
        </div> */}
        
        <div className="border rounded-lg">
            <div className="flex flex-row">
                <div>
                    Menu List
                </div>
                <div>
                    Detail Menu
                    {/* Render detail menu ở đây */}
                    <Outlet/>
                </div>
            </div>
            <div>
                {/* <PaginationButton/> */}
            </div>
        </div>
        
    </>
  )
}
