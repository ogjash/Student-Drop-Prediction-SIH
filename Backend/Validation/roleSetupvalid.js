const {z}=require('zod');

const roleSetupSchema=z.object({
    username:z.string(),
    mobileNo:z.string().min(10).max(12),
});
module.exports={roleSetupSchema};