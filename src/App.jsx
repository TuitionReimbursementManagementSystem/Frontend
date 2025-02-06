import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Messages from './pages/Messages'
import Forms from './pages/Forms'
import NewForm from './components/forms/NewForm'
import AttachmentsForm from './components/forms/AttachmentsForm'
import FormsDashboard from './components/forms/FormsDashboard'
import FormsTable from './components/forms/FormsTable'
import ViewForm from './components/forms/ViewForm'
import EditForm from './pages/EditForm'
import MessagesDashboard from './components/messages/MessagesDashboard'
import ApprovalMessagesTable from './components/messages/ApprovalMessagesTable'
import ApprovalMessage from './components/messages/ApprovalMessage'

function App() {

  return (
    <main>
      <BrowserRouter basename='/'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/login' element={<Login />} />

          {/* Forms */}
          <Route path='/forms' element={<Forms />}>
            <Route path='' element={<FormsDashboard />} />
            <Route path='new' element={<NewForm />} />
            <Route path='attachments' element={<AttachmentsForm />} />
            <Route path='table' element={<FormsTable />} />
            <Route path='form' element={<ViewForm />} />
          </Route>
          <Route path='/forms/edit' element={<EditForm />} />

          {/* Messages */}
          <Route path='/messages' element={<Messages />}>
            <Route path='' element={<MessagesDashboard />} />
            <Route path='approval-requests' element={<ApprovalMessagesTable />} />
            <Route path='approval-requests/message' element={<ApprovalMessage />} />
          </Route>


          <Route path='*' element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  )
}

export default App
