import React, { useEffect, useRef, useState } from 'react';
import Dropzone from "dropzone";
import { getBackEndApiUrl } from '@/lib/functions';
import 'dropzone/dist/dropzone.css'; // Import dropzone styles

const UploadZone: React.FC = () => {
    const dropzoneElementRef = useRef<HTMLDivElement>(null);
	const dropZoneInstance = useRef<Dropzone | null>(null);
	const [ showUploadHelper, setShowUploadHelper ] = useState(true);
    
    useEffect(() => {
        // Initialize dropzone

			dropZoneInstance.current = new Dropzone(dropzoneElementRef.current as HTMLDivElement, {
				url: `${getBackEndApiUrl()}api/media/upload`,
				autoProcessQueue: false,
				acceptedFiles: 'image/*,video/*',
				paramName: 'file',
				parallelUploads: 2,
        });

        // Optional: Log files to console as they are added
        dropZoneInstance.current.on("addedfile", (file: any) => {
			setShowUploadHelper(false);
            console.log("File added: ", file);
        });
        
        // Optional: Handle additional dropzone events like success, error, etc.
        dropZoneInstance.current.on("success", function (file: any, response: any) {
            console.log("File uploaded successfully: ", response);
        });
        
        dropZoneInstance.current.on("error", function (file: any, errorMessage: any) {
            console.error("Error uploading file: ", errorMessage);
        });        
        
        return () => {
            // Cleanup
            dropZoneInstance.current?.destroy();
        };
    }, []);

    const handleSubmit = () => {
        // Manually process the queue of files
        console.log(dropZoneInstance.current?.getQueuedFiles());
        dropZoneInstance.current?.processQueue();
    };
    
    return (
        <>            
            <div className="dropzone flex items-center justify-center w-full">
				<label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
					<div ref={dropzoneElementRef} className={`flex ${showUploadHelper ? 'flex-col' : ''} items-center justify-center pt-5 pb-6 w-full h-full`}>
						{ showUploadHelper && ( 
							<> 
								<svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
								</svg>
								<p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG</p>
							</>
						)}
					</div>
				</label>
            </div>
			
			<div className='flex w-full justify-center items-center'>
				<button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Handle Submit
				</button>
			</div>

        </>
    );
};

export default UploadZone;