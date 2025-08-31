
import React, { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard.jsx'
import ReportForm from './components/ReportForm.jsx'
import Alerts from './components/Alerts.jsx'

const API = import.meta.env.VITE_API_URL || "http://localhost:8000"

export default function App(){
  const [pests, setPests] = useState([])
  const [reports, setReports] = useState([])
  const [risk, setRisk] = useState(null)

  async function load(){
    const ps = await fetch(API + "/pests").then(r=>r.json())
    setPests(ps)
    const reps = await fetch(API + "/reports").then(r=>r.json())
    setReports(reps)
  }

  useEffect(()=>{ load() }, [])

  async function onPredict(payload){
    const res = await fetch(API + "/predict",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(payload)
    }).then(r=>r.json())
    setRisk(res)
  }

  async function onSubmitReport(payload){
    const rep = await fetch(API + "/reports",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(payload)
    }).then(r=>r.json())
    setReports([rep, ...reports])
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">🌾 Pest Forecaster</h1>
        <a className="text-sm underline" href={API + "/docs"} target="_blank">API Docs</a>
      </header>

      <Dashboard pests={pests} reports={reports} risk={risk} />

      <div className="grid md:grid-cols-2 gap-6">
        <ReportForm pests={pests} onSubmit={onSubmitReport} onPredict={onPredict} />
        <Alerts risk={risk} />
      </div>
    </div>
  )
}
