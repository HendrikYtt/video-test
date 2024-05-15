import React, {CSSProperties, useEffect, useMemo, useRef, useState} from 'react';
import './App.css';
import VideoSrc from './assets/video.mp4';
import { Player, PlayerRef } from '@remotion/player';
import { RemotionFrame } from "./RemotionFrame";
import {RemotionFrameOffthreadVideo} from "./RemotionFrameOffhreadVideo";

function App() {
    const objectUrl = 'https://textualyze-images.s3.eu-north-1.amazonaws.com/b4324ce3-c415-4ab6-bd93-5a8391361bd2.mov';
    const playerRef = useRef<PlayerRef>(null);
    const [blobUrl, setBlobUrl] = useState('');

    useEffect(() => {
        const fetchVideoAsBlobUrl = async () => {
            const response = await fetch(VideoSrc);
            const videoBlob = await response.blob();
            const blobUrl = URL.createObjectURL(videoBlob);
            setBlobUrl(blobUrl);
        };

        fetchVideoAsBlobUrl();

        return () => {
            if (blobUrl) {
                URL.revokeObjectURL(blobUrl);
            }
        };
    }, []);

    const videoStyle: CSSProperties = {
        height: '300px',
        maxWidth: '100%', // Ensures that video does not exceed the width of its container
        objectFit: 'cover', // Adjusts the video size to cover the area without losing its aspect ratio
    };

    // const inputProps = useMemo(() => ({
    //     videoSrc: blobUrl
    // }), [blobUrl]);

    return (
        <div className="App">
            <header className="App-header">
                <p>1. Native video tag with static file</p>
                <video src={VideoSrc} controls style={videoStyle} playsInline></video>
                <p>2. Remotion player with static file</p>
                <Player
                    ref={playerRef}
                    component={RemotionFrame}
                    durationInFrames={97*60}
                    compositionWidth={1920}
                    compositionHeight={1080}
                    fps={60}
                    controls
                    inputProps={{
                        videoSrc: VideoSrc
                    }}
                    style={{
                        ...videoStyle
                    }}
                />

                <p>3. Native video tag with blob URL</p>
                <video src={blobUrl} controls style={videoStyle} playsInline></video>
                <p>4. Remotion player with blob URL</p>
                {blobUrl !== '' && (
                    <Player
                        ref={playerRef}
                        component={RemotionFrame}
                        durationInFrames={97 * 60}
                        compositionWidth={1920}
                        compositionHeight={1080}
                        fps={60}
                        controls
                        inputProps={{
                            videoSrc: blobUrl
                        }}
                        style={{
                            ...videoStyle
                        }}
                    />
                )}
                <p>5. Native video tag with S3 URL</p>
                <video src={objectUrl} controls style={videoStyle} playsInline></video>
                <p>6. Remotion player with S3 URL</p>
                    <Player
                        ref={playerRef}
                        component={RemotionFrame}
                        durationInFrames={97 * 60}
                        compositionWidth={1080}
                        compositionHeight={1920}
                        fps={60}
                        controls
                        inputProps={{
                            videoSrc: objectUrl
                        }}
                        style={{
                            ...videoStyle
                        }}
                    />
                <p>7. Remotion OffthreadVideo player with S3 URL</p>
                <Player
                    ref={playerRef}
                    component={RemotionFrameOffthreadVideo}
                    durationInFrames={97 * 60}
                    compositionWidth={1080}
                    compositionHeight={1920}
                    fps={60}
                    controls
                    inputProps={{
                        videoSrc: objectUrl
                    }}
                    style={{
                        ...videoStyle
                    }}
                />
            </header>
        </div>
    );
}

export default App;
