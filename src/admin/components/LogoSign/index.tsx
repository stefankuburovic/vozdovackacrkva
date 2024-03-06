import {
    Box,
    styled
} from '@mui/material';
import {Link} from 'react-router-dom';

const LogoWrapper = styled(Link)(
    ({theme}) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 53px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);


function Logo() {
    return (
        <LogoWrapper to="/vzdadmin/bogosluzenja">
            <Box
                component="img"
                src="/assets/images/logo.svg"
                height={53}
                width={100}
                alt="Bogosluzenja"
                sx={{
                    display: 'flex',
                    filter: 'brightness(0) invert(1)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                }}
            >
            </Box>
            <p style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'white',
                marginLeft: '10px'
            }}>Администрација</p>
        </LogoWrapper>
    );
}

export default Logo;
