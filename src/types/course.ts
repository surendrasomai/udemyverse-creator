export interface Course {
  id: string;
  title: string;
  description: string | null;
  instructor_id: string | null;
  price: number;
  image: string | null;
  rating: number | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface EnrollmentWithCourse {
  courses: Course;
}