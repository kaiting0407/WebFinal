import { useState } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";

export function CC() {

  const semester=[
    {
      name:"大一上"
    },
    {
      name:"大一下"
    },
    {
      name:"大二上"
    },
    {
      name:"大二下"
    },
    {
      name:"大三上"
    },
    {
      name:"大三下"
    },
    {
      name:"大四上"
    },
    {
      name:"大四下"
    },
    {
      name:"抵免"
    }
  ]

  const [totalRequiredCredits, setTotalRequiredCredits] = useState(0);
  const [totalElectedCredits, setTotalElectedCredits] = useState(0);
  const addCredits = (credits, type) => {
    if (type === 'required') {
      setTotalRequiredCredits(prev => prev + credits);
    } else {
      setTotalElectedCredits(prev => prev + credits);
    }
  };
  const deleteCredits = (credits, type) => {
    if (type === 'required') {
      setTotalRequiredCredits(prev => prev - credits);
    } else {
      setTotalElectedCredits(prev => prev - credits);
    }
  };

  

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {semester.map((item, index) => (
        <Cardadd title={item.name} key={index} addCredits={addCredits} deleteCredits={deleteCredits} />
      ))}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Credit Summary</CardTitle>
          <CardDescription>Total required and elected credits.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span>Total Required Credits:</span>
              <span>{totalRequiredCredits}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Total Elected Credits:</span>
              <span>{totalElectedCredits}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Total Credits:</span>
              <span>{totalRequiredCredits + totalElectedCredits}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Cardadd({title,addCredits,deleteCredits}){
  const [coursesYear1, setCoursesYear1] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [credits, setCredits] = useState(0);
  const [type, setType] = useState('required');

  const addCourseYear1 = () => {
    setCoursesYear1([...coursesYear1, { name: courseName, credits: Number(credits), type }]);
    addCredits(Number(credits),type)
    resetForm();
  };
  const resetForm = () => {
    setCourseName('');
    setCredits(0);
    setType('required');
  };

  const deleteCourseYear1 = (index) => {
    setCoursesYear1(coursesYear1.filter((_, i) => i !== index));
    const course = coursesYear1[index];
    deleteCredits(course.credits, course.type);
  };

  const calculateCredits = (courses, type) => {
    return courses.filter(course => course.type === type).reduce((acc, course) => acc + course.credits, 0);
  };

  const requiredCreditsYear1 = calculateCredits(coursesYear1, 'required');
  const electedCreditsYear1 = calculateCredits(coursesYear1, 'elected');

  return(
    <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Add courses and see the total required and elected credits.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-[1fr_auto] items-center gap-2">
              <Input 
                name="name" 
                placeholder="Course Name" 
                value={courseName} 
                onChange={(e) => setCourseName(e.target.value)} 
              />
              <Button onClick={addCourseYear1}>Add</Button>
            </div>
            <div className="grid grid-cols-[1fr_1fr] gap-2">
              <Select 
                name="credits" 
                value={credits} 
                onValueChange={(value) => setCredits(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Credits" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5, 6].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select 
                name="type" 
                value={type} 
                onValueChange={(value) => setType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="required">Required</SelectItem>
                  <SelectItem value="elected">Elected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span>Required Credits:</span>
                <span>{requiredCreditsYear1}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Elected Credits:</span>
                <span>{electedCreditsYear1}</span>
              </div>
            </div>
            <div className="grid gap-2">
              {coursesYear1.map((course, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{course.name} ({course.credits} credits, {course.type})</span>
                  <Button onClick={() => deleteCourseYear1(index)}>Delete</Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
  )
}