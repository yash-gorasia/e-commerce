import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {
    if (!isValidObjectId(req.params.id)) {
       res.status(400)
       throw new Error(`Invalid ID: ${req.params.id}`)
    }
    next();
}

export default checkId;