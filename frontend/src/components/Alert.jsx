const Alert = ({ alerta }) => {
    return (
        <div className={`${alerta.error ? 'bg-red-500 rounded text-sm mt-5 font-bold text-center p-1 text-white' : 'bg-green-500 rounded text-sm mt-5 p-1 text-white text-center'}`}>
            {alerta.msg}
        </div>
    )
}

export default Alert