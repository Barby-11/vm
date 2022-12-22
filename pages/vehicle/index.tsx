import { GetServerSideProps} from 'next'
import { useRouter } from 'next/router'
import { prisma } from '../../Library/prisma'
import styles from '../../styles/Home.module.css'

interface  Vehicles{
  vehicle:{
    id: string
    vehicleName: string
    vehicleModel: string
    numberOfWheels: string
  }[]
}

//
const HomeContainer = ({vehicle}: Vehicles) => {
  const router = useRouter();
  const refreshData = () =>{
    router.replace(router.asPath)
  }

  
    return(
        <>
       
          <div className={styles.container}>
            <h2>Registered Vehicles</h2>
            <div className={styles.inner}>
              <ul>
                  {vehicle.map(vehicle=>(
                    <li key={vehicle.id} >
                      <div  className={styles.data}>
                        <div className=''>
                          <h3>{vehicle.vehicleName}</h3>
                          <h3>{vehicle.vehicleModel}</h3>
                          <h3>{vehicle.numberOfWheels}</h3>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>

            </div>
                      <div className=''>
                        <button className={styles.update}>Update</button>
                        <button className={styles.delete}>Delete</button>
                      </div>
          </div>
        </>
    )
}
export default HomeContainer

//implementation to access database data 
export const getServerSideProps: GetServerSideProps = async () => {
  const vehicle = await prisma.vehicleData.findMany({
    select: {
      vehicleName: true,
      vehicleModel: true,
      numberOfWheels: true,
      id:true
    }
  })
  return{
    props:{
      vehicle
    }
  }
}