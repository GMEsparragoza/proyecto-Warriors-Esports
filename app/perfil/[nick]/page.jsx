import { Footer } from '@/components/Footer/footer';
import { Perfil } from '@/components/Perfil/perfil';
import React from 'react'
import './perfiles.css'

const page = async ({params}) => {
    const {nick} = await params;

    return (
        <>
            <div className="background-perfil">
                <Perfil nick={nick}/>
            </div>
            <Footer/>
        </>
    )
}

export default page