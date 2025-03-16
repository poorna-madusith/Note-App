import React from 'react'

function AddEditNotes() {
  return (
    <div>
      <div classname="flex flex-col gap-2">
            <label classname="input-label">Title</label>
            <input type="text" className="text-2xl text-slate-950 outline-none" placeholder="Go to the GYM at 5" />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea type="text" className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
        placeholder = "Content"
        rows={10}
         />

      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
      </div>

      <button className="btn-primary font-medium mt-5 p-3" onClick={()=>{}}>
        ADD
      </button>
    </div>
  )
}

export default AddEditNotes
