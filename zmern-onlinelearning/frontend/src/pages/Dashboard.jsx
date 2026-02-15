// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// function Dashboard() {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate()

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/api/courses")
//       .then((res) => setCourses(res.data));
//   }, []);

//   const getYouTubeThumbnail = (url) => {
//     let videoId;

//     if (url.includes("v=")) {
//       videoId = url.split("v=")[1].split("&")[0];
//     } else if (url.includes("youtu.be/")) {
//       videoId = url.split("youtu.be/")[1].split("?")[0];
//     }

//     return videoId
//       ? `https://img.youtube.com/vi/${videoId}/0.jpg`
//       : null;
//   };

//   const handleMycourses =() =>{
//     navigate('/mycourses')
//   }

//   return (
//     <div style={{ padding: "30px" }}>
//       <button onClick={handleMycourses}>
//         My courses
//       </button>
//       <h2>All Courses</h2>

//       {courses.map((course) => (
//         <div
//           key={course._id}
//           style={{
//             border: "1px solid #ccc",
//             padding: "20px",
//             marginBottom: "20px",
//             borderRadius: "10px"
//           }}
//         >
//           <h3>{course.title}</h3>
//           <p>{course.description}</p>
//           <p><strong>Price:</strong> ₹{course.price}</p>

//           {/* 🔥 Modules Section */}
//           <h4>Modules:</h4>

//           {course.modules && course.modules.length > 0 ? (
//             course.modules.map((mod, index) => (
//               <div key={index} style={{ marginBottom: "15px" }}>
//                 <p>📌 {mod.title}</p>

//                 {getYouTubeThumbnail(mod.videoUrl) && (
//                   <img
//                     src={getYouTubeThumbnail(mod.videoUrl)}
//                     alt="thumbnail"
//                     width="200"
//                     style={{ borderRadius: "8px" }}
//                   />
//                 )}
//               </div>
//             ))
//           ) : (
//             <p>No modules available</p>
//           )}

//           <br />

//           <Link to={`/course/${course._id}`}>
//             View Details
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Dashboard;







import { useEffect, useState } from "react";
import axios from "axios";
import './dashboard.css'
import { Link, useNavigate } from "react-router-dom";
import banner from '../assets/images/banner.png'

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [feedbacks, setFeedbacks] = useState({}); // store feedbacks per course
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/courses");
      setCourses(res.data);

      res.data.forEach(async (course) => {
        try {
          const fbRes = await axios.get(
            `http://localhost:8000/api/feedbacks/${course._id}`
          );
          setFeedbacks((prev) => ({ ...prev, [course._id]: fbRes.data }));
        } catch (err) {
          console.error("Error fetching feedbacks for", course.title, err);
        }
      });
    } catch (err) {
      console.error("Error fetching courses", err);
    }
  };

  const getYouTubeThumbnail = (url) => {
    let videoId;
    if (url.includes("v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }
    return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : null;
  };

  const handleMyCourses = () => {
    navigate("/mycourses");
  };

  return (
    <div>
      <div className="logo" style={{padding:"10px"}}>
        EDUTECH - <span>Online learning platform</span>
      </div>
      <div className="dashboard-container-1">
        <div className="dash-con1-col1">
          <h1>Develop Your skills in a new and unique way</h1>
          <p>Unlock your potential with our comprehensive online learning platform. Explore a wide range of courses designed to suit beginners and professionals alike. Learn at your own pace, gain practical skills, and earn certificates that boost your career prospects</p>
          <div>
            <button onClick={handleMyCourses}>My Courses</button>
          </div>
        </div>
        <div className="dash-con1-col2">
          <img src={banner}></img>
        </div>
      </div>

      <h2 className="all">All Courses</h2>

      <div className="allcourses-container">
        {courses.map((course) => (
        <div
          key={course._id}
          className="allcourses-card"
        >
          <h3 className="ctitle">{course.title}</h3>
          <p className="cdesc">{course.description}</p>
          <p>
            <strong className="ctit">Price:</strong> ₹{course.price}
          </p>

          {/* 🔹 Modules */}
          <h4 className="ctit">Modules:</h4>
          {course.modules && course.modules.length > 0 ? (
            course.modules.map((mod, index) => (
              <div key={index} style={{ marginBottom: "15px" }}>
                <p>📌 {mod.title}</p>
                {getYouTubeThumbnail(mod.videoUrl) && (
                  <img
                    src={getYouTubeThumbnail(mod.videoUrl)}
                    alt="thumbnail"
                    width="100%"
                    style={{ borderRadius: "8px" }}
                  />
                )}
              </div>
            ))
          ) : (
            <p>No modules available</p>
          )}

          <br />

          {/* 🔹 Feedback Section */}
          <h4 className="ctit">Feedbacks:</h4>
          {feedbacks[course._id] && feedbacks[course._id].length > 0 ? (
            feedbacks[course._id].map((fb) => (
              <div
                key={fb._id}
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  border:"1px dashed purple"
                }}
                className="feedback"
              >
                <p>
                  <strong>{fb.studentId.name}:</strong> ⭐ {fb.rating}/5
                </p>
                <p>{fb.review}</p>
              </div>
            ))
          ) : (
            <p>No feedbacks yet</p>
          )}

          <br />
          <Link to={`/course/${course._id}`}>↗️View Details</Link>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Dashboard;
