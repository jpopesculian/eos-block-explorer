import Main from './Main'
import NavigationTabBar from '../components/Navigation/TabBar'

export default ({ name, children }) => (
  <Main>
    <NavigationTabBar name={name} />
    {children}
  </Main>
)
