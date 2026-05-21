import './App.css'
import ChatSection from './components/chatSectioin/chatSection'
import Seperator from './components/sepetaror/seperator'
import Sidebar from './components/sidebar/sidebar'
import { ChatbotContextStore } from './store/chatBot_context_store'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <ChatbotContextStore>
      <Sidebar/>
      <Seperator/>
      <ChatSection/>
    </ChatbotContextStore>
  )
}

export default App
