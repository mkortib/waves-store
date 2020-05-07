import React from 'react';

const UserProductBlock = ({ products, removeItem }) => {
    const renderCartImage = (images) => {
        if (images.length) {
            return images[0].url;
        }

        return '/images/image_not_available';
    };

    const renderItems = () =>
        products.cartDetail
            ? products.cartDetail.map((product) => (
                  <div className="user-product-block" key={product._id}>
                      <div className="item">
                          <div
                              className="image"
                              style={{
                                  backgroundImage: `url(${renderCartImage(
                                      product.images
                                  )})`,
                              }}
                          ></div>
                      </div>
                      <div className="item">
                          <h4 className="item__title">Product name</h4>
                          <div className="item__txt">
                              {product.brand.name} {product.name}
                          </div>
                      </div>
                      <div className="item">
                          <h4 className="item__title">Quantity</h4>
                          <div className="item__txt">{product.quantity}</div>
                      </div>
                      <div className="item">
                          <h4 className="item__title">Price</h4>
                          <div className="item__txt">$ {product.price}</div>
                      </div>
                      <div className="item btn">
                          <div
                              className="cart-remove-btn"
                              onClick={() => removeItem(product._id)}
                          >
                              Remove
                          </div>
                      </div>
                  </div>
              ))
            : null;

    return <div>{renderItems()}</div>;
};

export default UserProductBlock;
