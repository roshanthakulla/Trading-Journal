export default function LoadingUpdate() {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="flex items-center gap-2 text-blue-600">
        <span className="animate-spin border-2 border-blue-600 border-t-transparent rounded-full h-6 w-6"></span>
        Loading...
      </div>
    </div>
  );
}
