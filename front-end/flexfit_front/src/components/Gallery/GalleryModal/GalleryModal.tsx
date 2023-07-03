import React from 'react';
import Image from 'next/image';
import { Modal, Button, CustomFlowbiteTheme } from 'flowbite-react';
import { isVideo } from '@/lib/functions';

interface GalleryModalProps {
	openModal: string | undefined;
	handleModalClose: any;
	mediaContent?: any;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ openModal, handleModalClose, mediaContent = null }) => {

	const customModalTheme: CustomFlowbiteTheme['modal'] = {
		root:{
			show: {
				on: "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80 backdrop-blur",
				off: "hidden"
			},
		},
		content: {
			base: "relative p-4 md:h-auto",
			inner: "relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh] overflow-hidden"
		}
	}

	return(
		<Modal dismissible show={openModal === 'dismissible'} className='h-full' theme={customModalTheme} onClose={handleModalClose}>
			<Modal.Body className="flex items-center justify-center p-0">
				{ isVideo(mediaContent) == true ?
					(
						<video className="h-full" src={mediaContent} autoPlay controls></video>
					)
					:
					(
						mediaContent && <Image src={mediaContent} width={300} height={300} alt='No Image'/>
					) 
				}
			</Modal.Body>
			<Modal.Footer>
				<Button color="gray" onClick={handleModalClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default GalleryModal;