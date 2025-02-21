"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Footer from "../../components/Footer";

const ContactPage = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("sending");
    setTimeout(() => {
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: "url('/contact-bg.jpg')" }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center py-20 bg-black/50 w-full backdrop-blur-sm"
      >
        <h1 className="text-6xl font-extrabold text-yellow-400 drop-shadow-lg">Get in Touch</h1>
        <p className="text-xl mt-4 max-w-3xl mx-auto text-gray-300">We would love to hear from you. Contact us today and let's talk!</p>
      </motion.div>

      <div className="max-w-6xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 bg-black/60 p-8 rounded-xl backdrop-blur-lg shadow-xl border border-yellow-400"
        >
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">Contact Information</h3>
          {[{ icon: FaPhone, text: "+1 (555) 123-4567", label: "Phone" },
            { icon: FaEnvelope, text: "support@foodorder.com", label: "Email" },
            { icon: FaMapMarkerAlt, text: "123 Food Street, Cuisine City", label: "Address" },
            { icon: FaClock, text: "Mon-Sun: 8:00 AM - 11:00 PM", label: "Hours" }].map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <item.icon className="text-yellow-400 text-xl" />
              <div>
                <p className="text-gray-400 text-sm">{item.label}</p>
                <p className="text-white text-lg font-medium">{item.text}</p>
              </div>
            </div>
          ))}
          <div className="flex gap-4 mt-6">
            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
              <Icon key={index} className="text-yellow-400 text-2xl hover:text-yellow-500 transition duration-300 cursor-pointer" />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-black/60 p-8 rounded-xl backdrop-blur-lg shadow-xl border border-yellow-400"
        >
          <h3 className="text-2xl font-bold text-yellow-400 mb-6">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full bg-transparent border-b border-yellow-400 px-4 py-3 text-white focus:outline-none focus:border-yellow-500" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="w-full bg-transparent border-b border-yellow-400 px-4 py-3 text-white focus:outline-none focus:border-yellow-500" />
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required className="w-full bg-transparent border-b border-yellow-400 px-4 py-3 text-white focus:outline-none focus:border-yellow-500" />
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" required rows="4" className="w-full bg-transparent border-b border-yellow-400 px-4 py-3 text-white focus:outline-none focus:border-yellow-500"></textarea>
            <button type="submit" disabled={submitStatus === "sending"} className={`w-full py-3 text-lg font-bold text-[#09122c] bg-yellow-400 rounded-lg hover:bg-yellow-500 transition duration-300 ${submitStatus === "sending" ? "opacity-50 cursor-not-allowed" : ""}`}>
              {submitStatus === "sending" ? "Sending..." : "Send Message"}
            </button>
            {submitStatus === "success" && <p className="text-green-400 text-center mt-2">Message sent successfully!</p>}
          </form>
        </motion.div>
      </div>
       {/* Enhanced Map Section */}
       <div className="max-w-7xl mx-auto px-6 py-20">
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="bg-black/60 backdrop-blur-lg rounded-xl p-8 border border-yellow-400 shadow-2xl"
         >
           <div className="text-center mb-12">
             <h3 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">Visit Our Location</h3>
             <p className="text-gray-300 text-lg max-w-2xl mx-auto">
               Come experience our exceptional service in person. We're conveniently located in the heart of New York City.
             </p>
           </div>

           <div className="grid md:grid-cols-2 gap-8 items-center">
             <div className="space-y-6">
               <div className="bg-white/10 p-6 rounded-lg">
                 <h4 className="text-xl font-semibold text-yellow-400 mb-3">Main Restaurant</h4>
                 <p className="text-gray-300">123 Food Street</p>
                 <p className="text-gray-300">New York, NY 10001</p>
               </div>

               <div className="bg-white/10 p-6 rounded-lg">
                 <h4 className="text-xl font-semibold text-yellow-400 mb-3">Getting Here</h4>
                 <ul className="text-gray-300 space-y-2">
                   <li>• 2 blocks from Central Station</li>
                   <li>• Bus stops: M1, M2, M3</li>
                   <li>• Parking available on premises</li>
                 </ul>
               </div>

               <div className="bg-white/10 p-6 rounded-lg">
                 <h4 className="text-xl font-semibold text-yellow-400 mb-3">Opening Hours</h4>
                 <ul className="text-gray-300 space-y-2">
                   <li>Monday - Friday: 11:00 AM - 10:00 PM</li>
                   <li>Saturday - Sunday: 10:00 AM - 11:00 PM</li>
                 </ul>
               </div>
             </div>

             <div className="h-[500px] rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-400/30">
               <iframe
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304603!3d40.697663747508836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564658846!5m2!1sen!2s"
                 width="100%"
                 height="100%"
                 style={{ border: 0 }}
                 allowFullScreen=""
                 loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"
                 className="filter contrast-125 brightness-90"
               ></iframe>
             </div>
           </div>
         </motion.div>
       </div>
            
    </div>
    
  );
  

};


export default ContactPage;
