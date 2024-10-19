import mongoose from "mongoose";
import { Schema } from "mongoose";

// Define the employee schema
const employeeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    lastName: { type: String, required: true, trim: true }, // Trim whitespace
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v); // Validate 10-digit phone numbers
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    employeeId: { type: String, unique: true, required: true, trim: true },
    dob: { type: Date },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        require: true
    },
    mc: {
        type: String,
        enum: ["Yes", "No"],
        required: true
    },
    purpose: {
        type: String,
        enum: ["Medicinal", "Recreational", "Culinary"],
        required: true
    }
}, { timestamps: true }); // Automatically manage createdAt and updatedAt

// Create the Employee model
const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
