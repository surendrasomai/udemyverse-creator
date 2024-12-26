import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";

const featuredCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp 2024",
    instructor: "Dr. Angela Yu",
    rating: 4.8,
    price: 89.99,
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2831&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Machine Learning A-Z: Hands-On Python & R",
    instructor: "Kirill Eremenko",
    rating: 4.7,
    price: 94.99,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "iOS & Swift - The Complete iOS App Development Bootcamp",
    instructor: "Dr. Angela Yu",
    rating: 4.9,
    price: 99.99,
    image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "The Complete Digital Marketing Course",
    instructor: "Rob Percival",
    rating: 4.6,
    price: 84.99,
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=2874&auto=format&fit=crop",
  },
];

const categories = [
  "Development",
  "Business",
  "Finance & Accounting",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Health & Fitness",
  "Music",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-udemy-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Learn without limits</h1>
            <p className="text-xl mb-8">
              Start, switch, or advance your career with thousands of courses from
              expert instructors.
            </p>
            <Button size="lg" className="bg-udemy-secondary hover:bg-udemy-secondary/90">
              Explore Courses
            </Button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-12 bg-udemy-light">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Top Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="h-auto py-4 px-6 text-center justify-center"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;