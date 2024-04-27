import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { HiClipboardList } from "react-icons/hi";
import PropTypes from 'prop-types'
import DetailProductPage from '../../../pages/store-pages/product-pages/DetailProductPage';

export default function ProductDetailModal({buttonCheck,detailProduct,setButtonCheck}) {
  const [open, setOpen] = useState(buttonCheck===true? buttonCheck: false);
  console.log("Open state",open)

  function closeModal() {
    setOpen(false);
    buttonCheck===true? setButtonCheck(false):setOpen(false);
  }
  const cancelButtonRef = useRef(null)
  useEffect(()=>{
    
  },[detailProduct])
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-[32rem]">
                <div className="bg-white px-1 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <HiClipboardList className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:text-left items-center">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 mt-1.5 ml-2">
                        <span className='underline'>Cửa hàng:</span>  {detailProduct===undefined || detailProduct===null?"null":detailProduct.storeName} - <span className='underline'>Món:</span> {detailProduct===undefined || detailProduct===null?"null": detailProduct.name}
                      </Dialog.Title>
                      <div className="mt-2">
                        <DetailProductPage detailProduct={detailProduct}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      closeModal()
                    }}
                  >
                    Đóng
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

ProductDetailModal.propTypes={
  buttonCheck:PropTypes.bool,
  detailProduct:PropTypes.object,
  setButtonCheck:PropTypes.func
}
