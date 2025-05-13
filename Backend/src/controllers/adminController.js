export const getAdmin = async (req, res) => {
    try {
        const { userId } = req.params;
        const admin = await User.findById(userId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}