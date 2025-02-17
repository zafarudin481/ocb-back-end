import { pool } from "../../database/connection.js";
import sendEmail from "../../service/email.js";
import { validateEmail } from "../../utils/helper.js";

const queryCheckSlot = `
SELECT * FROM slots
WHERE id = $1 AND customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL;
`;

const queryUpdateSlot = `
UPDATE slots
SET customer_name = $1, customer_email = $2, customer_phone = $3
WHERE id = $4
RETURNING id, date, time, customer_name, customer_email, customer_phone;
`;

const bookASlotForPublic = async (req, res) => {
    try {
        const slotId = req.params.id;
        const customerName = req.body.customer_name;
        const customerEmail = req.body.customer_email;
        const customerPhone = req.body.customer_phone

        // check if customer name, email and phone number is given
        if (!customerName || !customerEmail || !customerPhone) {
            return res.status(400).json({
                message: "Customer's name, email and phone number are required"
            });
        };

        // check if email is valid
        const isValidEmail = validateEmail(customerEmail);
        if (!isValidEmail) {
            return res.status(400).json({
                message: "Email is not valid"
            });
        };

        // check if slot is available
        const dbResSlot = await pool.query(queryCheckSlot, [slotId]);
        if (dbResSlot.rows.length) {
            return res.status(400).json({
                message: "Slot already booked"
            });
        };

        // book the slot
        const dbRes = await pool.query(queryUpdateSlot, [customerName, customerEmail, customerPhone, slotId]);
        const slots = dbRes.rows;

        // send email
        const emailData = {
            to: customerEmail,
            subject: "JomCuci Slot Booked",
            html: `<p>Hi ${customerName}, your slot has been booked</p><p>Slot details: ${slots[0].date} ${slots[0].time}</p>`,
            text: `Hi ${customerName}, your slot has been booked`
        }
        await sendEmail(emailData);

        res.status(200).json({
            data: slots
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    };
};

export default bookASlotForPublic;