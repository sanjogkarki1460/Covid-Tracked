const CovidData=(props)=>{
    return(
        <>
            <div className='note'>
                <h1>Total Case</h1>  
                <br/>
                <p>{props.total}</p>
            </div>
            <div className='note'>
                <h1>New Case</h1>  
                <br/>
                <p>{props.newCase}</p>
            </div>
            <div className='note'>
                <h1>Total Death</h1>  
                <br/>
                <p>{props.death}</p>
            </div>
            <div className='note'>
                <h1>New Death</h1>  
                <br/>
                <p>{props.newDeath}</p>
            </div>
            <div className='note'>
                <h1>Active case</h1>  
                <br/>
                <p>{props.active}</p>
            </div>
            <div className='note'>
                <h1>recovered</h1>  
                <br/>
                <p>{props.recovered}</p>
            </div>
            <div className='note'>
                <h1>New Recovered</h1>  
                <br/>
                <p>{props.newRecovered}</p>
            </div>
        </>
    )
}

export default CovidData