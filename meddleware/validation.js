import { body, param } from "express-validator";
export const validateContent = body("content")
  .trim()
  .notEmpty()
  .isString()
  .isLength({ max: 250 })
  .escape()
  .withMessage("the content should not exceed 250 charecters");
export const validateTitle = body("title")
  .trim()
  .notEmpty()
  .isString()
  .isLength({ min: 3, max: 50 })
  .escape()
  .withMessage("The title must be between three charecters and fifty");
export const validateId = param("id")
  .trim()
  .notEmpty()
  .escape()
  .isInt({ min: 1, max: 4 })
  .withMessage(
    "The id must be a positive integer and a note should have the id"
  );
export const validateIdOp = param("id")
  .trim()
  .notEmpty()
  .escape()
  .isInt({ min: 1, max: 4 })
  .optional()
  .withMessage(
    "The id must be a positive integer and a note should have the id"
  );
