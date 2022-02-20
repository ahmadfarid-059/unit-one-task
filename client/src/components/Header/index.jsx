import {
    AppBar,
    Box,
    Typography
} from '@mui/material';
import styles from './style'

const Header = () => {
    return <Box sx={styles.container}>
        <AppBar position='static' sx={styles.bar}>
        <Typography variant="h3" component="p">
            Items App
          </Typography>
        </AppBar>
    </Box>
}

export default Header