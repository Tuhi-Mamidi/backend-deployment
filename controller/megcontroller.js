const Message = require("../model/megmodel.js");
const createm = async (req, res) => {
    try {
           const data = req.body;

        const userData = new Message(data);

     const savedData = await userData.save();
     res.status(200).json(savedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getm=async(req,res)=>{
    try{
        const data=await Message.find();
        if(!data){
            return  res.status(404).json({meg:"fail"})
        }
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
const delm=async(req,res)=>{
    try{
         const id = req.params.id;
         const deletedDoc = await Message.findByIdAndDelete(id);

    if (!deletedDoc) {
      return res.status(404).json({ msg: "Document not found" });
    }
        res.status(200).json({ msg: "Success" });
    }catch(error){
        console.error("Update error:", error.message);
    res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}
module.exports = { createm,getm,delm};