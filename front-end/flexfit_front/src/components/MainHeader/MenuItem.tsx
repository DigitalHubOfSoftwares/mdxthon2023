import React from 'react';
import Link from 'next/link';
import { Dropdown, CustomFlowbiteTheme } from 'flowbite-react';
import { useRouter } from 'next/router';

interface MenuItemProps {
	title: string;
	route?: string;
	subItems: MenuItemProps[];
	textColor?: string;
}
  
const MenuItem: React.FC<MenuItemProps> = ({ title, subItems, route = '/', textColor = 'text-white' }) => {

	const router = useRouter();

	const customDropDowntheme: CustomFlowbiteTheme['dropdown'] = {
		arrowIcon: "ml-2 h-4 w-4",
		content: "py-1",
		floating: {
			item: {
				base: "flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-black",
				icon: "mr-2 h-4 w-4"
			},
			style: {
				auto: "border-0 rounded-lg overflow-hidden bg-black text-gray-900"
			},
			target: `w-fit ${textColor}`
		},
		inlineWrapper: "flex items-center"
	  }

	if (subItems.length === 0) {
		return (			
			<Link className={`${textColor} hover:text-black w-full`} href={route}>{title}</Link>			
		);
	}

	return (
		<Dropdown theme={customDropDowntheme} inline label={<Link href={route}>{title}</Link>}>
			{subItems.map((subItem, index) => (
				<Dropdown.Item key={index} className='text-black'>
					<MenuItem key={subItem.title} route={ subItem.route } {...subItem} />
				</Dropdown.Item>
			))}
		</Dropdown>
	);
};

export default MenuItem;