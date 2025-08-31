import React, { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard.jsx'
import ReportForm from './components/ReportForm.jsx'
import Alerts from './components/Alerts.jsx'

const API = import.meta.env.VITE_API_URL || "http://localhost:8000"

export default function App() {
  const [pests, setPests] = useState([])
  const [reports, setReports] = useState([])
  const [risk, setRisk] = useState(null)

  async function load() {
    const ps = await fetch(API + "/pests").then(r => r.json())
    setPests(ps)
    const reps = await fetch(API + "/reports").then(r => r.json())
    setReports(reps)
  }

  useEffect(() => { load() }, [])

  async function onPredict(payload) {
    const res = await fetch(API + "/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(r => r.json())
    setRisk(res)
  }

  async function onSubmitReport(payload) {
    const rep = await fetch(API + "/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(r => r.json())
    setReports([rep, ...reports])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-green-50 to-blue-100 text-gray-900 flex flex-col">
      
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide drop-shadow-lg">
            🌱 Pest Forecaster
          </h1>
          <a
            className="px-6 py-2 rounded-xl text-sm font-semibold bg-white/20 text-white hover:bg-white/30 hover:scale-105 transition-all shadow-md"
            href={API + "/docs"}
            target="_blank"
          >
            API Docs
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 space-y-14">
        
        {/* Dashboard */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-teal-100 hover:shadow-3xl hover:scale-[1.01] transition-all duration-300">
          <Dashboard pests={pests} reports={reports} risk={risk} />
        </div>

        {/* Grid Section */}
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Report Form */}
          <div className="bg-gradient-to-br from-green-50/90 to-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-10 border border-emerald-100 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-extrabold text-emerald-700 mb-6 flex items-center gap-2">
              📋 Submit Report
            </h2>
            <ReportForm pests={pests} onSubmit={onSubmitReport} onPredict={onPredict} />
          </div>

          {/* Alerts */}
          <div className="bg-gradient-to-br from-blue-50/90 to-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-10 border border-blue-100 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-extrabold text-blue-700 mb-6 flex items-center gap-2">
              ⚠️ Pest Alerts
            </h2>
            <Alerts risk={risk} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/70 backdrop-blur-md border-t border-gray-200 py-6 mt-10 shadow-inner">
        <p className="text-center text-sm text-gray-700">
          © {new Date().getFullYear()} <span className="font-bold text-emerald-600">Pest Forecaster</span> · Built with 🌍 care for Farmers
        </p>
      </footer>
    </div>
  )
}
