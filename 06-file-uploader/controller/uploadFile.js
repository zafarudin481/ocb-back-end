export function UploadFile(req, res) {
    const file = req.file;
    res.status(200).json({
        message: "File uploads successfull",
        file: file
    });
};