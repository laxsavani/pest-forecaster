
import React from 'react'

export default function Alerts({ risk }){
  const tips = {
    Severe: ["Immediate field scouting (તાત્કાલિક નિરીક્ષણ)", "Consider targeted pesticide if recommended (લક્ષિત કીટનાશક)", "Use pheromone traps (ફેરોમોન ફાંસા)"],
    High: ["Increase monitoring frequency (મોનિટરિંગ આવર્તન)", "Neem oil or bio-control where applicable (નીમ/જૈવ નિયંત્રણ)", "Field sanitation (સ્વચ્છતા)"],
    Moderate: ["Weekly scouting (સાપ્તાહિક નિરીક્ષણ)", "Maintain trap counts (ફાંસાના આંકડા)", "Irrigation management (સિંચાઈ)"],
    Low: ["Routine monitoring (નિયમિત દેખરેખ)", "Record keeping (રેકોર્ડ સંભાળ)", "General field hygiene (ખેતર સ્વચ્છતા)"]
  }
  const level = risk?.risk_level || "Low"
  return (
    <div className="bg-white rounded-2xl shadow-smooth p-5">
      <h2 className="font-semibold text-lg">Advisories(સલાહ)</h2>
      <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
        {(tips[level] || tips.Low).map((t,i)=>(<li key={i}>{t}</li>))}
      </ul>
      {risk && <p className="text-xs mt-2 opacity-70">{risk.explanation}</p>}
    </div>
  )
}
