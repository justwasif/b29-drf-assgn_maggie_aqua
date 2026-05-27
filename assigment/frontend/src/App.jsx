import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import StudioList from './pages/studio/StudioList'
import CreateStudio from './pages/studio/CreateStudio'
import CreateMembership from './pages/studio/CreateMembership'
import MembershipList from './pages/studio/MembershipList'
import CreateStage from './pages/project/CreateStage'
import ProjectList from './pages/project/ProjectList'
import StageList from './pages/project/StageList'
import TaskList from './pages/project/TaskList'
import CreateTask from './pages/project/CreateTask'
import CreateAttachment from './pages/attachment/CreatAttachment'
import AttachmentList from './pages/attachment/AttachmentList'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route  element={<Layout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/studios'element={<StudioList/>}/>
          <Route path='/creteStudio'element={<CreateStudio/>}/>
          <Route path='/createmembership'element={<CreateMembership/>}/>
          <Route path='/membership'element={<MembershipList/>}/>
          <Route path='/createproject'element={<CreateMembership/>}/>
          <Route path='/createstage'element={<CreateStage/>}/>
          <Route path='/projectlist'element={<ProjectList/>}/>
          <Route path='/stagelist'element={<StageList/>}/>
          <Route path='/tasklist'element={<TaskList/>}/>
          <Route path='/createtask'element={<CreateTask/>}/>
          <Route path='/creaateattachment'element={<CreateAttachment/>}/>
          <Route path='/attachmentlist'element={<AttachmentList/>}/>
          
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}