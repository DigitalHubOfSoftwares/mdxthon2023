import React from 'react';
import Image from 'next/image';

interface GalleryItemProps{
	srcThumbnail?:string;
	itemTitle?: string;
	src: string;
	width?: number;
	height?: number;
	alt?: string;
	type?:string;
	handleOnClick?: any;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ srcThumbnail = 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg', itemTitle = "Video Title Not Found", src, width = 300, height = 300, alt = "", type="image", handleOnClick = ''}) => {
	const SourceMedia = src;

	const itemClick = () => {
		if (handleOnClick){
			handleOnClick(SourceMedia);
		}
	}

	return (
		<div className="relative w-[20vw] h-full min-w-[200px] max-w-[600px] snap-center rounded-lg overflow-hidden" onClick={itemClick}>
			{/* Skeleton Container */}
			<div role="status" className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
				<svg className="w-12 h-12 text-gray-200 dark:text-gray-600 z-0" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 384 512">
					<path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"/>
				</svg>
				<span className="sr-only">Loading...</span>
			</div>
			{/* Video Thumbnail */}
			<Image className="absolute inset-0 z-10 w-full h-full object-cover" src={srcThumbnail} fill alt={alt} />

			{/* Video Title Overlay */}
			<div className='group transition absolute w-full h-full z-20 bottom-0 hover:bg-gradient-to-tr from-gray-900' > 
				<span className='absolute bg-gray-900 p-2 rounded-lg bottom-0 my-2 ml-6 text-white group-hover:text-white group-hover:bg-transparent'>{itemTitle}</span>				
			</div>
		</div>
	);
}

export default GalleryItem;