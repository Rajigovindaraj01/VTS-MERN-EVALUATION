// import { useEffect, useState, useContext } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";

// function CourseDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { token, user } = useContext(AuthContext);

//   const [course, setCourse] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8000/api/courses/${id}`)
//       .then((res) => setCourse(res.data));
//   }, [id]);

//   // 🔥 Extract YouTube Video ID
//   const getYouTubeId = (url) => {
//     let videoId;

//     if (url.includes("v=")) {
//       videoId = url.split("v=")[1].split("&")[0];
//     } else if (url.includes("youtu.be/")) {
//       videoId = url.split("youtu.be/")[1].split("?")[0];
//     }

//     return videoId;
//   };

//   // 🔥 Razorpay Script Loader
//   const loadScript = (src) => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handlePayment = async () => {
//     const res = await loadScript(
//       "https://checkout.razorpay.com/v1/checkout.js"
//     );

//     if (!res) {
//       alert("Razorpay SDK failed to load");
//       return;
//     }

//     const order = await axios.post(
//       "http://localhost:8000/api/payments/order",
//       {
//         amount: course.price,
//         courseId: course._id,
//       },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     const options = {
//       key: "rzp_test_SG4PoKux4405ua",
//       amount: order.data.amount,
//       currency: "INR",
//       name: "Online Learning",
//       description: course.title,
//       order_id: order.data.id,

//       handler: async function (response) {
//         await axios.post(
//           "http://localhost:8000/api/payments/verify",
//           {
//             order_id: response.razorpay_order_id,
//             payment_id: response.razorpay_payment_id,
//             signature: response.razorpay_signature,
//             studentId: user.id,
//             courseId: course._id,
//           },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         alert("Payment Successful & Enrolled!");
//         navigate('/mycourses')
//       },

//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   if (!course) return <h2>Loading...</h2>;

//   return (
//     <div style={{ padding: "30px" }}>
//       <h2>{course.title}</h2>
//       <p>{course.description}</p>
//       <h3>Price: ₹{course.price}</h3>

//       {/* 🔥 Modules Section */}
//       <h3>Course Modules</h3>

//       {course.modules && course.modules.length > 0 ? (
//         course.modules.map((mod, index) => (
//           <div
//             key={index}
//             style={{
//               border: "1px solid #ccc",
//               padding: "15px",
//               marginBottom: "20px",
//               borderRadius: "10px"
//             }}
//           >
//             <h4>{mod.title}</h4>

//             {getYouTubeId(mod.videoUrl) && (
//               <iframe
//                 width="400"
//                 height="250"
//                 src={`https://www.youtube.com/embed/${getYouTubeId(mod.videoUrl)}`}
//                 title="YouTube video"
//                 frameBorder="0"
//                 allowFullScreen
//               ></iframe>
//             )}
            
//           </div>
//         ))
//       ) : (
//         <p>No modules available</p>
//       )}

//       <br />

//       {course.price > 0 ? (
//         <button onClick={handlePayment}>Buy Now</button>
//       ) : (
//         <button>Free Enroll</button>
//       )}
//     </div>
//   );
// }

// export default CourseDetails;





import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './viewdetails.css'
import { AuthContext } from "../context/AuthContext";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);

  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/courses/${id}`)
      .then((res) => setCourse(res.data));
  }, [id]);

  const getYouTubeId = (url) => {
    if (!url) return null;
    if (url.includes("v=")) return url.split("v=")[1].split("&")[0];
    if (url.includes("youtu.be/")) return url.split("youtu.be/")[1].split("?")[0];
    return null;
  };

  const getYouTubeThumbnail = (url) => {
    const videoId = getYouTubeId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : null;
  };

  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) return alert("Razorpay SDK failed to load");

    const order = await axios.post(
      "http://localhost:8000/api/payments/order",
      { amount: course.price, courseId: course._id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const options = {
      key: "rzp_live_SGMMIa7sWqUw2T",
      amount: order.data.amount,
      currency: "INR",
      name: "Online Learning",
      description: course.title,
      order_id: order.data.id,
      handler: async function (response) {
        await axios.post(
          "http://localhost:8000/api/payments/verify",
          {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            studentId: user.id,
            courseId: course._id,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Payment Successful & Enrolled!");
        navigate("/mycourses");
      },
      theme: { color: "#3399cc" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (!course) return <h2>Loading...</h2>;

  return (
    <div>
      <div className="logo" style={{padding:"10px"}}>
        EDUTECH - <span>Online learning platform</span>
      </div>
      <div className="viewdetails-container">
      <h2 className="ctit">{course.title}</h2>
      <p className="cdesc">{course.description}</p>
      <h3>Price: ₹{course.price}</h3>

      <h3>Course Modules</h3>

      {course.modules && course.modules.length > 0 ? (
        course.modules.map((mod, index) => (
          <div
            key={index}
            style={{
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
            className="list-course"
          >
            <h4>{mod.title}</h4>
            {getYouTubeThumbnail(mod.videoUrl) && (
              <div className="thumbnail-image">
                <img
                src={getYouTubeThumbnail(mod.videoUrl)}
                alt="thumbnail"
                width="200"
                style={{ marginBottom: "10px" }}
              />
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No modules available</p>
      )}

      <br />

      {course.price > 0 ? (
        <button onClick={handlePayment}>Buy Now</button>
      ) : (
        <button>Free Enroll</button>
      )}
    </div>
    </div>
  );
}

export default CourseDetails;
