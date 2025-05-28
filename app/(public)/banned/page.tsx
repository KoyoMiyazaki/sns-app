export default function BannedPage() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold text-red-500">
        アクセスが制限されています！
      </h1>
      <p>あなたのアカウントは管理者によりBANされています。</p>
    </div>
  );
}
