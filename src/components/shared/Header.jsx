import { HiOutlineBell, HiOutlineChatAlt, HiOutlineSearch } from 'react-icons/hi'
import {Popover, Transition,Menu} from '@headlessui/react'
import classNames from 'classnames'
import { Fragment } from 'react'
import {useNavigate} from 'react-router-dom'
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { signOutUserFailre, signOutUserStart, signOutUserSuccess } from '../../redux/user/userSlice'


export default function Header() {
//   const navigate= useNavigate();
  const dispatch=useDispatch();
  const {currentUser}=useSelector(state=>state.user);
//   console.log("Current user",currentUser);
//   console.log("Token", currentUser.stsTokenManager.accessToken)
const handleSignout= async ()=>{
    try{
      dispatch(signOutUserStart)
      await localStorage.clear();
      dispatch(signOutUserSuccess(currentUser));
      window.location.reload();
    }catch(error){
      dispatch(signOutUserFailre(error.message));
    }
  }
    return (
        <div className='bg-white h-16 px-4 flex justify-between items-center left-3 border-b border-gray-200'>
			<div className='relative'>
				<HiOutlineSearch fontSize={20} className='text-gray-400 absolute top-1/2 -translate-y-1/2 left-3'/>
				<input type='text' placeholder='Tìm kiếm...' className='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm px-4 pl-11'/>
			</div>
			<div className='flex items-center gap-2 mr-2'>
				<Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button
								className={classNames(
									open && 'bg-gray-100',
									'group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100'
								)}
							>
								{/* <HiOutlineChatAlt fontSize={24} /> */}
							</Popover.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
									<div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
										<strong className="text-gray-700 font-medium">Messages</strong>
										<div className="mt-2 py-1 text-sm">This is messages panel.</div>
									</div>
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover>
				<Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button
								className={classNames(
									open && 'bg-gray-100',
									'group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100'
								)}
							>
								{/* <HiOutlineBell fontSize={24}/> */}
							</Popover.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
									<div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
										<strong className="text-gray-700 font-medium">Notification</strong>
										<div className="mt-2 py-1 text-sm">This is notification panel.</div>
									</div>
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover>
				<Menu as="div" className="relative">
					<div>
						<Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
							<span className="sr-only">Open user menu</span>
							{currentUser ? (
								<div
								className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
								//style={{ backgroundImage: 'url("https://source.unsplash.com/80x80?face")' }}
								style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/27/45/09/360_F_227450952_KQCMShHPOPebUXklULsKsROk5AvN6H1H.jpg")'}}
							>
								<span className="sr-only">Marc Backes</span>
							</div>
							):(<HiArrowLeftOnRectangle  fontSize={24}/>) }
							
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
						<Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
							{/* <Menu.Item>
								{({ active }) => (
									<div
										onClick={() => navigate('/profile')}
										className={classNames(
											active && 'bg-gray-100',
											'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
										)}
									>
										Your Profile
									</div>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<div
										onClick={() => navigate('/settings')}
										className={classNames(
											active && 'bg-gray-100',
											'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
										)}
									>
										Settings
									</div>
								)}
							</Menu.Item> */}
							<Menu.Item>
								{({ active }) => (
									<div
										className={classNames(
											active && 'bg-gray-100',
											'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
										)}
										onClick={handleSignout}
									>
										Đăng xuất
									</div>
								)}
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</Menu>     
			</div>
		</div>
    )
}
