import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRole } from "@/contexts/RoleContext";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Course, EnrollmentWithCourse } from "@/types/course";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { role, isEducator, isAdmin, isSuperAdmin } = useRole();
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
        console.log("Fetching enrolled courses for user:", user.id);
        const { data, error } = await supabase
          .from("enrollments")
          .select(`
            courses (
              id,
              title,
              description,
              instructor_id,
              price,
              image,
              rating
            )
          `)
          .eq("user_id", user.id);

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }

        console.log("Raw data from Supabase:", data);

        const courses = data.map((enrollment: EnrollmentWithCourse) => enrollment.courses);
        console.log("Transformed courses:", courses);
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

  if (!user) return null;

  const renderDashboardContent = () => {
    if (isEducator) {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Educator Dashboard</h1>
            <Button onClick={() => navigate("/courses/create")}>Create Course</Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Your Courses</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Educator's course management interface will be implemented here */}
              <p>Course management coming soon...</p>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (isAdmin || isSuperAdmin) {
      return (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Admin user management interface will be implemented here */}
                <p>User management coming soon...</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Course Overview</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Admin course overview interface will be implemented here */}
                <p>Course overview coming soon...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Learning</h1>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{course.description}</p>
                  <div className="mt-4">
                    <Button 
                      onClick={() => navigate(`/courses/${course.id}`)}
                      className="w-full"
                    >
                      Continue Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">No courses yet</h2>
            <p className="text-gray-600 mb-6">Start learning by enrolling in a course</p>
            <Button
              onClick={() => navigate("/")}
              className="bg-primary hover:bg-primary/90"
            >
              Browse Courses
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {renderDashboardContent()}
      </main>
    </div>
  );
};

export default Dashboard;