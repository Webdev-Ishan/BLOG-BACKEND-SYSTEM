import response from "../Services/ai.service.js";
export const getresult = async(req,res)=>{
const {prompt} = req.body;

if(!prompt){
    return res.json({success:false,message:"Please give me a sign or prompt so i can help you better"})
}
try {

let result = await response(prompt);

if(!result){

    return res.json({success:false,message:"Something went wrong"})
}
return res.json({success:true,result})
    
} catch (error) {
    return res.json({success:false,message:error.message})
}



}