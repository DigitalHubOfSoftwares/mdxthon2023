import React, { useState, useEffect } from 'react';
import { Roboto } from 'next/font/google';
import Layout from '../components/Layout';
import { getGalleryContent, getMenuData, getCoachData } from '../lib/functions';
import GalleryCategory from '@/components/Gallery/GalleryCategory/GalleryGategory';
import GalleryModal from '@/components/Gallery/GalleryModal/GalleryModal';
import CoachGallery from '@/components/Coaches/CoachGallery';
import HeroSection from '@/components/HeroSection/HeroSection';
import { HeroSectionType } from '@/types/CustomTypes';
import Link from 'next/link';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from "next-auth/next"

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
});

interface HomeProps {
    menuData: any;
    galleryContent: any;
    coachData: any;
}

const Home: React.FC<HomeProps> = ({menuData, galleryContent, coachData}) => {
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
        <Layout menuData={menuData}>
            <div className={`h-full grid grid-cols-1 ${roboto.className}`}>
                {/* Hero Section */}
                <div className='flex w-full h-screen justify-center'>
                    <HeroSection type={HeroSectionType.CAROUSEL}/>
                </div>
                
                {/* Introductory Paragraphy */}            
                <section className="bg-white dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                        <div className="w-full flex justify-center flex-col items-center text-gray-500 sm:text-lg dark:text-gray-400">
                            <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">Welcome to Flex Fit</h2>
                            <p className="mb-4 font-light text-center">Your ultimate destination for achieving a healthier and stronger you. With expert guidance, motivating workouts, and personalized nutrition plans, we are here to help you unlock your full fitness potential.</p>
                            <p className="mb-4 font-medium text-center">Embark on a transformative journey and embrace a lifestyle that will empower you to conquer your fitness goals.</p>
                            <Link href="/aboutus" className="inline-flex items-center font-bold text-2xl text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
                                Learn more
                                <svg className="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Personalised Videos */}
                { galleryContent && (
                        <section className='flex h-[60vh] bg-white justify-center items-center px-8'>
                            <GalleryCategory categoryName={'foryou'} categoryTitle='For you' categoryData={galleryContent} onItemClick={onItemClick}/>
                            <GalleryModal openModal={openModal} handleModalClose={handleModalClose} mediaContent={currentMedia}/>
                        </section>
                    )
                }

                {/* Recommended Coaches */}
                { coachData && (
                    <section className='flex h-[90vh] bg-gray-200 justify-center overflow-y-auto'>
                        <CoachGallery coachData={coachData} />
                    </section>
                ) }

            </div>
        </Layout>
    );
}

export async function getServerSideProps(context: any) {

	const menuData = getMenuData();
    const session: any = await getServerSession(context.req, context.res, authOptions);
    let personalGalleryContent = await getGalleryContent('personalised', session?.user?.email?.id);
    let mediaLibrary;
    let personalCoachData = await getCoachData();
    console.log(personalCoachData);

    if (!personalGalleryContent || personalGalleryContent.length === 0) {
        personalGalleryContent = null;
        mediaLibrary = null;
    }else{
        mediaLibrary = personalGalleryContent[0].mediaLibrary
    }
    if (!personalCoachData || personalCoachData.length === 0) {
        personalCoachData = null;
    }
	// You must return an object with a props key
	return {
		props: {
			menuData: menuData,
            galleryContent: mediaLibrary,
            coachData: personalCoachData
		}
	}
}

export default Home
