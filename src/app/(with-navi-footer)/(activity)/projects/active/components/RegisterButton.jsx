const ProjectRegisterButton = ({ isLoggedIn }) => {
    return (
      <div className="flex items-center gap-4 p-4">
        {/* 로그인 상태에 따라 프로젝트 등록 버튼을 조건부로 렌더링 */}
        {isLoggedIn && (
          <button className="bg-green-500 text-white px-4 py-2 ml-4">
            프로젝트 등록
          </button>
        )}
      </div>
    );
  };
  
  export default ProjectRegisterButton;
  