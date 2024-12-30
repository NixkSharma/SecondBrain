import { z } from "zod";

export const shareLinkSchema = z.object({
    share : z.boolean()
});
