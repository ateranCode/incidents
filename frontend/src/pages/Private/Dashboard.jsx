import React from 'react'

const Dashboard = () => {
    return (
        <>
            <div className="w-screen mx-auto px-5 py-20 rounded-lg">
                <div className="flex flex-wrap gap-10 justify-center">
                    <div className="w-64 h-40 bg-sky-900 text-white shadow-md hover:-translate-y-4 duration-200 flex flex-col items-center justify-center rounded">
                        <h1>Incidencias TOTALES :</h1>
                        <p>75</p>
                    </div>
                    <div className="w-64 h-40 bg-sky-900 text-white shadow-md hover:-translate-y-4 duration-200 flex flex-col items-center justify-center rounded">
                        <h1>Incidencias VOB</h1>
                        <p>40</p>
                    </div>
                    <div className="w-64 h-40 bg-sky-900 text-white shadow-md hover:-translate-y-4 duration-200 flex flex-col items-center justify-center rounded">
                        <h1>Incidencias VOL</h1>
                        <p>35</p>
                    </div>
                    <div className="w-64 h-40 bg-sky-900 text-white shadow-md hover:-translate-y-4 duration-200 flex flex-col items-center justify-center rounded">
                        <h1>Usuarios</h1>
                        <p>5</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard