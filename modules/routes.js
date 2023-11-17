import db from "../Database/index.js";

function ModuleRoutes(app) {
    app.get("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const modules = db.modules
        .filter((m) => m.course === cid);
        res.send(modules);
    });

    app.get("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const module = db.modules
        .filter((m) => m._id === mid);
        res.send(module);
    });

    app.delete("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        db.modules = db.modules.filter((m) => m._id !== mid);
        res.sendStatus(200);
        res.send(db.modules);
    });
    
    app.post("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const newModule = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
            lessons:[]
        };
        db.modules.push(newModule);
        res.json(newModule);
    });

    app.put("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const module = db.modules.find(
          (m) => m._id === mid);
        
        module.name = req.body.name;
        module.description = req.body.description;
        res.sendStatus(200);
    });
    
}

export default ModuleRoutes;