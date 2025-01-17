'use client'

import { AppBar, Button, Container, Toolbar } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './_components'

const buttonConfigs = {
  '/posts': {
    text: 'ADD POST',
    href: '/posts/create',
  },
}

const Header = () => {
  const pathname = usePathname()

  const buttonConfig = buttonConfigs[pathname] || null

  return (
    <AppBar
      position="static"
      sx={{
        width: '100%',
        backgroundColor: 'transparent',
        paddingY: 2,
        marginBottom: 2,
      }}
      elevation={1}
    >
      <Container>
        <Toolbar sx={{ padding: 0, justifyContent: 'space-between' }}>
          <Logo />
          {buttonConfig && (
            <Link href={buttonConfig.href} passHref>
              <Button variant="contained">{buttonConfig.text}</Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
