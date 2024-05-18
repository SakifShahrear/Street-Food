import { Router } from "express";
import path from 'path'
import { fileURLToPath } from "url";
const router=Router();
console.log("hello");
router.get('/',(req,res)=>{
    console.log(path.join(path.dirname(fileURLToPath(import.meta.url)),'../html/forget.html'));
    res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)),'../html/forget.html'));
console.log(req);
});
router.post('/', (req, res) => {
    const { email ,acctype} = req.body;
    // Add logic to handle password reset request, e.g., sending an email
    console.log(`Password reset requested for email: ${email} ${acctype}`);
    res.send('Password reset link sent to your email.');
  });

export default router;