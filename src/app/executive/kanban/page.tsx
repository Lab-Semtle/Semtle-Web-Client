import KanbanBoard from '@/components/admin/kanban/kanban-board';

const KanbanPage = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start">
      <h1 className="mb-4 text-4xl font-bold text-red-400">준비중 입니다..!</h1>

      {/* KanbanBoard를 감싸는 컨테이너 */}
      <div className="relative w-full max-w-4xl">
        {/* KanbanBoard를 흐리게 표시 */}
        <div className="pointer-events-none opacity-50">
          <KanbanBoard />
        </div>

        {/* 클릭 방지 오버레이 */}
        <div className="pointer-events-auto absolute inset-0 bg-gray-500 bg-opacity-50"></div>
      </div>
    </div>
  );
};

export default KanbanPage;
