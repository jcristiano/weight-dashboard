import { createTheme } from '@mui/material/styles'

export function getTheme(mode: 'light' | 'dark') {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#005fc5'
      },
      secondary: {
        main: '#00a38c'
      },
      background: mode === 'light'
        ? { default: '#f7f9fc', paper: '#ffffff' }
        : { default: '#121212', paper: '#1e1e1e' }
    },
    shape: {
      borderRadius: 16
    },
    typography: {
      fontFamily: [
        'Inter',
        'system-ui',
        '-apple-system',
        'Segoe UI',
        'Roboto',
        'Ubuntu',
        'Cantarell',
        'Noto Sans',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
      ].join(','),
      h4: { fontWeight: 700 },
      h6: { fontWeight: 700 },
    },
    components: {
      MuiPaper: { styleOverrides: { root: { boxShadow: '0 8px 30px rgba(0,0,0,0.06)' } } },
      MuiButton: { styleOverrides: { root: { borderRadius: 14, textTransform: 'none', fontWeight: 600 } } }
    }
  })
}
