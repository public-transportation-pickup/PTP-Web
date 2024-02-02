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
		path: '/home',
		icon: <HiOutlineViewGrid />,
		flag: false
	},
	{
		key: 'store',
		label: 'Store',
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
		key: 'customers',
		label: 'Customers',
		path: '/customers',
		icon: <HiOutlineUsers />,
		flag:false
	},
	{
		key: 'Map',
		label: 'Map',
		path: '/messages',
		icon: <VscMapFilled />,
		flag:false
	},{
		key: 'Route',
		label: 'Route',
		path: '/route',
		icon: <CiRoute />,
		flag:false
	},
	{
		key: 'transactions',
		label: 'Transactions',
		path: '/transactions',
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