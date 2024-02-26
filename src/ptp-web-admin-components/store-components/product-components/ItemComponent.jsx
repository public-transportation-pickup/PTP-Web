import { Link } from "react-router-dom";
import { MdAccessTime } from "react-icons/md";
import PropTypes from 'prop-types'

export default function ItemComponent({listing}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[270px]'>
    <Link to={`/product/${listing._id}`}>
        <img src={listing.imageUrls[0] ||"https:https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.architecturaldigest.com%2Fphotos%2F61b0ce48dccdb75fa170f8f7%2F16%3A9%2Fw_1280%2Cc_limit%2FPurpleCherry_Williams_0012.jpg&tbnid=z8EjvFa1Mc-KBM&vet=12ahUKEwix6NirjrSDAxXMSmwGHeBCA1kQMygBegQIARBz..i&imgrefurl=https%3A%2F%2Fwww.architecturaldigest.com%2Fstory%2Fbig-houses-sprawling-estates-and-cool-compounds-tour-12-large-properties&docid=G7y6tU89Neba0M&w=1280&h=720&q=estate&ved=2ahUKEwix6NirjrSDAxXMSmwGHeBCA1kQMygBegQIARBz"} alt="listing cover"
            className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'/>
        
        <div className="p-3 flex flex-col gap-2 w-full">
            <p className="truncate text-lg font-semibold text-slate-700">Tên store</p>
            <div className='flex items-center gap-1'>
                <MdAccessTime  className='h-4 w-4 text-green-700'/>
                <p className='text-sm text-gray-600 truncate w-full'>thời gian chuẩn bị</p>
            </div>
            <p className='text-sm text-gray-600 line-clamp-2'>Mô tả</p>
            <p className='text-slate-500 mt-2 font-semibold'>
                $
                {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                {/*Giá*/}
            </p>
            <div className='text-slate-700 flex gap-4'>
                <div className='font-bold text-xs'>
                    Ngày hết hạn
                </div>

            </div>
        </div>
    </Link>
</div>
  )
}

ItemComponent.propTypes={
    listing:PropTypes.object.isRequired
}
