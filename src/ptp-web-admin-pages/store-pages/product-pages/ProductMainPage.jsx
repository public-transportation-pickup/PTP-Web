import PaginationButton from "../../../ptp-web-admin-components/store-components/PaginationButton";


export default function ProductMainPage() {
  return (
    <>
        <h1 className="text-center mx-auto text-4xl">List Store</h1>
        {/* <div className="flex justify-end mb-8">
            <button className="rounded-lg bg-orange-400 pl-3 pr-4 pt-2 pb-2 flex flex-row items-center hover:bg-orange-100" onClick={handleCreateButtonClick}><HiOutlinePlusSm />Create new product</button>
        </div> */}
        
        <div className="border rounded-lg">
            <table className="table-auto rounded-lg min-w-full divide-y divide-gray-200">
                <thead className="rounded-lg bg-gray-50">
                    <tr>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-100">
                    <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                    <td>Malcolm Lockyer</td>
                    <td>1961</td>
                    </tr>
                    <tr>
                    <td>Witchy Woman</td>
                    <td>The Eagles</td> 
                    <td>1972</td>
                    </tr>
                    <tr>
                    <td>Shining Star</td>
                    <td>Earth, Wind, and Fire</td>
                    <td>1975</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <PaginationButton/>
            </div>
        </div>
    </>
  )
}

/*
    Thay đổi icon khi từ menu điều hướng qua (Web Store)
*/
