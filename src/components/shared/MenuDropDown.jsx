import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { HiDotsHorizontal } from "react-icons/hi";
import PropTypes from 'prop-types'
import Modal from './Modal';

export default function MenuDropDown({EditFunc, ViewDetailFunc,DeleteFunc }) {
    return (
        <div className="">
          <Menu as="div" className="z-10 relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md py-3 text-base font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                {/* Options */}
                <HiDotsHorizontal
                  className="-mr-1 ml-2 h-5 w-5 text-blue-400 hover:text-blue-100"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="z-20 absolute right-0 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                      onClick={()=>EditFunc()}
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-xs`}
                      >
                        {active ? (
                          <EditActiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <EditInactiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                        Chỉnh sửa
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                      onClick={()=>ViewDetailFunc()}
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-xs`}
                      >
                        {active ? (
                          <DuplicateActiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <DuplicateInactiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                        Xem chi tiết
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Modal buttonValue={
                        <div
                        // onClick={DeleteFunc}
                          className={`${
                            active ? 'bg-blue-500 text-white hover:bg-blue-500' : 'text-gray-900'
                          } group flex w-full rounded-lg px-2 py-2 text-xs z-20`}
                        >
                          {active ? (
                            <DeleteActiveIcon
                              className="mr-2 h-5 w-5 text-blue-400"
                              aria-hidden="true"
                            />
                          ) : (
                            <DeleteInactiveIcon
                              className="mr-2 h-5 w-5 text-blue-400"
                              aria-hidden="true"
                            />
                          )}
                          Xóa
                        </div>
                      } EnumHandler={DeleteFunc} title="Bạn chắc chắn muốn xóa"/>
                     
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )
}

function EditInactiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 13V16H7L16 7L13 4L4 13Z"
          fill="#EDE9FE"
          stroke="#4696FC"
          strokeWidth="2"
        />
      </svg>
    )
  }
  
  function EditActiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 13V16H7L16 7L13 4L4 13Z"
          fill="#4696FC"
          stroke="#67A7F8"
          strokeWidth="2"
        />
      </svg>
    )
  }
  
  function DuplicateInactiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 4H12V12H4V4Z"
          fill="#EDE9FE"
          stroke="#67A7F8"
          strokeWidth="2"
        />
        <path
          d="M8 8H16V16H8V8Z"
          fill="#EDE9FE"
          stroke="#67A7F8"
          strokeWidth="2"
        />
      </svg>
    )
  }
  
  function DuplicateActiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 4H12V12H4V4Z"
          fill="#4696FC"
          stroke="#87B8F6"
          strokeWidth="2"
        />
        <path
          d="M8 8H16V16H8V8Z"
          fill="#4696FC"
          stroke="#87B8F6"
          strokeWidth="2"
        />
      </svg>
    )
  }
  

  function DeleteInactiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="6"
          width="10"
          height="10"
          fill="#EDE9FE"
          stroke="#67A7F8"
          strokeWidth="2"
        />
        <path d="M3 6H17" stroke="#67A7F8" strokeWidth="2" />
        <path d="M8 6V4H12V6" stroke="#67A7F8" strokeWidth="2" />
      </svg>
    )
  }
  
  function DeleteActiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="6"
          width="10"
          height="10"
          fill="#4696FC"
          stroke="#87B8F6"
          strokeWidth="2"
        />
        <path d="M3 6H17" stroke="#87B8F6" strokeWidth="2" />
        <path d="M8 6V4H12V6" stroke="#87B8F6" strokeWidth="2" />
      </svg>
    )
  }

  MenuDropDown.propTypes={
    EditFunc:PropTypes.func,
    ViewDetailFunc:PropTypes.func,
    DeleteFunc:PropTypes.func,
  }