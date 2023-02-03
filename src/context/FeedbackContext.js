import { createContext, useState } from "react";
import {v4 as uuidv4} from 'uuid'
const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })
  const [feedback,setFeedback] = useState([
    {
      id: 1,
      rating: 10,
      text: 'Whatever',
    },
    {
      id: 2,
      rating: 8,
      text: 'Loko bixo',
    },
  ])

  const updateFeedback = (id, updItem) => {
    console.log(updItem);
    setFeedback(
      feedback.map( (item)=> 
      (item.id === id ? {...item, ... updItem} : item))
    )
  }

  const deleteFeedback = (id) => {
    if ( window.confirm('Are you sure you want to delete?'))
      setFeedback(feedback.filter((item)=>item.id !== id))
  }

  const editFeedback = (item) => {
    setFeedbackEdit({item, edit: true});
  }

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    console.log(newFeedback)
    setFeedback([newFeedback, ...feedback])
  }

  return <FeedbackContext.Provider value={{
    feedback,
    deleteFeedback,
    addFeedback,
    editFeedback,
    feedbackEdit,
    updateFeedback,
    setFeedbackEdit,
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext;