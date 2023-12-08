import { Box, SimpleGrid } from '@chakra-ui/react';
import ProductCard from './ProductCard';
import ProductCardContainer from './ProductCardContainer';
import ProductCardSkeleton from './ProductCardSkeleton';
import useProducts from '../hooks/useProducts';

interface Props {
  onSelectProductID: (productID: number) => void;
  onSelectProductName: (name: string) => void;
}

const ProductGridAdmin = ({onSelectProductID, onSelectProductName}: Props) => {
    const { data: products , error, isLoading } = useProducts();
    const skeletons = [...Array(20).keys()];


    return (
      <>
        {error && <p>{error}</p>}
  
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
            xl: 4,
          }}
          spacing={10}
          padding={10}
        >
          {isLoading && skeletons.map((skeleton) => <ProductCardContainer key={skeleton}>
            <ProductCardSkeleton/>
        </ProductCardContainer>)}
          {products.map((product) => (
            <ProductCardContainer key={product.productID}>
              <Box _hover={{ cursor: 'pointer' }} _active={{ transform: "scale(0.97)" }} onClick={() => {onSelectProductID(product.productID), onSelectProductName(product.name)}}                    >
                <ProductCard  product={product} />
              </Box>
            </ProductCardContainer>
          ))}
        </SimpleGrid>
      </>
    )
  }

export default ProductGridAdmin