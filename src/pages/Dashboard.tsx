import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  price: number;
  image: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchEnrolledCourses = async () => {
      try {
        const { data, error } = await supabase
          .from("enrollments")
          .select(`
            course_id,
            courses (
              id,
              title,
              instructor,
              rating,
              price,
              image
            )
          `)
          .eq("user_id", user.id);

        if (error) throw error;

        const courses = data.map((enrollment) => enrollment.courses);
        setEnrolledCourses(courses);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        toast.error("Failed to load your courses");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Learning</h1>
        
        {loading ? (
          <div className="text-center">Loading your courses...</div>
        ) : enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">No courses yet</h2>
            <p className="text-gray-600 mb-6">Start learning by enrolling in a course</p>
            <button
              onClick={() => navigate("/")}
              className="bg-udemy-primary text-white px-6 py-2 rounded-lg hover:bg-udemy-primary/90"
            >
              Browse Courses
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;