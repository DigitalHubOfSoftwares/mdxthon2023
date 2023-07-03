import React, { useEffect, useState } from 'react';
import GalleryCategory from './GalleryCategory/GalleryGategory';
import GalleryModal from './GalleryModal/GalleryModal';

interface GalleryProps {
	galleryItems: any;
}

const Gallery: React.FC<GalleryProps> = ({ galleryItems }) => {
	const [ openModal, setOpenModal ] = useState<string | undefined>();
	const [ currentMedia, setCurrentMedia] = useState<string | undefined>();

	useEffect(() => {
		if (currentMedia != undefined && openModal == undefined){
			setOpenModal('dismissible');
		}else{
			setOpenModal(undefined);
		}
	}, [currentMedia]);

	const onItemClick = (src: string) => {
		setCurrentMedia(src);
	}

	const handleModalClose = () => {
		setCurrentMedia(undefined);
	}

	return (
		<div className='w-full h-full flex flex-col items-center'>
			<div className="grid grid-cols-1 p-7 overflow-y-auto gap-4">
				{
					galleryItems.map((galleryCategory: any, index: number) => (						
						<GalleryCategory key={galleryCategory.categoryId} categoryName={galleryCategory.categoryName} categoryTitle={galleryCategory.categoryTitle} categoryData={galleryCategory.mediaLibrary} onItemClick={onItemClick} />						
					))
				}
			</div>	
			<GalleryModal openModal={openModal} handleModalClose={handleModalClose} mediaContent={currentMedia}/>
		</div>
	);
}

export default Gallery;