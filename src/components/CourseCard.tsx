import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

interface CourseCardProps {
  title: string;
  instructor: string;
  rating: number;
  price: number;
  image: string;
}

export const CourseCard = ({ title, instructor, rating, price, image }: CourseCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-500">{instructor}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-1">
          <span className="font-bold text-amber-400">{rating.toFixed(1)}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="font-bold">${price.toFixed(2)}</p>
      </CardFooter>
    </Card>
  );
};