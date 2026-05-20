import { SearchX } from "lucide-react";

const EmptyState = ({ title = "No Data Found", message = "Nothing to show here yet." }) => {
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-10 text-center text-white">
      <SearchX className="mx-auto text-green-400" size={52} />
      <h3 className="mt-5 text-2xl font-black">{title}</h3>
      <p className="mt-2 text-slate-400">{message}</p>
    </div>
  );
};

export default EmptyState;