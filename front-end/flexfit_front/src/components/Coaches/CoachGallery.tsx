import React from 'react';
import CoachGalleryItem from './CoachGalleryItem';

interface CoachGalleryProps {
    galleryTitle?: string;
    galleryDescription?: string;
    coachData: any;
}

const CoachGallery: React.FC<CoachGalleryProps> = ({ galleryTitle = 'Coaches', galleryDescription = 'This is the Coach Gallery', coachData }) => {
    return (
        <section className="w-full h-full dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto text-center lg:py-16 lg:px-6">
                <div className="mx-auto mb-8 lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{galleryTitle}</h2>
                    <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">{galleryDescription}</p>
                </div> 
                <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                {
                    coachData.map((coach:any, index: number) => (
                        <CoachGalleryItem key={coach.coachId} coachId={coach.coachId} coachImg={coach.coachImg} coachName={coach.coachName} coachCategory={coach.coachCategory} />
                    ))
                }
                    
                   
                </div>  
            </div>
        </section>
    );
}

export default CoachGallery;