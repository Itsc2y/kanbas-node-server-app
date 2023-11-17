import db from "../Database/index.js";

function AssignmentRoutes(app) {
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments
        .filter((a) => a.course === cid);
        res.send(assignments);
    });

    app.get("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignment = db.assignments
        .filter((a) => a._id === aid);
        res.send(assignment);
    });

    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
        res.send(db.assignments);
    });
    
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString()
        };
        db.assignments.push(newAssignment);
        res.json(newAssignment);
    });

    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignment = db.assignments.find(
          (a) => a._id === aid);
        
        assignment.name = req.body.name;
        assignment.description = req.body.description;
        res.sendStatus(200);
    });
    
}

export default AssignmentRoutes;