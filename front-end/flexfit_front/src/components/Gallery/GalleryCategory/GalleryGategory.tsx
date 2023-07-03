import React from 'react';
import GalleryItem from '../GalleryItem/GalleryItem';

interface GalleryCategoryProps {
categoryTitle? : string;
	categoryData: any;
	onItemClick: any;
	categoryName: any
}

const GalleryCategory: React.FC<GalleryCategoryProps> = ({ categoryTitle = 'Title', categoryData, onItemClick, categoryName }) => {
	return (
		// Main Wrapper
		<div id={categoryName} className='w-full h-[50vh] min-h-[200px] max-h-[600px] flex flex-col p-[10px] my-[20px] border-2 border-[#e3003e] rounded-lg shadow-lg' >
			{/* Title Container */}
			<div className='w-full h-1/4 min-h-[25px] max-h-[75] flex justify-start'>
				<span>{ categoryTitle }</span>
			</div>
			{/* Video List And Button Wrapper */}
			<div className='w-full h-full flex'>
				{/* Video List Container */}
				<div className='w-[90%] h-full grid grid-flow-col items-center gap-x-14 p-4 scroll-smooth snap-x snap-always overflow-x-auto overflow-y-hidden max-sm:no-scrollbar border-x-4 border-[#e3003e] rounded-lg'>
					{
						categoryData.map((categoryItem: any, index: number) => (
							<GalleryItem key={categoryItem.id} itemTitle={categoryItem.title} src={categoryItem.src} srcThumbnail={categoryItem.srcThumbnail} handleOnClick={onItemClick}/>
						))
					}
				</div>
				{/* Button Container */}
				<div className='w-[10%] min-w-[100px] flex justify-center items-center'>
					<span>Scroll to View More</span>
				</div>
			</div>
		</div>
	);
}

export default GalleryCategory;