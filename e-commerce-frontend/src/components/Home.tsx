import Container from "../containers/Container"
import Categories from "./Categories"
import Preferences from "./Preferences"

function Home() {
  return (
    <Container>
    <div className='p-10 flex-col flex w-full gap-10 '>
      <Categories/>
      <Preferences/>
    </div>
    </Container>
  )
}

export default Home
