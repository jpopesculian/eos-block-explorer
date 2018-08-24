import Main from './Main'
import NavigationBar from '../components/NavigationBar'
import StatusBar from '../components/StatusBar'

export default ({ name, children }) => (
  <Main>
    <NavigationBar name={name} />
    <StatusBar />
    {children}
  </Main>
)
