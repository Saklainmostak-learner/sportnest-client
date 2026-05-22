const Loading = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#020806]">
      <div className="space-y-5">
        <div className="h-6 w-52 animate-pulse rounded-full bg-white/10" />
        <div className="h-32 w-[320px] animate-pulse rounded-[32px] bg-white/5" />
        <div className="h-6 w-72 animate-pulse rounded-full bg-white/10" />
      </div>
    </section>
  );
};

export default Loading;