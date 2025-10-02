const  Schema= require("../model/schemamodel.js");
const translate = require('google-translate-api-x');
const create2 = async (req, res) => {
    try {
           const { names,landholder,Identity,price,sdate,edate,classs } = req.body;

        let class_t=classs;
        let names_t=names;
        let Identity_t=Identity;

        try {
            // Translate seedName and type in parallel using Promise.all() for better performance
            const [class_tr, names_tr,Identity_tr] = await Promise.all([
                translate(classs, { to: 'te' }),
                translate(names, { to: 'te' }),
                translate(Identity,{to:'te'})
            ]);

            // The translated text is on the .text property of the result object
        class_t=class_tr.text;
        names_t=names_tr.text;
        Identity_t=Identity_tr.text;

        } catch (err) {
            console.warn("Translation failed, saving original values:", err.message);
        }

        const userData = new Schema({
            classs,
            names,
            class_te:class_t,
            names_te: names_t,
            landholder,
            Identity,
            Idenity_te: Identity_t,
            price,
            sdate,
            edate
        });

     const savedData = await userData.save();
     res.status(200).json(savedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const get2=async(req,res)=>{
    try{
        const data=await Schema.find();
        if(!data){
            return  res.status(404).json({meg:"fail"})
        }
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
const getone2=async(req,res)=>{
    try{
        const id=req.params.id;
        const data=await Schema.findById(id);
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
const update2= async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ msg: "ID is required" });
    }

    const data = await Schema.findByIdAndUpdate(id, req.body, { new: true });

    if (!data) {
      return res.status(404).json({ msg: "Record not found" });
    }

    res.status(200).json(data); // send updated record
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};
const del2=async(req,res)=>{
    try{
         const id = req.params.id;
         const deletedDoc = await Schema.findByIdAndDelete(id);

    if (!deletedDoc) {
      return res.status(404).json({ msg: "Document not found" });
    }
        res.status(200).json({ msg: "Success" });
    }catch(error){
        console.error("Update error:", error.message);
    res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}

module.exports = { create2,get2,getone2 ,update2,del2};

