export const authorization = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) return res.status(403).json({ status: "Error", mensaje: "No estas autorizado!" });
        if (!req.user) return res.status(409).json({ status: "Error", mensaje: "No autorizado!" });
        
        next();
    };
};