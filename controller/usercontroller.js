const User = require("../model/usermodel.js");
const translate = require('google-translate-api-x');
const create = async (req, res) => {
    try {
           const { seedName, type,name, price, quantity } = req.body;

        let translatedSeedName = seedName;
        let translatedType = type;
        let tname=name;

        try {
            // Translate seedName and type in parallel using Promise.all() for better performance
            const [translatedSeedResult, translatedTypeResult,tname1] = await Promise.all([
                translate(seedName, { to: 'te' }),
                translate(type, { to: 'te' }),
                translate(name,{to:'te'})
            ]);

            // The translated text is on the .text property of the result object
            translatedSeedName = translatedSeedResult.text;
            translatedType = translatedTypeResult.text;
            tname=tname1.text;

        } catch (err) {
            console.warn("Translation failed, saving original values:", err.message);
        }

        const userData = new User({
            seedName,
            seedName_te: translatedSeedName,
            type,
            name,
            name_te:tname,
            type_te: translatedType,
            price,
            quantity
        });

     const savedData = await userData.save();
     res.status(200).json(savedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const get=async(req,res)=>{
    try{
        const data=await User.find();
        if(!data){
            return  res.status(404).json({meg:"fail"})
        }
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
const getone=async(req,res)=>{
    try{
        const id=req.params.id;
        const data=await User.findById(id);
        if(!data){
            return  res.status(404).json({meg:"fail"})
        }
        res.status(200).json(data);
        
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
/*const update=async(req,res)=>{
    try{
        const id=req.params.id;
        const d=await User.findById(id);
        if(!d){
            return  res.status(404).json({meg:"fail"})
        }
        const data=await d.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
*/
const update = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ msg: "ID is required" });
    }

    const data = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!data) {
      return res.status(404).json({ msg: "Record not found" });
    }

    res.status(200).json(data); // send updated record
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};
const del=async(req,res)=>{
    try{
         const id = req.params.id;
         const deletedDoc = await User.findByIdAndDelete(id);

    if (!deletedDoc) {
      return res.status(404).json({ msg: "Document not found" });
    }
        res.status(200).json({ msg: "Success" });
    }catch(error){
        console.error("Update error:", error.message);
    res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}

module.exports = { create,get,getone ,update,del};




