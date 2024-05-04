import Assistant from "../models/AssistantSchema.js";

export const createAssistant = async(req,res) => {
    
    const {
        email,
        name,
        mobile,
        salary,
        city,
        country,
        department,
        role
    } = req.body;
    
    try{

        let assistant = null;
        assistant = await Assistant.findOne({email});

        if(assistant){
            return res.status(409).json({message: 'User already exists!'});
        }

        assistant = new Assistant({
            email,
            name,
            mobile,
            salary,
            city,
            country,
            department,
            role
        })

        await assistant.save();

        res.status(200).json({success: true ,message:'Assistant Successfully created!', data: assistant._id})

    }catch(e){
        console.log("Error Creating Assistant Record =>", e);
        res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}

export const searchAssistant = async(req,res) => {

    try{
        const assistant = await Assistant.findById(req.params.id);

        res.status(200).json({success:true, message: "Assistant Details grabbed Successfully!", data: assistant});

    }catch(e){
        console.log("Error getting Assistant Details => ", e);
        res.status(500).json({success:false, message: "Assistant not found!"})
    }
}

export const updateAssistant = async(req,res) => {
    const id = req.params.id;

    try{
        const updateAssistant = await Assistant.findByIdAndUpdate(id,{ $set:req.body }, {new:true});

        res.status(200).json({success:true, message:"Assistant updated successfully", data: updateAssistant})
    }catch(e){
        console.log("Error at updating assistant =>", e);
        res.status(500).json({success:false, message:'Failed to Update!'})
    }
}

export const deleteAssistant = async(req,res) => {
    const id = req.params.id;
    try{
        const deleteAssistant = await Assistant.findByIdAndDelete(id);
        res.status(200).json({success:true, message:'Assistant Deleted Successfully'})
    }catch(e){
        console.log("Error at deleting assistant =>", e)
        res.status(500).json({success:false, message:'Failed to Delete'});
    }
}