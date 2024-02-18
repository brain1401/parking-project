export default function DeviceAlert() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <section className="max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-gray-800 mb-4">안내</h1>
        <p className="text-sm text-gray-600">
          본 웹사이트는 모바일 버전만 지원합니다. 모바일 기기에서의 사용을
          권장드립니다. 데스크톱이나 태블릿에서 접속하신 경우, 모바일 기기로
          변경하여 접속해 주세요.
        </p>
      </section>
    </div>
  );
}
