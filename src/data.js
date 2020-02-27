const products = [];

images = ['https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2020/01/06/goods-first-img/1578952425488413422.jpg',
  'https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2020/01/03/goods-first-img/1578964932853784717.jpg',
  'https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2019/12/24/goods-first-img/1577248521626231874.jpg',
  'https://d1rkccsb0jf1bk.cloudfront.net/products/100021773/main/medium/1513584.jpg',
  'https://www.theperfumeshop.com/medias/sys_master/front-zoom/front-zoom/10672516988958/Gucci-Eau-de-Parfum-Gift-Set-for-her-3614228972048-Guilty.jpg',
  '',
  '',
  '',
  '',
  '',
  '',
];

for (let index = 0; index < 10; index++) {
  const product = {};
  product.ref = 'P' + index.toString();
  product.name = 'Product ' + 'N' + index.toString();
  product.description = 'description...';
  product.price = ((index * 10) - (index * 2)).toString() + '$';
  products.push(product);
}

module.exports = products;
