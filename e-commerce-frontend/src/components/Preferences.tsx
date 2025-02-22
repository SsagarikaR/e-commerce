import React, { useEffect, useState } from 'react'
import { makeAuthorizedGetRequest } from '../services/authorizedRequests'
import PrefernceCard from '../subComponents.tsx/PrefernceCard'

function Preferences() {
  const [preferences,setPreferences]=useState<prefernce[]|undefined>()
    const fetchPrefernces=async()=>{
        const response=await makeAuthorizedGetRequest("/prefernces")
        console.log(response);
        if(response?.data){
          setPreferences(response.data);
        }
    }

    useEffect(()=>{
        fetchPrefernces();
    },[])
  return (
    <div className="p-4">
      {preferences && preferences.length > 0 && (
        <div>
          <h1 className="text-2xl font-bold mb-4 md:text-start text-center">Recommended Items</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {preferences.map((item) => (
              <PrefernceCard
                key={item.preferenceID}
                item={item}
              />
            ))}
          </div>
        </div>
      )}
    </div>
    )
}

export default Preferences
