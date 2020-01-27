var products = [];

for (let index = 0; index < 10; index++) {
    var product = {};
    product.ref = "P" + index.toString();
    product.name = "Product " + "N" +   index.toString();
    product.description = "description...";
    product.price = ((index * 10) - (index * 2)).toString() + "$";
    products.push(product);
}

module.exports = products; 