const Notification = require("../models/notification");

// @route GET /api/notifications/me
async function myNotifications (req, res) {
const notifications = await
Notification.find({ user: req.user._id })
.sort({ createdAt: -1 }); 
return res.json(notifications);
}

// @route PUT /api/notifications/:id/read
async function markRead(req, res) {
const notification = await
Notification.findOne({_id: req.params.id, user: req.user._id });
if (!notification) return res.status(404).json({ message: "Notification not found" });

notification.isRead = true;
await notification.save();
return res. json(notification);
}

// @route PUT /api/notifications/read-all
async function markAllRead (req, res) {
await Notification.updateMany({ user: req.user._id, isRead: false }, { isRead: true });
return res.json({ message: "All notifications marked as read" });
}
module. exports = { myNotifications, markRead, markAllRead };