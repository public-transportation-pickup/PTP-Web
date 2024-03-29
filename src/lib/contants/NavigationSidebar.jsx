import {
	HiOutlineViewGrid,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'
import { VscMapFilled } from "react-icons/vsc";
import { CiRoute,CiShop } from "react-icons/ci";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />,
		flag: false
	},
	{
		key: 'store',
		label: 'Cửa hàng',
		path: '/store',
		icon: <CiShop />,
		flag:true
	},
	// {
	// 	key: 'products',
	// 	label: 'Products',
	// 	path: '/product',
	// 	icon: <HiOutlineCube />
	// },
	// {
	// 	key: 'orders',
	// 	label: 'Orders',
	// 	path: '/orders',
	// 	icon: <HiOutlineShoppingCart />
	// },
	{
		key: 'user',
		label: 'Người dùng',
		path: '/user',
		icon: <HiOutlineUsers />,
		flag:false
	},
	{
		key: 'Map',
		label: 'Bản đồ',
		path: '/map',
		icon: <VscMapFilled />,
		flag:false
	},{
		key: 'route',
		label: 'Tuyến',
		path: '/route',
		icon: <CiRoute />,
		flag:false
	},
	{
		key: 'category',
		label: 'Danh mục',
		path: '/category',
		icon: <HiOutlineDocumentText />,
		flag:false
	},
	
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]