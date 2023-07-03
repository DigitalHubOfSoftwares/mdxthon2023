export const isVideo = (media: string) => {
	  // Extract the file extension from the URL

	  if (media == '' || media == null){
		return false;
	  }
	  const extension = media.split('.').pop()?.toLowerCase() || '';

	  // Define the video file extensions
	  const videoExtensions = ['mp4', 'webm', 'ogg'];
	
	  // Check if the file extension matches any of the video extensions
	  return videoExtensions.includes(extension);
}

export const getGalleryContent = async (category: string, userId?: number) => {
	let galleryList:any = [];
	let fetchUrl: string = '';
	
	if (category == "personalised"){
		if (userId){
			fetchUrl = getBackEndApiUrl() + `api/media/personalized/${userId}`;
		}
	}else {
		fetchUrl = getBackEndApiUrl() + 'api/media/categorized';
	}

	if (fetchUrl == ''){
		return galleryList;
	}

	try {
		const response = await fetch(fetchUrl);
	
		if (!response.ok) {
		  	throw new Error('Network response was not ok');
		}
		let galleryData = await response.json();
		// process data or return it
		if (userId){
			galleryData = [
				{
					id: 0,
					name: 'for_you',
					title: 'For you',
					color: '#000000',
					libraryMedias: galleryData
				}
			];
		}

		galleryData.forEach((category: any, index: number) => {

			let library: any = [];			
			(category.libraryMedias).forEach((media: any, index:number) => {
				library.push({
					id: media.id,
					srcThumbnail: getBackEndApiUrl() + media.thumbnailPath,
					src: getBackEndApiUrl() + media.mediaPath,
					title: media.title,
					description: media.description,
					uploadBy: media.uploadedBy,
					fitnessStyle: media.fitnessStyle,
					level: media.level
				});
			});

			galleryList.push({
				categoryId: category.id,
				categoryName: category.name,
				categoryTitle: category.title,
				mediaLibrary: library,
				categoryColor: category.color
			});
		});
		
	} catch (error) {
		console.error('There has been a problem with your fetch operation:', error);
	}

	return galleryList;
}

//Function to get Menu Data
export const getMenuData = () => {
	//Dynamic Menu Array
	const menuData = [
		{
			title: "Workouts",
			route: '/gallery',
			subItems: [
				{
					title: "Yoga",
					route: '/gallery#yoga',
					subItems: []
				},
				{
					title: "Pilates",
					route: '/gallery#pilates',
					subItems: []
				},
				{
					title:"No Equipment/Bodyweight",
					route:'/gallery#',
					subItems:[]
				},
				{
					title:"Weightlifting",
					route:'/gallery#weightlifting',
					subItems:[]
				},
				{
					title:"Cardio",
					route:'/gallery#cardio',
					subItems:[]
				},
				{
					title:"Zumba",
					route:'/gallery#zumba',
					subItems:[]
				},
				{
					title:"Calisthenics",
					route:'/gallery#calisthenics',
					subItems:[]
				}
			]
		},
		
		
		{
			title:"MyTracker",
			route: '/my-tracker',
			subItems:[]
		},
		{
			title:"Fit Bot",
			route: '/chat-bot',
			subItems:[]
		},
		{
			title: "Shop",
			route: '/shop',
			subItems: []
		},
		{
			title:"About Us",
			route:'/aboutus',
			subItems:[]
		}
	];
	return menuData;
}

export const getCoachData = async(type?: string) => {
	let coachList: any = [];
	let fetchUrl: string = '';

	fetchUrl = getBackEndApiUrl() + 'api/coach/all/';

	try {
		const response = await fetch(fetchUrl);
		if (!response.ok) {
		  	throw new Error('Network response was not ok');
		}
		// process data or return it
		let coachData = await response.json();
		coachData.forEach((coach: any, index: number) => {
			coachList.push({
				coachId: coach.id,
				coachImg: '',
				coachName: coach.fullName,
				coachCategory: coach.fitnessStyles
			});
		});
		
	} catch (error) {
		console.error('There has been a problem with your fetch operation:', error);
	}

	return coachList;

}

export const getBackEndApiUrl = () => {
	return process.env.NEXT_PUBLIC_BACKEND_URL + '/';
}