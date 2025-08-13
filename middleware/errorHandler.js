import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err instanceof ZodError) {
        res.status(400).json({
            massage: 'Validation failed',

            errors: err.flatten().fieldErrors
        });
        return;
    }

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({ 
        message: err.message,
        stack: process.env.NODE_ENV === 'Production' ? null : err.stack,
    });
};