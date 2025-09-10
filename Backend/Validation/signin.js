const {z}=require('zod');
const signinSchema=z.object({
    email:z.email(),
    password:z.string().min(6).max(20)
});
module.exports=signinSchema;