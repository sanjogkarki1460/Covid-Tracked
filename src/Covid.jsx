import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CovidData from './CovidData'

const Covid=()=>{

    const [countries,SetCountries]=useState(['']);
    const [active,SetActive]=useState();
    const [Total,SetTotal]=useState();
    const [newCase,SetNewCase]=useState();
    const [death,SetDeath]=useState();
    const [newDeath,SetNewDeath]=useState();
    const [recovered,SetRecovered]=useState();
    const [newRecovered,SetNewRecovered]=useState();   

    useEffect(()=>{
        const worldwide= async()=>{
            await fetch("https://disease.sh/v3/covid-19/all")
            .then((response)=>response.json()) 
            .then((data)=>{
                SetTotal(data.cases)
                SetNewCase(data.todayCases)
                SetDeath(data.deaths)
                SetNewDeath(data.todayDeaths)
                SetActive(data.active)
                SetRecovered(data.recovered)
                SetNewRecovered(data.todayRecovered)
            })
        }
        const getcountry=async()=>{
            await fetch("https://disease.sh/v3/covid-19/countries") 
            .then((response)=>response.json()) 
            .then((data) =>{
                const countries=data.map((country)=>({
                     name:country.country,   
                }));
                SetCountries(countries);
            });
         };
         worldwide();
         getcountry();
         document.title=`Covid Tracker`
    },[]);

    const getdatabycountry=(event)=>{
        async function getData(){
            const res=await axios.get(`https://disease.sh/v3/covid-19/countries/${event.target.value}`)
            SetTotal(res.data.cases)
            SetNewCase(res.data.todayCases)
            SetDeath(res.data.deaths)
            SetNewDeath(res.data.todayDeaths)
            SetActive(res.data.active)
            SetRecovered(res.data.recovered)
            SetNewRecovered(res.data.todayRecovered)
        }
        getData();
        document.title=`Covid Tracker-${event.target.value}`
    }
    return(
        <>
            <div className='main_note'>
                <form>
                    <select className="input" onChange={getdatabycountry}>
                        <option selected value="world Wide">world Wide</option>
                        {countries.map((country)=>(
                            <option value={country.name}>{country.name}</option>
                        ))}
                    </select>
                </form>
            </div>
            <CovidData
                total={Total}
                newCase={newCase}
                death={death}
                newDeath={newDeath}
                active={active}
                recovered={recovered}
                newRecovered={newRecovered}
            />
        </>
    )
}

export default Covid