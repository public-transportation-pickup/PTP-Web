import PropTypes from 'prop-types'

export default function DetailStationPage({detailStation}) {
  return (
    <div>
      <div>
        <h1 className='text-slate-600 font-semibold'>Trạm: {detailStation.name}</h1>
        <div className='text-slate-600 font-semibold ml-6'>- Loại trụ: {detailStation.stopType}</div>
        <div className='text-slate-600 font-semibold ml-6'>- Địa chỉ: {detailStation.addressNo}, {detailStation.street===""?"Đường"+detailStation.street+",":""} Phường/Thị xã {detailStation.ward}, Quận {detailStation.zone}</div>
        <div className='text-slate-600 font-semibold ml-6'>- Tình trạng trạm: {detailStation.status}</div>
        <div className='text-slate-600 font-semibold ml-6'>- Tình trạng đăng kí cửa hàng: {detailStation.storeId==="00000000-0000-0000-0000-000000000000"?"Chưa được đăng kí cửa hàng":"Đã được đăng kí cửa hàng"}</div>
      </div>
    </div>
  )
}

DetailStationPage.propTypes={
  detailStation:PropTypes.object
}
