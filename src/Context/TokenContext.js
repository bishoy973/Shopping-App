import { Fragment, createContext, useState } from "react";




 export let tokenContext =  createContext()

 export default function TokenContextProvider(props){
let [token,setToken] = useState(null)


return <Fragment>
<tokenContext.Provider value={{token,setToken}}>
{props.children}
</tokenContext.Provider>
</Fragment>

 }