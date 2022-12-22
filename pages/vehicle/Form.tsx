
import { NextPage } from 'next'
import { useState } from 'react'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'

interface FormData{
    id: string
    vehicleName: string
    vehicleModel: string
    numberOfWheels: string
}

const Form: NextPage = () => {
    const [formData,setFormData] = useState<FormData>({id: '', vehicleName:'', vehicleModel:'',numberOfWheels:''});
    const router = useRouter();
    const refreshData = () =>{
    router.replace(router.asPath)
  }
    // 
    async function create(data: FormData) {        
        try{
            fetch(`http://localhost:3000/api/create`,{
                 body: JSON.stringify(data),
                 headers: {
                    'Content-Type' : 'application/json'
                },
                method: 'POST'
            }).then(() => {
                    setFormData({vehicleName: '', vehicleModel: '', numberOfWheels: '',id:''}),
                    refreshData()
                }
                )
            
        }catch(error){
            console.log(error)
        }
    }


    // 
    const handleSubmit = async (data: FormData) => {
        try {
            create(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
        <main className={styles.form}>
            {/* begining of form  */}
            <form onSubmit={e=>{
                e.preventDefault()
                handleSubmit(formData)
                }} >
                    <h2 className={styles.title}>Vehicle Registration</h2>
                    
                    {/* vehicle name input */}
                    <div className={styles.name}>
                        <label className={styles.text}>Vehicle Name</label>
                        
                        <br/>

                        <input
                            type="text" 
                            value={formData.vehicleName}
                            placeholder='Vehicle Name' 
                            required 
                            onChange={e=>setFormData({...formData, vehicleName: e.target.value})}/>
                    </div>

                    <br/>

                    {/* vehicle model input */}
                    <div className={styles.model}>
                        <label className={styles.text}>Vehicle Model</label>
                        <br/>
                        <input  
                            type="text" 
                            value={formData.vehicleModel}
                            placeholder='Vehicle Model' 
                            required 
                            onChange={e=>setFormData({...formData, vehicleModel: e.target.value})}/>
                    </div>

                    <br/>

                    {/* wheels selection */}
                    <div  className={styles.wheels}>
                        <label className={styles.text}>Number of Wheels</label>
                        <br/>
                        <select 
                            value={formData.numberOfWheels}
                            required
                            onChange={e=>setFormData({...formData, numberOfWheels: e.target.value})}>
                            <option value='2'>2 Wheels</option>
                            <option value='3'>3 wheels</option>
                            <option value='4'>4 wheels</option>
                        </select>
                    </div>
                    
                    <br/>

                    {/* submit button */}
                    <div  className={styles.button}>
                        <button type="submit" >Submit</button>
                    </div>
                </form>
        </main>
        </>
    )
}
export default Form;