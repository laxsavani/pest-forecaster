
import React from 'react'

export default function Dashboard({ pests, reports, risk }){
  return (
    <section className="grid sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl shadow-smooth p-5">
        <div className="text-sm text-gray-500">Pest Types (કીટકનો પ્રકાર)</div>
        <div className="text-3xl font-semibold">{pests.length}</div>
      </div>
      <div className="bg-white rounded-2xl shadow-smooth p-5">
        <div className="text-sm text-gray-500">Reports (અહેવાલો)</div>
        <div className="text-3xl font-semibold">{reports.length}</div>
      </div>
      <div className="bg-white rounded-2xl shadow-smooth p-5">
        <div className="text-sm text-gray-500">Current Risk (વર્તમાન જોખમ)</div>
        <div className="text-3xl font-semibold">{risk ? risk.risk_level : "—"}</div>
        {risk && <div className="text-xs mt-1 opacity-70">Score: {risk.risk_score}</div>}
      </div>
    </section>
  )
}
