import db from "../Database/index.js";

function CourseRoutes(app) {
    app.get("/api/courses", (req, res) => {
        const courses = db.courses;
        res.json(courses);
    });

    app.get("/api/courses/:cid", (req, res) => {
        const { cid } = req.params;
        const course = db.courses
        .filter((c) => c._id === cid);
        res.send(course);
    });

    app.post("/api/courses", (req, res) => {
        const newCourse = { 
            ...req.body,
            _id: new Date().getTime().toString() 
        };
        db.courses.push(newCourse);
        res.json(newCourse);
    });

    app.delete("/api/courses/:cid", (req, res) => {
        const { cid } = req.params;
        db.courses = db.courses.filter((c) => c._id !== cid);
        res.sendStatus(200);
        res.send(db.courses);
    });

    app.put("/api/courses/:cid", (req, res) => {
        const { cid } = req.params;
        const course = db.courses.find(
          (c) => c._id === cid);
        
        course.name = req.body.name;
        course.number = req.body.number;
        course.startDate = req.body.startDate;
        course.endDate = req.body.endDate;
        res.sendStatus(200);
    });

}
export default CourseRoutes;
