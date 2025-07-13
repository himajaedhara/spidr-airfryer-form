import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

const AirFryerForm = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    guess: "",
    pin: "",
  });

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xffffff,
          backgroundColor: 0x000000,
          points: 12.0,
          maxDistance: 20.0,
          spacing: 18.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pin") {
      const cleaned = value.replace(/\D/g, "").slice(0, 16);
      const formatted = cleaned.match(/.{1,4}/g)?.join("-") || "";
      setForm((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("✅ Form submitted! Check the console.");
  };

  return (
    <div ref={vantaRef} className="fixed inset-0 z-0">
      {/* The background now covers full screen */}
      <div className="absolute inset-0 flex items-center justify-center p-6 z-10">
        <div className="bg-zinc-950 text-white p-10 rounded-2xl w-full max-w-2xl shadow-[0_0_30px_rgba(0,0,0,0.6)] border border-zinc-800 relative z-20">
        <h2 className="text-3xl font-bold tracking-widest uppercase text-center mb-8">
  Be the First to Hear About the Spidr Air Fryer
</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <InputField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} />
              <InputField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} />
            </div>

            <InputField label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />
            <InputField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} />
            <InputField label="Guess the Cost ($)" name="guess" type="number" value={form.guess} onChange={handleChange} />
            <InputField label="Secret Spidr PIN" name="pin" value={form.pin} onChange={handleChange} maxLength={19} placeholder="####-####-####-####" />

            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 px-6 rounded-md text-lg font-bold uppercase tracking-widest hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text", maxLength, placeholder }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium tracking-wide uppercase mb-1 text-gray-400">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder || ""}
      maxLength={maxLength}
      className="bg-zinc-900 border border-zinc-700 rounded-md px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition"
      required
    />
  </div>
);

export default AirFryerForm;