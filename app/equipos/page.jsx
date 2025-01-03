import { Rosters } from '@/components/Equipos/rosters'
import { Footer } from '@/components/Footer/footer'
import React from 'react'
import './equipos.css'

function page() {
    return (
        <>
            <main className='background-equipos'>
                <Rosters />
                <div className="footer">
                    <Footer />
                </div>
            </main>
        </>
    )
}

export default page