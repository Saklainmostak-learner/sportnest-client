const Loading = () => {
  return (
    <div className="grid min-h-screen place-items-center bg-[#020806] text-white">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-green-400" />
        <p className="mt-5 font-bold text-slate-400">Loading SportNest...</p>
      </div>
    </div>
  );
};

export default Loading;