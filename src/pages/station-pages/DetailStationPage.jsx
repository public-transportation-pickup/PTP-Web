import PropTypes from 'prop-types'

export default function DetailStationPage({detailStation}) {
  return (
    <div>
      <div>
        <h1 className='text-slate-600 font-semibold font-montserrat'>Trạm: {detailStation.name}</h1>
        <div className='text-slate-600 ml-6 font-montserrat'>- Loại trụ: {detailStation.stopType}</div>
        <div className='text-slate-600 ml-6 font-montserrat'>- Địa chỉ: {detailStation.addressNo}, {detailStation.street===""?"Đường"+detailStation.street+",":""} Phường/Thị xã {detailStation.ward}, Quận {detailStation.zone}</div>
        <div className='text-slate-600 ml-6 font-montserrat'>- Tình trạng trạm: {detailStation.status}</div>
        <div className='text-slate-600 ml-6 font-montserrat'>- Tình trạng đăng kí cửa hàng: {detailStation.storeId==="00000000-0000-0000-0000-000000000000"?"Chưa được đăng kí cửa hàng":"Đã được đăng kí cửa hàng"}</div>
      </div>
    </div>
  )
}

DetailStationPage.propTypes={
  detailStation:PropTypes.object
}
