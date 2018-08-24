import Main from './Main'
import NavigationTabBar from '../components/Navigation/TabBar'
import StatusInfoBar from '../components/Status/InfoBar'

export default ({ name, children }) => (
  <Main>
    <NavigationTabBar name={name} />
    <StatusInfoBar />
    {children}
  </Main>
)
