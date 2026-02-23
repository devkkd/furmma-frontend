"use client"
import { useRouter } from 'next/navigation';

const LessonSidebar = ({ lessons, activeLessonId, plan, progress = 0 }) => {
  const router = useRouter();

  return (
    <div className="bg-white border rounded-2xl p-4">
      <h3 className="font-extrabold mb-4">Lessons</h3>

      {/* PROGRESS BAR - uses API progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span>Learning Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-green-400 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      </div>

      {/* LESSON LIST */}
      <div className="space-y-3">
        {lessons.map((lesson) => {
          const lessonId = lesson.id ?? lesson._id;
          const isActive = String(activeLessonId) === String(lessonId);
          const isCompleted = !!lesson.completed;
          return (
            <div
              key={lessonId}
              onClick={() => router.push(`/training/${plan}/${lessonId}`)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border
                ${isActive ? 'border-green-400 bg-green-50' : 'hover:bg-gray-50'}
                ${isCompleted ? 'border-green-300 bg-green-50/70' : ''}`}
            >
              <img
                src={lesson.image}
                className="w-10 h-10 rounded-full object-cover"
                alt=""
              />
              <div className="flex-1 text-xs min-w-0">
                <p className="font-bold flex items-center gap-2">
                  {isCompleted && <span className="text-green-600" title="Completed">✓</span>}
                  {lesson.title}
                </p>
                <p className="text-gray-400">
                  {lesson.lessonNum} | {lesson.time}
                </p>
              </div>
              <div className="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs shrink-0">
                ▶
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LessonSidebar;
