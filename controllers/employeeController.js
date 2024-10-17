import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";


// Save image with unique ID to storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('image'); // Ensure to set the field name used in your form


const addEmployee = async (req, res) => {
    try {
        // Destructure all necessary fields from req.body
        const {
            name,
            last_name,
            email,
            phone, // Ensure phone is included
            employee_id,
            employee_dob,
            gender,
            mc, // Ensure mc is included (this should correspond to the field in your form)
            purpose, // Adjust if necessary
        } = req.body;

        // Validate that required fields are present
        if (!phone || !mc) {
            return res.status(400).json({ success: false, error: "Phone and medical certificate are required." });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User already exists." });
        }

        const hashPassword = await bcrypt.hash(employee_id, 10); // Hash the password

        const newUser = new User({
            name,
            last_name,
            email,
            phone,
            password: hashPassword,
            role: "employee",
            profileImage: req.file ? req.file.filename : ""
        });

        const savedUser = await newUser.save();

        const newEmployee = new Employee({
            userId: savedUser._id,
            lastName: last_name,
            employeeId: employee_id,
            phone,
            dob: employee_dob,
            gender,
            mc, // Add medical certificate here
            purpose, // Adjust if necessary
        });

        await newEmployee.save();
        return res.status(200).json({ success: true, message: "Employee created successfully." });

    } catch (error) {
        console.error("Error in adding employee:", error); // Log the actual error
        return res.status(500).json({ success: false, error: "Server error in adding employee." });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate("userId", {password: 0});
        return res.status(200).json({success: true, employees})
    } catch (error) {
        return res.status(500).json({success: false, error: "get employees server error"})
    }
}

const getEmployee = async (req, res) => {
    const {id} = req.params;
    try {
        const employee = await Employee.findById({_id: id}).populate("userId", {password: 0});
        return res.status(200).json({success: true, employee})
    } catch (error) {
        return res.status(500).json({success: false, error: "get employee server error"})
    }
}

const updateEmployee = async (req, res) => {
    try {
        const {id} = req.params;
        const {
            name,
            last_name,
            phone,
            email,
        } = req.body;
        const employee = await Employee.findById({_id: id}, {})
        if (!employee) {
            return res.status(404).json({success: false, error: "employee not found"})
        }
        const user = await User.findById({_id: employee.userId}, {})
        if (!user) {
            return res.status(404).json({success: false, error: "user not found"})
        }
        const updateUser = await User.findByIdAndUpdate({_id: employee.userId}, {name,email})
        const updateEmployee = await Employee.findByIdAndUpdate({_id: id}, {
            lastName: last_name,
            phone,

        })
        if (!updateUser || !updateEmployee) {
            return res.status(404).json({success: false, error: "document not found"})
        }
        return res.status(200).json({success: true, message: "employee updated"})
    } catch (error) {
        return res.status(500).json({success: false, error: "update employee server error"})
    }


}

export { addEmployee, upload, getEmployees, getEmployee, updateEmployee };
