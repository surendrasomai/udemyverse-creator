import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Star } from "lucide-react";

interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  rating: number;
  price: number;
  image: string;
  content: string[];
}

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data, error } = await supabase
          .from("courses")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setCourse(data);

        // Check if user is enrolled
        if (user) {
          const { data: enrollmentData, error: enrollmentError } = await supabase
            .from("enrollments")
            .select("*")
            .eq("course_id", id)
            .eq("user_id", user.id)
            .single();

          if (!enrollmentError) {
            setIsEnrolled(true);
          }
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        toast.error("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, user]);

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setEnrolling(true);
    try {
      const { error } = await supabase
        .from("enrollments")
        .insert([{ user_id: user.id, course_id: id }]);

      if (error) throw error;

      toast.success("Successfully enrolled in the course!");
      setIsEnrolled(true);
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast.error("Failed to enroll in the course");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading course details...</div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Course not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex items-center gap-2 mb-6">
              <span className="font-bold text-amber-400">{course.rating.toFixed(1)}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(course.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Course Content</h2>
              <ul className="space-y-2">
                {course.content.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-udemy-primary text-white flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-lg shadow-lg p-6">
              <img src={course.image} alt={course.title} className="w-full rounded-lg mb-4" />
              <div className="text-3xl font-bold mb-4">${course.price.toFixed(2)}</div>
              <Button
                className="w-full mb-4"
                disabled={isEnrolled || enrolling}
                onClick={handleEnroll}
              >
                {isEnrolled ? "Already Enrolled" : enrolling ? "Enrolling..." : "Enroll Now"}
              </Button>
              <div className="text-sm text-gray-600">
                <p>• Full lifetime access</p>
                <p>• Access on mobile and desktop</p>
                <p>• Certificate of completion</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;