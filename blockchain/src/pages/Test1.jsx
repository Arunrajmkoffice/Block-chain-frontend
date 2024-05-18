import { Box, Typography } from "@mui/material"

function Test (){



let data = [{
    hospitalName:"Appolo",
    id:"appo3456789",
    brach:[{name:"Vijayanagar", id:"vij34567"},{name:"Sivaju Nagar", id:"siva3erttrew45678"}],
},{
    hospitalName:"Imperial",
    id:"appo3456rhgd456789",
    brach:[{name:"Vijayanagar", id:"vij34567"},{name:"Sivaju Nagar", id:"siva3daytr45678"}],
},{
    hospitalName:"Jack danial",
    id:"appo34567e2245689",
    brach:[{name:"Vijayanagar", id:"vij3aa4567"},{name:"Sivaju Nagar", id:"siva3dss45678"}],
}]


    return(<>
   {data.map((item,i)=>(
    <Box sx={{border:"5px solid"}}>
        <Typography>{item.hospitalName}</Typography>    
    {item.brach.map((item2,j)=>(
        <Typography>{item2.name}</Typography>    
    ))}
    
        
    </Box>

   ))}
    </>)
}
export default Test