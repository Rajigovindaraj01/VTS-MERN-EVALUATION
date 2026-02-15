// import { useEffect, useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// function MyCourses() {
//   const { token } = useContext(AuthContext);
//   const [enrollments, setEnrollments] = useState([]);

//   // 🔹 Fetch enrollments on mount
//   useEffect(() => {
//     fetchMyCourses();
//   }, []);

//   const fetchMyCourses = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/api/enrollments/my", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();

//       // Load progress from localStorage (frontend-only)
//       const updated = data.map((enroll) => {
//         const saved = localStorage.getItem(`progress_${enroll._id}`);
//         if (saved) {
//           return {
//             ...enroll,
//             progress: Number(saved),
//             completed: Number(saved) === 100,
//           };
//         }
//         return enroll;
//       });

//       setEnrollments(updated);
//     } catch (err) {
//       console.error("Error fetching enrollments:", err);
//     }
//   };

//   const markAsCompleted = (enrollmentId) => {
//     const updated = enrollments.map((enroll) => {
//       if (enroll._id === enrollmentId) {
//         localStorage.setItem(`progress_${enrollmentId}`, 100);
//         return { ...enroll, progress: 100, completed: true };
//       }
//       return enroll;
//     });

//     setEnrollments(updated);
//   };

//   // 🔹 Extract YouTube ID for iframe
//   const getYouTubeId = (url) => {
//     if (!url) return null;
//     if (url.includes("v=")) return url.split("v=")[1].split("&")[0];
//     if (url.includes("youtu.be/")) return url.split("youtu.be/")[1].split("?")[0];
//     return null;
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>My Courses</h2>

//       {enrollments.length === 0 && <p>No enrolled courses yet</p>}

//       {enrollments.map((enroll) => (
//         <div
//           key={enroll._id}
//           style={{
//             border: "1px solid #ccc",
//             padding: "20px",
//             marginBottom: "20px",
//             borderRadius: "10px",
//           }}
//         >
//           <h3>{enroll.courseId.title}</h3>
//           <p>{enroll.courseId.description}</p>

//           {/* 🔹 Modules with iframe */}
//           {enroll.courseId.modules && enroll.courseId.modules.length > 0 ? (
//             enroll.courseId.modules.map((mod, i) => (
//               <div key={i} style={{ marginBottom: "15px" }}>
//                 <h4>{mod.title}</h4>
//                 {mod.videoUrl ? (
//                   <iframe
//                     width="400"
//                     height="250"
//                     src={`https://www.youtube.com/embed/${getYouTubeId(mod.videoUrl)}`}
//                     title={mod.title}
//                     frameBorder="0"
//                     allowFullScreen
//                   ></iframe>
//                 ) : (
//                   <p>No video available</p>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p>No modules available</p>
//           )}

//           {/* Progress */}
//           <p>Progress: <b>{enroll.progress}%</b></p>
//           <div style={{ width: "100%", background: "#eee", marginBottom: "10px" }}>
//             <div
//               style={{
//                 width: `${enroll.progress}%`,
//                 background: "green",
//                 height: "10px",
//               }}
//             ></div>
//           </div>

//           {/* Mark as completed */}
//           <label>
//             <input
//               type="checkbox"
//               checked={enroll.completed}
//               onChange={() => markAsCompleted(enroll._id)}
//             />{" "}
//             Mark as Completed
//           </label>

//           <br /><br />

//           {/* Continue Learning or Feedback */}
//           {enroll.completed ? (
//             <Link
//               to={`/feedback/${enroll.courseId._id}`}
//               style={{
//                 color: "white",
//                 background: "purple",
//                 padding: "8px 15px",
//                 borderRadius: "5px",
//                 textDecoration: "none",
//               }}
//             >
//               Give Feedback
//             </Link>
//           ) : (
//             <Link
//               to={`/course/${enroll.courseId._id}`}
//               style={{
//                 color: "white",
//                 background: "blue",
//                 padding: "8px 15px",
//                 borderRadius: "5px",
//                 textDecoration: "none",
//               }}
//             >
//               Continue Learning
//             </Link>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MyCourses;









import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import './mycourses.css'
import { AuthContext } from "../context/AuthContext";

function MyCourses() {
  const { token } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/enrollments/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      const updated = data.map((enroll) => {
        const saved = localStorage.getItem(`progress_${enroll._id}`);
        if (saved) {
          return {
            ...enroll,
            progress: Number(saved),
            completed: Number(saved) === 100,
          };
        }
        return enroll;
      });

      setEnrollments(updated);
    } catch (err) {
      console.error("Error fetching enrollments:", err);
    }
  };

  const markAsCompleted = (enrollmentId) => {
    const updated = enrollments.map((enroll) => {
      if (enroll._id === enrollmentId) {
        localStorage.setItem(`progress_${enrollmentId}`, 100);
        alert("You have completed this course successfully!");
        return { ...enroll, progress: 100, completed: true };
      }
      return enroll;
    });
    setEnrollments(updated);
  };

  const getYouTubeId = (url) => {
    if (!url) return null;
    if (url.includes("v=")) return url.split("v=")[1].split("&")[0];
    if (url.includes("youtu.be/")) return url.split("youtu.be/")[1].split("?")[0];
    return null;
  };

  return (
    <div>
      <div className="logo" style={{padding:"10px"}}>
        EDUTECH - <span>Online learning platform</span>
      </div>
      <div style={{ padding: "40px" }} className="mycourses-container">
      <h2>My Courses</h2>

      {enrollments.length === 0 && <p>No enrolled courses yet</p>}

      {enrollments.map((enroll) => (
        <div
          key={enroll._id}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}

          className="mycourses-list"
        >
          <h3>{enroll.courseId.title}</h3>
          <p>{enroll.courseId.description}</p>

          {enroll.courseId.modules && enroll.courseId.modules.length > 0 ? (
            enroll.courseId.modules.map((mod, i) => (
              <div key={i} style={{ marginBottom: "15px" }}>
                <h4>{mod.title}</h4>
                <div className="thumbnail">
                  {mod.videoUrl ? (
                  <iframe
                    width="400"
                    height="250"
                    src={`https://www.youtube.com/embed/${getYouTubeId(mod.videoUrl)}`}
                    title={mod.title}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p>No video available</p>
                )}
                </div>
              </div>
            ))
          ) : (
            <p>No modules available</p>
          )}

          {/* Mark as completed */}
          <label>
            <input
              type="checkbox"
              checked={enroll.completed}
              onChange={() => markAsCompleted(enroll._id)}
            />{" "}
            Mark as Completed
          </label>

          <br /><br />

          {/* Give Feedback link after completion */}
          {enroll.completed && (
            <Link
              to={`/feedback/${enroll.courseId._id}`}
              style={{
                color: "white",
                background: "purple",
                padding: "8px 15px",
                borderRadius: "5px",
                textDecoration: "none",
              }}
            >
              Give Feedback
            </Link>
          )}
        </div>
      ))}
    </div>
    </div>
  );
}

export default MyCourses;
