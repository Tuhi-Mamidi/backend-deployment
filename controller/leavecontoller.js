const Leave = require("../model/leavemodel.js");
const translate = require('google-translate-api-x');
const create10 = async (req, res) => {
    try {
           const { date,day,year,status,status_te } = req.body;

        let translatedstatus= status;
        

        try {
            // Translate seedName and type in parallel using Promise.all() for better performance
            const [translatedstatus1] = await Promise.all([
                translate(status, { to: 'te' }),
                
            ]);

            // The translated text is on the .text property of the result object
            translatedstatus= translatedstatus1.text;
           

        } catch (err) {
            console.warn("Translation failed, saving original values:", err.message);
        }

        const userData = new Leave({
            date,
            day,
            year,
            status,
            status_te: translatedstatus,
        });

     const savedData = await userData.save();
     res.status(200).json(savedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const get10=async(req,res)=>{
    try{
        const data=await Leave.find();
        if(!data){
            return  res.status(404).json({meg:"fail"})
        }
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
const del10=async(req,res)=>{
    try{
         const id = req.params.id;
         const deletedDoc = await Leave.findByIdAndDelete(id);

    if (!deletedDoc) {
      return res.status(404).json({ msg: "Document not found" });
    }
        res.status(200).json({ msg: "Success" });
    }catch(error){
        console.error("Update error:", error.message);
    res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}
module.exports={create10,del10,get10}