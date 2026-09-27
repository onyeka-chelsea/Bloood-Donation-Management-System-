const jwt = require("jsonwebtoken");
const User = require("../models/Usermodel");

// Verify the JWT and attach the authenticated user to the request.
async function protect(req, res, next) {
	const header = req.headers.authorization;
	const token = header && header.startsWith("Bearer ")
		? header.split(" ")[1]
		: null;

	if (!token) {
		return res.status(401).json({
			message: "Not authorized, no token provided",
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id);

		if (!user || user.isActive === false) {
			return res.status(401).json({
				message: "Not authorized, user not found",
			});
		}

		req.user = user;
		return next();
	} catch (error) {
		return res.status(401).json({
			message: "Not authorized, invalid token",
		});
	}
}

function authorize(...allowedRoles) {
	return (req, res, next) => {
		if (!req.user || !allowedRoles.includes(req.user.role)) {
			return res.status(403).json({ message: "Forbidden: insufficient role" });
		}

		return next();
	};
}

module.exports = { protect, authorize };