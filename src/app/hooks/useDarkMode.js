import { useColorMode, Button } from '@chakra-ui/react'

const useDarkMode = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Button onClick={toggleColorMode}>
      {colorMode === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  )
}

export default useDarkMode
