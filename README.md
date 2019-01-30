### similar-products-carousel
Module for displaying similar products in nike air jordan clone
This fork revamps the backend database for the original module

# USAGE
click left and right arrows to adjust position of carousel.

click on a product card to navigate to that item's full product page.

## API Routes
- Create  Post('/:product_sku/similar') Creates a new related image for a shoe.
- Read    Get('/:product_sku/similar') Gets all related shoe images for shoe
- Update  Put('/:product_sku/similar') Updates a related image for a shoe.  
- Delete  Delete('/:product_sku/similar') Deletes a related image for a shoe.

# REQUIREMENTS
0] use node -v: 10.14.0

1] install dependencies: 

    bash$ `npm install`
    
2] bundle client: 

    bash$ `npm run build`
    
3] (seed test database)

3.1]   From root folder, run csv file generation script:

        bash$ `node database_postgres/generateCSV.js`

3.2]   From root folder, run schema file: 

        bash$ `psql -U postgres < schema.sql`
        
4] serve application 

    $bash `npm run start`
    
5] check localhost 

    url <`http://127.0.0.1:8081/`>
    
