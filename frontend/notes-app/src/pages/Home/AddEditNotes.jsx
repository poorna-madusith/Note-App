import React, { useState, useEffect } from 'react'
import TagInput from '../../componenets/input/TagInput'
import { MdClose } from 'react-icons/md';

import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({noteData,type,getAllNotes,onClose, showToastMsg}) => {
    

    const [title,setTitle] = useState(noteData?.title|| "");
    const [content,setContent] = useState(noteData?.content|| "");
    const [tags,setTags] = useState(noteData?.tags|| []);


    const [error,setError]= useState(null);

    //add new node
    const addNewNote = async ()=> {
      try {
        const response = await axiosInstance.post("/add-note",{
          title,
          content,
          tags
        });

        if(response.data && response.data.note){
          showToastMsg("Note added successfully")
          getAllNotes();
          onClose();
        }
      } catch (error) {
        if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message);
        }
        
      }
    };

    //edit note
    const editNote = async ()=> {

      const noteId = noteData._id;
      
      try {
        const response = await axiosInstance.put("/edit-note/"+noteId,{
          title,
          content,
          tags
        });

        if(response.data && response.data.note){
          showToastMsg("Note Updated successfully")
          getAllNotes();
          onClose();
        }
      } catch (error) {
        if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message);
        }
        
      }
    };


    const handleAddNote = ()=>{

        if(!title){
            setError("please enter the title");
            return;
        }
        

        if(!content){
            setError("please enter the content")
            return;
        }

        setError("");

        if(type == 'edit'){
            editNote()
        }else{
            addNewNote()
        }
    }

  return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 z-[1000] bg-white/80 rounded-lg border border-slate-200/50 shadow-2xl p-8 transition-all duration-400 ease-in-out w-[min(600px,90vw)] max-h-[85vh] overflow-auto hover:shadow-3xl backdrop-blur-xl after:w-[5px] after:h-full after:bg-blue-500 after:absolute after:left-0 after:top-0 after:rounded-l-lg'>

        <button 
          className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 bg-white shadow-lg transition-all duration-300 ease-in-out cursor-pointer hover:bg-red-50 hover:scale-110 hover:rotate-90 group" 
          onClick={onClose}
        >
            <MdClose className="text-xl text-slate-400 group-hover:text-red-500" />
        </button>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-600">Title</label>
            <input 
              type="text" 
              className="w-full text-xl text-slate-800 bg-white/90 rounded-lg border border-slate-200 px-4 py-3 transition-all duration-300 ease-in-out focus:bg-white focus:shadow-lg focus:border-blue-400/60 outline-none hover:shadow-md" 
              placeholder="Enter note title..." 
              value={title}
              onChange={({target}) => setTitle(target.value)}
            />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-600">Content</label>
          <textarea 
            className="w-full text-base text-slate-700 bg-white/90 rounded-lg border border-slate-200 px-4 py-3 transition-all duration-300 ease-in-out focus:bg-white focus:shadow-lg focus:border-blue-400/60 outline-none resize-none hover:shadow-md"
            placeholder="Write your note content here..."
            rows={8}
            value={content}
            onChange={({target}) => setContent(target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-600">Tags</label>
          <TagInput tags={tags} setTags={setTags} />
        </div>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg mt-2">{error}</p>
        )}

        <button 
          className="w-full text-base font-medium bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg mt-4 transition-all duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-2px] hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed group" 
          onClick={handleAddNote}
        >
          <span className="group-hover:scale-105 inline-block transition-transform duration-300">
            {type === 'edit' ? 'Update Note' : 'Add Note'}
          </span>
        </button>
      </div>
    </div>
  )
}

export default AddEditNotes
