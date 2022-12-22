import { NextApiRequest,NextApiResponse } from "next/"
import { prisma } from "../../Library/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    
    //    
    const {vehicleName, vehicleModel,numberOfWheels} = req.body
    try {
         await prisma.vehicleData.create({
            data: {
                vehicleName,vehicleModel,numberOfWheels
            }
        })
        res.status(200).json({message: "Vehicle saved"})
    } catch (error) {
        console.log("Error while saving your data...");
    }
}