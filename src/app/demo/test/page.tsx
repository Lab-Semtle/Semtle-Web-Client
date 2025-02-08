export default function FontTestPage() {
  return (
    <main className="space-y-8 p-10">
      {/* Pretendard 테스트 */}
      <section className="rounded-xl bg-gray-100 p-6">
        <h2 className="mb-2 font-pretendard text-2xl font-bold">
          Pretendard 폰트 테스트
        </h2>
        <p className="font-pretendard text-lg">
          이 텍스트는 Pretendard 폰트로 렌더링됩니다. 다양한 굵기와 크기로
          렌더링해보세요.
        </p>
      </section>

      {/* Moneygraphy 테스트 */}
      <section className="rounded-xl bg-gray-200 p-6">
        <h2 className="font-moneygraphy mb-2 text-2xl font-bold">
          Moneygraphy 폰트 테스트
        </h2>
        <p className="font-moneygraphy text-lg">
          이 텍스트는 Moneygraphy 폰트로 렌더링됩니다. 텍스트 스타일을
          확인하세요.
        </p>
      </section>

      {/* YClover 테스트 */}
      <section className="rounded-xl bg-gray-300 p-6">
        <h2 className="font-yclover mb-2 text-2xl font-bold">
          YClover 폰트 테스트
        </h2>
        <p className="font-yclover text-lg">
          이 텍스트는 YClover 폰트로 렌더링됩니다. 폰트가 제대로 보이는지
          확인하세요.
        </p>
      </section>
    </main>
  );
}
