export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
  
    // 예제 데이터 (1~10까지의 샘플 데이터)
    const completedPosts = [
      {
        post_id: 1,
        title: "AI 기반 추천 시스템",
        subtitle: "머신러닝을 활용한 개인화 추천",
        writer: "홍길동",
        result_link: "https://github.com/username/ai-recommendation",
        image_url: "/images/image1.jpg",
        create_date: "2025-02-01",
        due_date: "2025-03-01",
        project_type: "사이드프로젝트",
        relate_field: ["AI", "데이터 분석"],
        member: "5명",
        contents: "이 프로젝트는 머신러닝을 사용하여 사용자별 추천 시스템을 개발하는 것을 목표로 합니다.",
      },
      {
        post_id: 2,
        title: "블록체인 보안 연구",
        subtitle: "스마트 컨트랙트 보안성 강화",
        writer: "이몽룡",
        result_link: "https://github.com/username/blockchain-security",
        image_url: "/images/image2.jpg",
        create_date: "2025-01-10",
        due_date: "2025-02-15",
        project_type: "연구 프로젝트",
        relate_field: ["블록체인", "보안"],
        member: "3명",
        contents: "블록체인 기술의 보안 취약점을 분석하고 스마트 컨트랙트의 안전성을 향상시키는 연구입니다.",
      },
      // 3~10까지의 데이터 추가 가능
    ];
  
    // 요청된 ID에 맞는 데이터 필터링
    const post = completedPosts.find((p) => p.post_id === Number(id));
  
    if (!post) {
      return new Response(JSON.stringify({ error: "게시물을 찾을 수 없습니다." }), {
        status: 404,
      });
    }
  
    return new Response(JSON.stringify(post), {
      headers: { "Content-Type": "application/json" },
    });
  }
  