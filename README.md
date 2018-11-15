### similar-products-carousel
module for displaying similar products in nike air jordan clone

# USAGE
click left and right arrows to adjust position of carousel.

click on a product card to navigate to that item's full product page.

## API Routes

Create  Post('/:product_sku/similar') Creates a new related image for a shoe.
Read    Get('/:product_sku/similar') Gets all related shoe images for shoe
Update  Put('/:product_sku/similar') Updates a related image for a shoe.  
Delete  Delete('/:product_sku/similar') Deletes a related image for a shoe.

# REQUIREMENTS
0] use node -v: 10.12.0

1] install dependencies: 

    bash$ `npm install`
    
2] bundle client: 

    bash$ `npm run build`
    
3] (seed test database)

3.0]   login to mysql using your root account: 

        bash$ `mysql -u root (-p your_password)`
    
3.1]   create new db user with password: 

        mysql> `CREATE USER warpv@localhost IDENTIFIED BY 'justdoit';`
    
3.2]   set access to airjordans database: 

        mysql> `GRANT ALL PRIVILEGES ON airjordans.* TO warpv@localhost IDENTIFIED BY 'justdoit';`
    
3.3]   flush priveleges: 

        mysql> `FLUSH PRIVILEGES;`
    
3.4]  create first instance of database

       mysql> `CREATE DATABASE IF NOT EXISTS airjordans`

3.5]  exit shell:

        mysql> `quit;`

3.6]  run seeding script:

        bash$ `npm run seed`

4] serve application 

    $bash `npm run start`
    
5] check localhost 

    url <`http://127.0.0.1:3001/`>
    
