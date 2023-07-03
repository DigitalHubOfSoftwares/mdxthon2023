import CoachGallery from '@/components/Coaches/CoachGallery';
import { getCoachData } from '@/lib/functions'
import Layout from '@/components/Layout';
import { getMenuData } from '@/lib/functions';

const MyCoach = (props: any) => {
    const coachData = props.coachData;
    console.log
    return (
        <Layout menuData={props.menuData}>
            {coachData && <CoachGallery coachData={coachData}/> }
        </Layout>
    )
}

export default MyCoach;

export async function getServerSideProps () {
    let personalCoachData = await getCoachData();
    if (!personalCoachData || personalCoachData.length === 0) {
        personalCoachData = null;
    }

    console.log(personalCoachData);
	const menuData = getMenuData();
    console.log(menuData);
    return {
        props : {coachData: personalCoachData, menuData: menuData}
    }
}