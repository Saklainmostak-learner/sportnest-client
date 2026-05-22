import { ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppStateContext } from "../provider/AppStateProvider";
import EmptyState from "../components/EmptyState";

const Cart = () => {
  const { cart, removeFromCart } = useContext(AppStateContext);

  const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);

  return (
    <section className="min-h-screen bg-[#020806] px-4 pb-24 pt-36 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 inline-flex rounded-full bg-green-500/10 px-4 py-2 text-xs font-black uppercase text-green-400">
          Booking Cart
        </p>

        <h1 className="text-4xl font-black uppercase md:text-6xl">My Cart</h1>

        <div className="mt-10">
          {cart.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              <div className="space-y-5">
                {cart.map((item) => (
                  <div
                    key={item._id || item.id}
                    className="grid gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:grid-cols-[160px_1fr_auto]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-36 w-full rounded-2xl object-cover"
                    />

                    <div>
                      <h3 className="text-2xl font-black">{item.name}</h3>
                      <p className="mt-2 text-slate-400">{item.location}</p>
                      <p className="mt-3 font-black text-green-400">
                        ৳{item.price}/hr
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id || item.id)}
                      className="h-fit rounded-2xl bg-red-500 px-4 py-3 text-white"
                    >
                      <Trash2 />
                    </button>
                  </div>
                ))}
              </div>

              <div className="h-fit rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <ShoppingCart className="text-green-400" size={42} />
                <h2 className="mt-4 text-2xl font-black">Cart Summary</h2>
                <p className="mt-4 text-slate-400">
                  Total selected venues: {cart.length}
                </p>

                <h3 className="mt-6 text-4xl font-black text-green-400">
                  ৳{total}/hr
                </h3>

                <Link
                  to={`/facility/${cart[0]._id || cart[0].id}`}
                  className="mt-6 block rounded-2xl bg-green-500 py-4 text-center font-black text-white"
                >
                  Continue Booking
                </Link>
              </div>
            </div>
          ) : (
            <EmptyState
              title="Cart Is Empty"
              message="Add facilities to cart from facility cards."
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;