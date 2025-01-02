import { Footer } from '@/components/Footer/footer'
import { Postulaciones } from '@/components/Postulaciones/postulaciones'
import React from 'react'

function page() {
    return (
        <div className='background-posts'>
            <Postulaciones/>
            <Footer/>
        </div>
    )
}

export default page