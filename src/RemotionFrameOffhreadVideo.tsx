import PropTypes from 'prop-types';
import {AbsoluteFill, OffthreadVideo, Video} from 'remotion';
import {z} from 'zod';

export const myCompSchema = z.object({
	videoSrc: z.string()
});

export const RemotionFrameOffthreadVideo: React.FC<z.infer<typeof myCompSchema>> = ({
	videoSrc
}) => {

	return (
		<AbsoluteFill>
			<OffthreadVideo
				// pauseWhenBuffering
				   src={videoSrc}/>
		</AbsoluteFill>
	);
};

RemotionFrameOffthreadVideo.propTypes = {
	videoSrc: PropTypes.string.isRequired
};
