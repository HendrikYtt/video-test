import PropTypes from 'prop-types';
import {AbsoluteFill, Video} from 'remotion';
import {z} from 'zod';

export const myCompSchema = z.object({
	videoSrc: z.string()
});

export const RemotionFrame: React.FC<z.infer<typeof myCompSchema>> = ({
	videoSrc
}) => {

	return (
		<AbsoluteFill>
			<Video pauseWhenBuffering src={videoSrc} preload="metadata" />
		</AbsoluteFill>
	);
};

RemotionFrame.propTypes = {
	videoSrc: PropTypes.string.isRequired
};
