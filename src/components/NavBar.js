import React, { useContext } from 'react'
import { ShopContext } from '../context/shopContext'
import { Flex, Icon, Image, Badge, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { MdMenu, MdShoppingCart } from 'react-icons/md'

const NavBar = () => {
  const { openCart, openMenu, checkout } = useContext(ShopContext)

  return (
    <Flex
      backgroundColor={'#446963'}
      alignItems={'center'}
      flexDir={'row'}
      justifyContent={'space-between'}
      p={'2rem'}
    >
      <Icon
        fill={'white'}
        as={MdMenu}
        w={30}
        h={30}
        cursor={'pointer'}
        onClick={() => openMenu()}
      ></Icon>
      <Link to="/">
        <Image
          src="https://cdn.shopify.com/s/files/1/0699/8884/3794/files/LogoNew.png?v=1672950628"
          w={200}
        />
      </Link>
      <Box>
        <Icon
          fill={'white'}
          as={MdShoppingCart}
          w={30}
          h={30}
          cursor={'pointer'}
          onClick={() => openCart()}
        ></Icon>
        <Badge borderRadius={'50%'} backgroundColor="#FF38BD">
          {checkout.lineItems?.length}
        </Badge>
      </Box>
    </Flex>
  )
}

export default NavBar
