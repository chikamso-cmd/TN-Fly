import {useState} from "react";
import { MapPin, Phone, Mail, Send, Loader } from "lucide-react";

export default function Contact() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const HandleformSubmit = async (e:any) => {
    e.preventDefault();
     setLoading(true);
    const formData = new FormData(e.target);
    formData.append("access_key", "2a4cf41b-ff9b-4425-a5b3-986c77041254");
    // , 7035c719-6dfe-40bd-929a-056277e9d702

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
         await response.json();

        setResult("Form Submitted Successfully");
        e.target.reset();
      
    } catch (err:any) {
      console.log("Error", err.message);
      setResult(err.message);
    } finally {
      setLoading(false)
    }
  };

  return (
    <section id="Contact" className="section-padding bg-gray-50">
      <div className="container-custom max-w-7xl mx-auto space-y-16 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-4 block">
              Contact Us
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-secondary mb-8 leading-tight uppercase px-5">
              Get In Touch <br /> With Our Experts
            </h2>
            <p className="text-gray-500 mb-12 px-5">
              Have a question about our services or need a custom quote for
              your events? Fill out the form and our team will get back to you
              within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="bg-primary p-4 rounded-sm shrink-0">
                  <MapPin className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-black uppercase mb-1">Our Location</h5>
                  <p className="text-gray-500 text-sm">
                    Oyo, Ibadan Nigeria.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-primary p-4 rounded-sm shrink-0">
                  <Phone className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-black uppercase mb-1">Call Us</h5>
                  <p className="text-gray-500 text-sm">
                    (234)8016980014
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-primary p-4 rounded-sm shrink-0">
                  <Mail className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-black uppercase mb-1">Email Us</h5>
                  <p className="text-gray-500 text-sm">tnfly@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 shadow-xl rounded-sm">
            <form className="space-y-6" onSubmit={HandleformSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border-none p-4 focus:ring-2 focus:ring-primary outline-none"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-50 border-none p-4 focus:ring-2 focus:ring-primary outline-none"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border-none p-4 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Service Inquiry"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full bg-gray-50 border-none p-4 focus:ring-2 focus:ring-primary outline-none resize-none"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>
              <button
              disabled={loading}
                className=" flex items-center justify-center gap-2 btn-primary w-full py-4 uppercase tracking-widest cursor-pointer">
                {loading ? (<Loader size={18} className="animate-spin" />) : (<Send size={18} />)}
                
                {loading ? "Sending message" : " Send Message"}
              </button>
              {/* <span className="block text-center text-sm text-gray-400 mt-4">
                {result}
              </span> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

