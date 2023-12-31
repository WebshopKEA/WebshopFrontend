import { Box, Text, Container, Stack, Heading, IconButton, useBreakpointValue } from "@chakra-ui/react";
import Slider from "react-slick";
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import { useState } from "react";
import useProducts from "../hooks/useProducts";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utilities/formatCurrency";

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
interface Props {
  onSelectProduct: (productId: number) => void
}
const settings = {
    dots: true,
    arrows: false,
    // fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

const ProductCarousel = ({onSelectProduct}: Props) => {

    const [slider, setSlider] = useState<Slider | null>(null)
    const { data: products} = useProducts();

    const shuffledProducts = shuffleArray(products);

    const top = useBreakpointValue({ base: '90%', md: '50%' })
    const side = useBreakpointValue({ base: '30%', md: '40px' })


  return (
    <Box position={'relative'} borderRadius={'lg'} height={'600px'} width={'900px'} overflow={'hidden'}>
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        colorScheme="red"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}>
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        colorScheme="red"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}>
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {shuffledProducts.map((card, index) => (
          <Link to={`/products/${card.productId}`} onClick={()=> onSelectProduct(card.productId)}>
            <Box
              key={index}
              height={'600px'}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundColor="Background"
              backgroundImage={`url(${card.img}), url(${"https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"})`}
              >
              <Container size="container.lg" height="600px" position="relative">
                <Stack
                  spacing={6}
                  w={'full'}
                  maxW={'lg'}
                  position="absolute"
                  top="50%"
                  >
                  <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} color="green">
                    {card.name}
                  </Heading>
                  <Text fontSize={{ base: 'md', lg: 'lg' }} color="green">
                    {formatCurrency(card.price)}
                  </Text>
                </Stack>
              </Container>
            </Box>
          </Link>
        ))}
      </Slider>
    </Box>
  )
}

export default ProductCarousel