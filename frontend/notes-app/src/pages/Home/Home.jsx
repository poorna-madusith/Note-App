import React, { useEffect } from 'react'
import Navbar from '../../componenets/Navbar/Navbar'
import NoteCard from '../../componenets/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import moment from 'moment'
import Toast from '../../componenets/ToastMessage/Toast'
import EmptyCard from '../../componenets/EmptyCard/EmptyCard'
import AddNotesImg from '../../assets/images/AddNotesImg.png'
import NoData from '../../assets/images/NoData.png'








const Home = () => {

  const [openAddEditModel, setOpenAddEditModal] = useState({
    isShown: false,
    type:"add",
    data:null,
  });

  const [showToastMessage, setShowToastMessage] = useState({
    isShown: false,
    message: "",
    type: "add",
  })

  const [allNotes, setAllNotes] = useState([])
  const [userInfo,setUserInfo] = useState(null)

  const [isSearch, setIsSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const navigate = useNavigate();


  const handleEdit = async (noteDetails)=>{
    setOpenAddEditModal({
      isShown: true,
      data: noteDetails,
      type: "edit",
    })
  }

  const showToastMsg=(message, type = "add")=>{
    setShowToastMessage({
      isShown: true,
      message,
      type,
    })
  }
  const handleCloseToast =()=>{
    setShowToastMessage({
      isShown: false,
      message: "",
      type: "add",
    })
  }

  //get user info
  const getUserInfo = async ()=>{
    try {
      const response  = await axiosInstance.get("/get-user");
      if (response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if(error.response.status === 401){
        localStorage.clear();
        navigate("/login");
      }
      
    }
  };


  //get all notes
  const getAllNotes = async ()=>{
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if(response.data && response.data.notes){
        setAllNotes(response.data.notes);
      }

    } catch (error) {
      console.log("An unexpected error occures.please try again later")
    }

  }


  //Delete note
  const deleteNote = async (data)=>{

    const noteId = data._id;

    try {
      const response = await axiosInstance.delete("/delete-note/"+noteId);

      if(response.data && !response.data.error){
        showToastMsg("Note Deleted successfully", 'delete')
        getAllNotes();
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        console.log("An unexpected error occures.please try again later")
      }
      
    }

  }

  //Search for a note
  const onSearchNote = async (query) => {
    try {
      setSearchQuery(query);
      const response = await axiosInstance.get("/search-notes", {
        params: { query }
      });

      if(response.data && response.data.notes){
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }  
    } catch (error) {
      console.log(error)
    }
  }

  const clearSearch = () => {
    setIsSearch(false);
    setSearchQuery("");
    getAllNotes();
  }

  useEffect(()=>{
    getAllNotes();
    getUserInfo();
    return ()=>{};
  },[])

  return (
    <>
      <Navbar 
        userInfo={userInfo} 
        onSearchNote={onSearchNote}
        onClearSearch={clearSearch} 
      /> 
      
      <div className = "container mx-auto">

        {allNotes.length > 0? <div className="grid grid-cols-3 gap-4 mt-8">
          {allNotes.map((item, index)=>(
            <NoteCard 
            key={item._id}
            title = {item.title}
            date={item.createdOn} 
            content= {item.content}
            tags={item.tags}
            isPinned={item.isPinned}
            onEdit={()=>{handleEdit(item)}}
            onDelete={()=>{deleteNote(item)}}
            onPinNote={()=>{}} 
            />
          ))}
          
          
        </div> : <EmptyCard
         imgSrc={isSearch? NoData: AddNotesImg} 
         message={isSearch?`OOps! No notes found for "${searchQuery}" `: `Start creating your first note!Click 'Add' button to get started`}  />}
      </div>

      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" 
      onClick={() => {
        setOpenAddEditModal({ isShown: true, type: "add", data:null})
      }}>
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal 
        isOpen = {openAddEditModel.isShown}
        onRequestClose = {()=>{}}
        style = {{
          overlay:{
            backgroundColor: "rgba(0,0,0,0.2"
          },
        }}

        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll">




        <AddEditNotes 
        type = {openAddEditModel.type}
        noteData = {openAddEditModel.data}
        onClose = {()=>{
          setOpenAddEditModal({isShown: false,type:"add", data: null});
        }}

        getAllNotes= {getAllNotes}
        showToastMsg={showToastMsg}
        />
      </Modal>

      <Toast 
        isShown={showToastMessage.isShown}
        message={showToastMessage.message}
        type={showToastMessage.type}
        onClose={handleCloseToast}
      />

    </>
  )
}

export default Home
