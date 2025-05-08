import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Reel from '../components/Reel';
import { Skeleton } from '../components/Player';

const ReelPage = () => {
	const { id } = useParams();
	const [reel, setReel] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchReel = async () => {
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_SERVER_URL}/api/memes/${id}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				);
				setReel(res.data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchReel();
	}, [id]);

	if (!reel && !loading) {
		return (
			<div className='h-screen w-screen flex justify-center items-center'>
				<div className=' flex flex-col justify-center items-center w-[300px] space-y-4'>
					<div className='absolute inset-0 z-0 brightness-[0.3] overflow-hidden'>
						<img
							src='/ab4.png'
							draggable='false'
							className='w-full h-full object-cover blur-[1px]'
						/>
					</div>
					<h1 className='text-lg z-10 text-white bg-[#FE005B] p-10 rounded-lg'>
						Meme not found 🥺
					</h1>
				</div>
			</div>
		);
	}

	if (loading) {
		return (
			<div className='relative hide-scrollbar flex flex-col items-center h-screen w-screen justify-center overflow-y-scroll scroll-smooth gap-4'>
				<div className='absolute inset-0 z-0 brightness-[0.3] overflow-hidden'>
					<img
						src='/ab4.png'
						draggable='false'
						className='w-full h-full object-cover blur-[1px]'
					/>
				</div>
				{Array.from({ length: 1 }).map((_, index) => (
					<div
						key={index}
						className='w-[30%] max-md:w-[95%] h-[50vh] max-md:h-[80vh] md:h-full flex-shrink-0 mx-auto border-8 border-transparent'
					>
						<Skeleton height='full' width='full' radius='lg' />
					</div>
				))}
			</div>
		);
	}

	return (
		<div className='h-screen w-screen flex justify-center items-center backdrop:brightness-50 bg-black bg-center'>
			<Reel
				media={reel.media.link}
				type={reel.media.mediaType}
				title={reel.title}
				description={reel.description}
				likes={reel.likers.length}
				views={reel.views}
				shares={reel.shares}
				likedOrNot={reel.likers.includes(localStorage.getItem('userId'))}
				id={reel._id}
				activeReel={0}
				setActiveReel={() => {}}
				creator_wallet={reel.creator.wallet}
				reelData={reel}
			/>
		</div>
	);
};

export default ReelPage;
