import { NextApiRequest,NextApiResponse } from "next/"
import { prisma } from "../../../Library/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    
    //    
    const vehicleId= req.query.id

    if(req.method === 'DELETE')
    {
        const vehicle = await prisma.vehicleData.delete({
            where: {id: Number(vehicleId)}
        })
        res.json(vehicle)
    }else{
        console.log("Delete Failed...")
    }
}