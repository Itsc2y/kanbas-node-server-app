function HelloRoutes(app) {
    app.get("/", (req, res) => {
        res.send("Welcome to Web Dev!");
    });
    
    app.get("/hello", (req, res) => {
        res.send("Hello World!");
    });
}

export default HelloRoutes;