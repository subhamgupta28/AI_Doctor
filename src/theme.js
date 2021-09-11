import {createTheme} from "@material-ui/core";
import { amber, blue} from "@material-ui/core/colors";



const theme = createTheme({
    palette:{
        type:"dark",
        primary:{
            main: blue[500],
            contrastText: "#FFFFFF",
        },
        secondary:{

            main: amber[500],
            contrastText: "#FFFFFF",
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
        background:{
            paper: '#212121',
            default: '#fff'
        }

    }
})

export default theme