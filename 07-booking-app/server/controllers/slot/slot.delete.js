import { pool } from "../../database/connection.js";

const queryDeleteSlot = `
DELETE FROM slots
WHERE id = $1;
`;

const deleteSlot = async (req, res) => {
    try {
        const slotId = req.params.id;
        const dbRes = await pool.query(queryDeleteSlot, [slotId]);
        const message = dbRes.rowCount ? `Slot with id ${slotId} deleted` : `Slot with id ${slotId} not found`;
        res.json({ message });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    };
};

export default deleteSlot;