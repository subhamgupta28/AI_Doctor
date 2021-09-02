import {createTheme} from "@material-ui/core";
import { amber, blue} from "@material-ui/core/colors";

const theme = createTheme({
    palette:{
        primary:{
            main: blue[500]
        },
        secondary:{
            main:amber[500],
            contrastText: blue[900]
        }

    }
})

export default theme