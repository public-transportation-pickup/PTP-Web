import Accordion from "./Accordion";
import SearchBar from "./SearchBar";


export default function FAQ() {
  return (
    <div>
        <Accordion title="Create route1" component={<SearchBar/>}/>
        <Accordion title="Create route2" component={<SearchBar/>}/>
        <Accordion title="Create route3" component={<SearchBar/>}/>
    </div>
  )
}
