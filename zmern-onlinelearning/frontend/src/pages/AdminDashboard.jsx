import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import './admin.css'

function AdminDashboard() {
  const { token } = useContext(AuthContext);

  const [courses, setCourses] = useState([]);
  const [editCourseId, setEditCourseId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    modules: []
  });

  const [module, setModule] = useState({
    title: "",
    videoUrl: ""
  });

  const [editIndex, setEditIndex] = useState(null);

  // 🔥 Load Courses
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:8000/api/courses");
    setCourses(res.data);
  };

  const getYouTubeThumbnail = (url) => {
    let videoId;

    if (url.includes("v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }

    return videoId
      ? `https://img.youtube.com/vi/${videoId}/0.jpg`
      : null;
  };

  // ➕ Add or Update Module
  const addOrUpdateModule = () => {
    if (!module.title || !module.videoUrl) {
      alert("Enter module title and video URL");
      return;
    }

    if (editIndex !== null) {
      const updatedModules = [...form.modules];
      updatedModules[editIndex] = module;
      setForm({ ...form, modules: updatedModules });
      setEditIndex(null);
    } else {
      setForm({
        ...form,
        modules: [...form.modules, module]
      });
    }

    setModule({ title: "", videoUrl: "" });
  };

  const deleteModule = (index) => {
    const updatedModules = form.modules.filter((_, i) => i !== index);
    setForm({ ...form, modules: updatedModules });
  };

  const editModule = (index) => {
    setModule(form.modules[index]);
    setEditIndex(index);
  };

  // ✅ Add or Update Course
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editCourseId) {
        await axios.put(
          `http://localhost:8000/api/courses/${editCourseId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Course Updated!");
      } else {
        await axios.post(
          "http://localhost:8000/api/courses",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Course Added!");
      }

      setForm({
        title: "",
        description: "",
        price: 0,
        modules: []
      });

      setEditCourseId(null);
      fetchCourses();

    } catch (err) {
      alert("Error saving course");
    }
  };

  // ❌ Delete Course
  const deleteCourse = async (id) => {
    await axios.delete(
      `http://localhost:8000/api/courses/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Course Deleted!");
    fetchCourses();
  };

  // ✏️ Edit Course
  const editCourse = (course) => {
    setForm({
      title: course.title,
      description: course.description,
      price: course.price,
      modules: course.modules
    });

    setEditCourseId(course._id);
  };

  return (
    <div className="admin-container" style={{ padding: "40px" }}>
      <h2>{editCourseId ? "Edit Course" : "Add Course"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Course Title"
          value={form.title}
          required
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />
        <br /><br />

        <input
          placeholder="Description"
          value={form.description}
          required
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          required
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />
        <br /><br />

        <h3>Add Modules</h3>

        <input
          placeholder="Module Title"
          value={module.title}
          onChange={(e) =>
            setModule({ ...module, title: e.target.value })
          }
        />
        <br /><br />

        <input
          placeholder="YouTube Video URL"
          value={module.videoUrl}
          onChange={(e) =>
            setModule({ ...module, videoUrl: e.target.value })
          }
        />
        <br /><br />

        <button className="addmodule" type="button" onClick={addOrUpdateModule}>
          {editIndex !== null ? "Update Module" : "+ Add Module"}
        </button>

        <br /><br />

        {form.modules.map((m, index) => (
          <div className="preview" key={index} style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px"
          }}>
            <h4>{m.title}</h4>

            {getYouTubeThumbnail(m.videoUrl) && (
              <img
                src={getYouTubeThumbnail(m.videoUrl)}
                alt="thumbnail"
                width="200"
              />
            )}

            <br /><br />

            <button type="button" onClick={() => editModule(index)}>
              🖋️
            </button>

            <button
              type="button"
              onClick={() => deleteModule(index)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              🗑️
            </button>
          </div>
        ))}

        <br />
        <button type="submit" className="addcourse">
          {editCourseId ? "Update Course" : "+ Add Course"}
        </button>
      </form>

      <hr />

      <h1>All Courses</h1>

      {courses.map((course) => (
        <div className="courese" key={course._id} style={{
          border: "2px solid black",
          padding: "20px",
          marginBottom: "20px"
        }}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>₹{course.price}</p>

          <button onClick={() => editCourse(course)}>
            🖋️
          </button>

          <button
            onClick={() => deleteCourse(course._id)}
            style={{ marginLeft: "10px", color: "red" }}
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
