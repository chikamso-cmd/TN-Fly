import {useState} from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";

export default function Contact() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

   type ContactFormData = {
      name: string;
      subject: string;
      email: string;
      message: string;
    };

    const [formData, setFormData] = useState<ContactFormData>({
      name: "",
      subject: "",
      email: "",
      message: "",
    });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string | null>(null);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = "Subject is required";
      isValid = false;
    }
    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("Please fill in all required fields correctly.");
      return;
    }

    // Create a new FormData object to send to Web3Forms API
    const payload = new FormData();
    payload.append("access_key", "7035c719-6dfe-40bd-929a-056277e9d702");
     // Replace with your Web3Forms access key
    //  7035c719-6dfe-40bd-929a-056277e9d702, 
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("subject", formData.subject || "New Contact Form Submission");
    payload.append("message", formData.message);

    try {
      setLoading(true);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });

      const json = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
        setResult(`Name: ${formData.name} | Email: ${formData.email} | Subject: ${formData.subject} | Message: ${formData.message}`);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        setStatus(json.message || "There was an error sending your message.");
      }
    } catch (error) {
      setStatus("An error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="Contact" className="section-padding bg-gray-50">
      <div className="container-custom max-w-7xl mx-auto space-y-16 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-4 block px-2">
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
                  <p className="text-gray-500 text-sm">francistope2@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 shadow-xl rounded-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold tracking-wide uppercase text-slate-500">
                    Full Name
                  </label>
                  <input
                    required
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.name ? "border-red-500" : "border-gray-200"
                      } focus:border-blue-500 focus:outline-none transition-colors`}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold tracking-wide uppercase text-slate-500">
                    Email Address
                  </label>
                  <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.email ? "border-red-500" : "border-gray-200"
                      } focus:border-blue-500 focus:outline-none transition-colors`}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-semibold tracking-wide uppercase text-slate-500">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Enquiry about services"
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.subject ? "border-red-500" : "border-gray-200"} focus:border-blue-500 focus:outline-none transition-colors`}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
                {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold tracking-wide uppercase text-slate-500">
                  Your Message
                </label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.message ? "border-red-500" : "border-gray-200"} focus:border-blue-500 focus:outline-none transition-colors`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              </div>

              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#E8FF1A] hover:bg-[#d4eb14] text-black rounded-lg cursor-pointer text-sm font-bold uppercase tracking-wider transition-all shadow">
                {loading ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
            {/* Status Message */}
            {status && (
              <div
                className={`mt-4 text-center ${status.includes("success")
                  ? "text-green-400"
                  : "text-red-400"
                  }`}
              >
                <p>{status}</p>
                {/* {result && <p className="mt-2 text-sm text-gray-700">{result}</p>} */}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

