import jwt from "jsonwebtoken";

export function getUserFromToken(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded.id;
  } catch {
    return null;
  }
}
