import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CovidData from './CovidData'

const Covid = () => {
    const [countries, SetCountries] = useState(['']);
    const [active, SetActive] = useState();
    const [Total, SetTotal] = useState();
    const [newCase, SetNewCase] = useState();
    const [death, SetDeath] = useState();
    const [newDeath, SetNewDeath] = useState();
    const [recovered, SetRecovered] = useState();
    const [newRecovered, SetNewRecovered] = useState();
    const [loader, SetLoader] = useState(false);

    const worldwide = async () => {
        SetLoader(true)
        await fetch("https://disease.sh/v3/covid-19/all")
            .then((response) => response.json())
            .then((data) => {
                SetTotal(data.cases)
                SetNewCase(data.todayCases)
                SetDeath(data.deaths)
                SetNewDeath(data.todayDeaths)
                SetActive(data.active)
                SetRecovered(data.recovered)
                SetNewRecovered(data.todayRecovered)
                SetLoader(false)
            })
    }
    const getcountry = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) => {
                const countries = data.map((country) => ({
                    name: country.country,
                }));
                SetCountries(countries);
            });
    };
    const getdatabycountry = (event) => {
        SetLoader(true)
        async function getData() {
            const res = await axios.get(`https://disease.sh/v3/covid-19/countries/${event.target.value}`)
            SetTotal(res.data.cases)
            SetNewCase(res.data.todayCases)
            SetDeath(res.data.deaths)
            SetNewDeath(res.data.todayDeaths)
            SetActive(res.data.active)
            SetRecovered(res.data.recovered)
            SetNewRecovered(res.data.todayRecovered)
            SetLoader(false)
        }
        getData();
        document.title = `Covid Tracker-${event.target.value}`
    }

    const getdata = (event) => {
        if (event.target.value === '') {
            worldwide();
        }
        else {
            getdatabycountry(event);
        }
    }
    useEffect(() => {
        worldwide();
        getcountry();
        document.title = `Covid Tracker`
    }, []);


    return (
        <>
            <div className='main_note'>
                <form>
                    <select className="input" onChange={getdata}>
                        <option defaultValue value="">world Wide</option>
                        {countries.map((country,index) => (
                            <option key={index} value={country.name}>{country.name}</option>
                        ))}
                    </select>
                </form>
            </div>
            {loader === true ?
                <div className='loader-image'>
                    <img src={process.env.PUBLIC_URL + '/loader.gif'} alt='loader'/>
                </div>
                :
                <CovidData
                    total={Total}
                    newCase={newCase}
                    death={death}
                    newDeath={newDeath}
                    active={active}
                    recovered={recovered}
                    newRecovered={newRecovered}
                />
            }
        </>
    )
}

export default Covid