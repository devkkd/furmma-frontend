import { useRef } from 'react';

const VideoPlayer = ({ lesson, onMarkComplete }) => {
  const hasAutoMarked = useRef(false);

  const handlePlay = () => {
    if (onMarkComplete && !hasAutoMarked.current) {
      hasAutoMarked.current = true;
      onMarkComplete();
    }
  };

  return (
    <div>
      {/* VIDEO */}
      <div className="relative overflow-hidden rounded-2xl bg-black">
        <video
          src={lesson.videoUrl}
          controls
          autoPlay
          className="w-full h-auto"
          onPlay={handlePlay}
        />
      </div>

      {/* TITLE */}
      <h2 className="text-2xl font-extrabold mt-6">
        {lesson.title}
      </h2>

      {/* META */}
      <p className="text-sm text-gray-500 mt-1">
        {lesson.lessonNum} | {lesson.time}
      </p>

      {/* DESCRIPTION */}
      <div className="mt-6 text-sm leading-6 text-gray-600">
        {lesson.description || (
          <>
            Lorem ipsum dolor sit amet consectetur. At nisl et eu elementum
            maecenas turpis odio. Sem eu diam ornare nunc.
            <br /><br />
            Vitae pulvinar purus velit id laoreet fermentum lectus elit
            volutpat. Sem turpis sapien porta viverra integer at.
            <br /><br />
            Nunc sed tristique placerat hendrerit at viverra eget augue nec.
          </>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
