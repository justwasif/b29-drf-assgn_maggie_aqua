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
import CreateNotification from './pages/notification/CreateNotification'
import NotificationList from './pages/notification/NotificationList'
import CreateProject from './pages/project/CreateProject'
import ThreadList from './pages/discussions/ThreadList'
import CreateThread from './pages/discussions/CreateThread'
import CommentList from './pages/discussions/CommentList'
import CreateComment from './pages/discussions/CreateComment'


function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access")

  return token ? children : <Navigate to="/login" />
}



export default function App() {
  return (
   <BrowserRouter>

      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          <Route path="/" element={<HomePage />} />

          {/* Studio Routes */}
          <Route path="/studios" element={<StudioList />} />
          <Route path="/createstudio" element={<CreateStudio />} />
          <Route path="/createmembership" element={<CreateMembership />} />
          <Route path="/membership" element={<MembershipList />} />

          {/* Project Routes */}
          <Route path="/projectlist" element={<ProjectList />} />
          <Route path="/createproject" element={<CreateProject />} />

          {/* Stage Routes */}
          <Route path="/stagelist" element={<StageList />} />
          <Route path="/createstage" element={<CreateStage />} />

          {/* Task Routes */}
          <Route path="/tasklist" element={<TaskList />} />
          <Route path="/createtask" element={<CreateTask />} />

          {/* Attachment Routes */}
          <Route path="/attachmentlist" element={<AttachmentList />} />
          <Route path="/createattachment" element={<CreateAttachment />} />

          {/* Notification Routes */}
          <Route path="/notificationlist" element={<NotificationList />} />
          <Route path="/createnotification" element={<CreateNotification />} />

          {/* Discussion Routes */}
          <Route path="/threadlist" element={<ThreadList />} />
          <Route path="/createthread" element={<CreateThread />} />

          {/* Comment Routes */}
          <Route path="/commentlist" element={<CommentList />} />
          <Route path="/createcomment" element={<CreateComment />} />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}