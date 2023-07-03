import React from 'react';
import Gallery from '@/components/Gallery/Gallery';
import { getGalleryContent, getMenuData } from '@/lib/functions';
import Layout from '@/components/Layout';


interface GalleryPageProps {
	galleryData: any;
	menuData: any;
}

const GalleryPage:React.FC<GalleryPageProps> = ({ galleryData, menuData }) => {
	return (
		<Layout title='Gallery' menuData={menuData}>
			<div className='h-full'>
				<Gallery galleryItems={galleryData} />
			</div>
		</Layout>	
	);
}

export async function getServerSideProps(context: any) {

	const { category } = context.params;

	const galleryData = await getGalleryContent(category);
	const menuData = getMenuData();

    if (!galleryData || galleryData.length === 0) {
        return { notFound: true };
    }

	// You must return an object with a props key
	return {
		props: {
			galleryData: galleryData,
			menuData: menuData
		}
	}
}	

export default GalleryPage;