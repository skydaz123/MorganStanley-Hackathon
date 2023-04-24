import { z } from "zod"

const positiveNumberSchema = z.number()
    .positive("Amount needs to be positive")
    .or(z.string().regex(/\d+/, "Invalid number").transform(Number))
    .refine((n) => n >= 0)

export default positiveNumberSchema
