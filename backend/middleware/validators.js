// middleware/validators.js
// Centralized request validation rules using express-validator.
// Each exported array is a list of middlewares: chain validators + handleValidation.
const { body, validationResult } = require("express-validator");

// Final middleware that turns accumulated errors into a 400 JSON response.
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(400).json({
    message: errors.array()[0].msg,
    errors: errors.array().map((e) => ({ field: e.path, msg: e.msg })),
  });
};

// Reject any value that is an object (blocks NoSQL operator injection like
// { username: { $gt: "" } }).
const isPlainString = (value) => {
  if (typeof value !== "string") {
    throw new Error("Value must be a string");
  }
  return true;
};

const signupValidator = [
  body("username")
    .custom(isPlainString)
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be 3-30 characters")
    .matches(/^[A-Za-z0-9_.-]+$/)
    .withMessage("Username can only contain letters, numbers, _ . -"),
  body("password")
    .custom(isPlainString)
    .isLength({ min: 7, max: 128 })
    .withMessage("Password must be more than 6 characters"),
  body("fullName")
    .custom(isPlainString)
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage("Full name must be 2-80 characters"),
  body("email")
    .custom(isPlainString)
    .trim()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
  body("phone")
    .custom(isPlainString)
    .trim()
    .matches(/^[+()\-\s\d]{10,20}$/)
    .withMessage("Phone must be 10-20 digits (with optional + ( ) - )"),
  handleValidation,
];

const loginValidator = [
  body("username").custom(isPlainString).trim().notEmpty().withMessage("Username is required"),
  body("password").custom(isPlainString).notEmpty().withMessage("Password is required"),
  handleValidation,
];

const chatValidator = [
  body("prompt")
    .custom(isPlainString)
    .isLength({ min: 1, max: 4000 })
    .withMessage("Prompt must be 1-4000 characters"),
  handleValidation,
];

const quizSubmitValidator = [
  body("courseId").custom(isPlainString).trim().notEmpty().withMessage("courseId is required"),
  body("score").isInt({ min: 0 }).withMessage("score must be a non-negative integer"),
  body("total").isInt({ min: 1 }).withMessage("total must be a positive integer"),
  handleValidation,
];

const studentValidator = [
  body("username")
    .custom(isPlainString)
    .trim()
    .isLength({ min: 3, max: 30 })
    .matches(/^[A-Za-z0-9_.-]+$/)
    .withMessage("Username 3-30 chars, alphanumeric/_.-"),
  body("password")
    .optional({ checkFalsy: true })
    .custom(isPlainString)
    .isLength({ min: 7, max: 128 })
    .withMessage("Password must be more than 6 characters"),
  body("fullName").custom(isPlainString).trim().isLength({ min: 2, max: 80 }),
  body("email").custom(isPlainString).trim().isEmail().withMessage("Invalid email").normalizeEmail(),
  body("phone")
    .custom(isPlainString)
    .trim()
    .matches(/^[+()\-\s\d]{10,20}$/)
    .withMessage("Invalid phone format"),
  body("courses").optional().isArray().withMessage("courses must be an array"),
  handleValidation,
];

const courseValidator = [
  body("title").custom(isPlainString).trim().isLength({ min: 1, max: 200 }),
  body("category").custom(isPlainString).trim().isLength({ min: 1, max: 100 }),
  body("level")
    .optional()
    .custom(isPlainString)
    .isIn(["Beginner", "Intermediate", "Advanced", "All"])
    .withMessage("level must be one of: Beginner, Intermediate, Advanced, All"),
  body("id").optional().custom(isPlainString).trim().isLength({ max: 100 }),
  body("duration").optional().custom(isPlainString).trim().isLength({ max: 100 }),
  body("badge").optional().custom(isPlainString).trim().isLength({ max: 200 }),
  body("shortDescription").optional().custom(isPlainString).isLength({ max: 1000 }),
  body("longDescription").optional().custom(isPlainString).isLength({ max: 10000 }),
  body("topics").optional().isArray(),
  body("objectives").optional().isArray(),
  handleValidation,
];

const universitySubjectValidator = [
  body("id").custom(isPlainString).trim().isLength({ min: 1, max: 100 }),
  body("title").custom(isPlainString).trim().isLength({ min: 1, max: 200 }),
  body("semester").optional().custom(isPlainString).trim().isLength({ max: 100 }),
  body("badge").optional().custom(isPlainString).trim().isLength({ max: 200 }),
  body("longDescription").optional().custom(isPlainString).isLength({ max: 10000 }),
  body("chapters").optional().isArray(),
  body("objectives").optional().isArray(),
  handleValidation,
];

const questionValidator = [
  body("question").custom(isPlainString).trim().isLength({ min: 1, max: 2000 }),
  body("options").isArray({ min: 2, max: 10 }).withMessage("options must be 2-10 items"),
  body("answer").custom(isPlainString).trim().isLength({ min: 1, max: 2000 }),
  handleValidation,
];

module.exports = {
  signupValidator,
  loginValidator,
  chatValidator,
  quizSubmitValidator,
  studentValidator,
  courseValidator,
  universitySubjectValidator,
  questionValidator,
};
