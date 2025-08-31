
import React, { useState } from 'react'

export default function ReportForm({ pests, onSubmit, onPredict }){
  const [form, setForm] = useState({
    pest: pests[0]?.name || "aphid",
    crop: "cotton",
    lat: 22.3, lon: 70.8,
    temperature: 30, humidity: 70, rainfall: 20, soil_moisture: 40, wind_speed: 6,
    label: 1
  })

  function set(k,v){ setForm(prev=>({...prev, [k]:v})) }

  function submit(e){
    e.preventDefault()
    onSubmit(form)
  }

  function predict(e){
    e.preventDefault()
    onPredict(form)
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl shadow-smooth p-5 space-y-4">
      <h2 className="font-semibold text-lg">Field Report / Prediction(ક્ષેત્ર અહેવાલ / આગાહી
)</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Pest (કીટકનો પ્રકાર)</label>
          <select className="w-full border rounded-xl p-2" value={form.pest} onChange={e=>set('pest', e.target.value)}>
            {pests.map(p=>(<option key={p.id} value={p.name}>{p.name}</option>))}
            {pests.length===0 && <option value="aphid">aphid</option>}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Crop (પાકનું નામ)</label>
          <input className="w-full border rounded-xl p-2" value={form.crop} onChange={e=>set('crop', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Latitude (અક્ષાંશ)</label>
          <input type="number" step="0.0001" className="w-full border rounded-xl p-2" value={form.lat} onChange={e=>set('lat', parseFloat(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm mb-1">Longitude (રેખાંશ)</label>
          <input type="number" step="0.0001" className="w-full border rounded-xl p-2" value={form.lon} onChange={e=>set('lon', parseFloat(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm mb-1">Temperature(°C) (તાપમાન)</label>
          <input type="number" className="w-full border rounded-xl p-2" value={form.temperature} onChange={e=>set('temperature', parseFloat(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm mb-1">Humidity(%) (આર્દ્રતા)</label>
          <input type="number" className="w-full border rounded-xl p-2" value={form.humidity} onChange={e=>set('humidity', parseFloat(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm mb-1">Rainfall(mm) (વરસાદ)</label>
          <input type="number" className="w-full border rounded-xl p-2" value={form.rainfall} onChange={e=>set('rainfall', parseFloat(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm mb-1">Soil Moisture(%) (માટીની ભેજ)</label>
          <input type="number" className="w-full border rounded-xl p-2" value={form.soil_moisture} onChange={e=>set('soil_moisture', parseFloat(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm mb-1">Wind Speed(km/h) (પવનની ગતિ)</label>
          <input type="number" className="w-full border rounded-xl p-2" value={form.wind_speed} onChange={e=>set('wind_speed', parseFloat(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm mb-1">Infestation Observed? (જીવાત?)</label>
          <select className="w-full border rounded-xl p-2" value={form.label} onChange={e=>set('label', parseInt(e.target.value))}>
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="px-4 py-2 rounded-xl bg-brand text-white">Submit Report</button>
        <button className="px-4 py-2 rounded-xl border" onClick={predict}>Predict Risk</button>
      </div>
    </form>
  )
}
