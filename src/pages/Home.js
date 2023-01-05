import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/shopContext'
import { Link } from 'react-router-dom'
import { Box, Text, Image, Grid } from '@chakra-ui/react'
import Hero from '../components/Hero'
import RichText from '../components/RichText'
import ImageWithText from '../components/ImageWithText'

const Home = () => {
  const { fetchAllProducts, products } = useContext(ShopContext)

  useEffect(() => {
    fetchAllProducts()
  }, [fetchAllProducts])

  if (!products) return <div>Loading...</div>

  return (
    <Box>
      <Hero />
      <RichText heading="The relaxation you’ve been waiting for." text="Our Bath bombs guarantee a fun, relaxing, and colorful night."/>
      <Grid templateColumns={['repeat(1fr)', 'repeat(3, 1fr)']}>
        {products.map((product) => (
          <Link to={`/products/${product.handle}`} key={product.title}>
            <Box
              _hover={{ opacity: '80%' }}
              textAlign="center"
              position="relative"
            >
              <Image src={product.images[0].src}></Image>
            
                <Text
                  fontWeight="bold"
                  position="absolute"
                  bottom="15%"
                  w="100%"
                >
                  {product.title}
                </Text>
                <Text color="gray.500" position="absolute" bottom="5%" w="100%">
                  ${product.variants[0].price.amount}
                </Text>
             
            </Box>
          </Link>
        ))}
      </Grid>
      <RichText heading="Treat yourself!" />
      <ImageWithText
        button
        image="https://cdn.shopify.com/s/files/1/0699/8884/3794/files/premium-bath-bombs.jpg?v=1672947566"
        heading="Heading"
        text="I'm baby kale chips twee skateboard tattooed, DIY iPhone ugh mixtape tumeric unicorn narwhal. Iceland shoreditch authentic, sartorial vegan twee flannel banh mi bushwick retro farm-to-table single-origin coffee. "
      />
      <ImageWithText
        reverse
        button
        image="https://cdn.shopify.com/s/files/1/0472/5705/9496/files/bath-bomb-and-candle.jpg?v=1610066758"
        heading="Second Heading"
        text="I'm baby kale chips twee skateboard
      tattooed, DIY iPhone ugh mixtape tumeric unicorn narwhal. Iceland
      shoreditch authentic, sartorial vegan twee flannel banh mi bushwick retro
      farm-to-table single-origin coffee. "
      />
    </Box>
  )
}

export default Home
