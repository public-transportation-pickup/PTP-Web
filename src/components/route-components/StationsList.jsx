import PropTypes from 'prop-types'
import { HiDotsVertical } from "react-icons/hi";

export default function StationsList({listStationofRouteVar,handleStationId}) {
    console.log("handleStationId:",handleStationId);
  return (
    <div>
        <div>
            {/* {listStationofRouteVar.outBound ===true ? 'Lượt đi' : 'Lượt về'} */}
            Lượt đi
        </div>
        <div className='flex flex-col gap-2'>
            <div>
                {listStationofRouteVar}
                {/* Check item[0] thì ko hiện icon đầu tiên */}
                <HiDotsVertical/>
                {/* <li>{listStationofRouteVar.name}</li> */}
                <li className='pl-1'>Bến xe An Sương</li>
                <HiDotsVertical/>
            </div>
        </div>
    </div>
  )
}
StationsList.propTypes={
    // List phải require
    listStationofRouteVar:PropTypes.array,
    handleStationId:PropTypes.func
}

