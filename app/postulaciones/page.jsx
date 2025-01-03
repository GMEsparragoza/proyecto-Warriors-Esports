import { Footer } from '@/components/Footer/footer'
import { Postulaciones } from '@/components/Postulaciones/postulaciones'
import React from 'react'
import './post.css'

function page() {
    return (
        <>
            <div className='background-posts'>
                <Postulaciones />
            </div>
            <Footer />
        </>
    )
}

export default page