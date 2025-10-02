const Pest = require("../model/pestmodel.js");
const translate = require('google-translate-api-x');
const create1 = async (req, res) => {
    try {
        const {product,type,price,quantity} = new Pest(req.body);
         let translatedSeedName = product;
                let translatedType = type;
        
                try {
                    // Translate seedName and type in parallel using Promise.all() for better performance
                    const [translatedSeedResult, translatedTypeResult] = await Promise.all([
                        translate(product, { to: 'te' }),
                        translate(type, { to: 'te' })
                    ]);
        
                    // The translated text is on the .text property of the result object
                    translatedSeedName = translatedSeedResult.text;
                    translatedType = translatedTypeResult.text;
        
                } catch (err) {
                    console.warn("Translation failed, saving original values:", err.message);
                }
        
                const userData = new Pest({
                    product,
                    product_te: translatedSeedName,
                    type,
                    type_te: translatedType,
                    price,
                    quantity
                });
        const savedData = await userData.save();
        res.status(201).json(savedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getall=async(req,res)=>{
    try{
        const data=await Pest.find();
        if(!data){
            return  res.status(404).json({meg:"fail"})
        }
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
const get1=async(req,res)=>{
    try{
        const id=req.params.id;
        const data=await Pest.findById(id);
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
const update1 = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ msg: "ID is required" });
    }

    const data = await Pest.findByIdAndUpdate(id, req.body, { new: true });

    if (!data) {
      return res.status(404).json({ msg: "Record not found" });
    }

    res.status(200).json(data); // send updated record
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};
const deletes=async(req,res)=>{
    try{
         const id = req.params.id;
         const deletedDoc = await Pest.findByIdAndDelete(id);

    if (!deletedDoc) {
      return res.status(404).json({ msg: "Document not found" });
    }
        res.status(200).json({ msg: "Success" });
    }catch(error){
        console.error("Update error:", error.message);
    res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}

module.exports = { create1,getall,get1 ,update1,deletes};

