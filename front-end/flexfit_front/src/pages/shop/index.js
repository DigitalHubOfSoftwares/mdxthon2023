import { Carousel } from 'flowbite-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Shop = (props) => {
  console.log(props);

  const products = props.products;

  const [shoppingCart, setShoppingCart] = useState([]);

  const addToCart = (productId) => {
    setShoppingCart((prevCart) => {
      const updatedCart = [...prevCart, productId];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setShoppingCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify([]));
    const cartItems = localStorage.getItem('cart');
    setShoppingCart(JSON.parse(cartItems));
  }, []);

  return (
    <>
      <div className="carousel-container">
        <Carousel>
          <div className="carousel-item">
            <video autoPlay muted loop>
              <source src="/assets/videos/WeekendWorkout.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="carousel-item">
            <Image
              width={1920}
              height={100} // Adjust the height value as per your requirement
              alt="..."
              src="/assets/images/FITFLEX.jpg"
            />
          </div>
          <div className="carousel-item">
            <Image
              width={1920}
              height={90} // Adjust the height value as per your requirement
              alt="..."
              src="/assets/images/shop-now.jpg"
            />
          </div>
          <div className="carousel-item">
            <Image
              width={1920}
              height={100} // Adjust the height value as per your requirement
              alt="..."
              src="/assets/images/FITFLEX.jpg"
            />
          </div>
        </Carousel>

        <style jsx>{`
        .carousel-container {
          height: 500px; // Adjust the height value as per your requirement
        }

      `}</style>
      </div>
      <div className='w-full flex justify-center'>
        <Link href={'/'}>Back To Home</Link>
      </div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Special Fitness Sales</h2>
            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Unleash Your Fitness Potential: Exclusive Gym Membership Sale</p>
          </div>
          <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
            {products.map((product, index) => {
              if (index < (products.length / 2) - 1) {
                return (
                  <div key={product.id} className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                    <Link href="#">
                      <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src={product.imageUrl} alt={product.title} />
                    </Link>
                    <div className="p-5">
                      <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {product.title}
                      </h3>
                      <span className="text-gray-500 dark:text-gray-400">$ {product.price}</span>
                      <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">{product.description}</p>
                      <div className="flex items-center justify-between">
                        {shoppingCart && shoppingCart.includes(product.id) ? (
                          <button onClick={() => removeFromCart(product.id)} style={{ backgroundColor: "#e3003e" }} className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Remove from cart
                          </button>
                        ) : (
                          <button onClick={() => addToCart(product.id)} style={{ backgroundColor: "#e3003e" }} className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Add to cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null; // Skip rendering the product
              }
            })}

          </div>

        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="px-4 mx-auto max-w-screen-xl text-center">
          <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Transform Your Fitness Journey with Unbeatable Deals on Premium Equipment at Flexdit!</p>
          </div>
          <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product, index) => {
              if (index >= products.length - 4) {
                return (
                  <div key={index} className="text-center text-gray-500 dark:text-gray-400">

                    <img className="mx-auto mb-4 w-36 h-36 rounded-full" src={product.imageUrl} alt={product.title} />
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {product.title}
                    </h3>
                    <span className="text-gray-500 dark:text-gray-400">Rs. {product.price}</span>
                    <div className="justify-center mt-4 space-x-4">
                      {shoppingCart.includes(product.id) ? (
                        <button onClick={() => removeFromCart(product.id)} style={{ backgroundColor: "#e3003e" }} className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          Remove from cart
                        </button>
                      ) : (
                        <button onClick={() => addToCart(product.id)} style={{ backgroundColor: "#e3003e" }} className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          Add to cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              } else {
                return null; // Skip rendering the product
              }
            })}


          </div>
        </div>
      </section>
      <section class="bg-white dark:bg-gray-900">
        <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Effortless Checkout Experience</h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Streamlined Checkout Process: Securely Complete Your Purchase in Just a Few Clicks at Flexdit!</p>
            <Link href="/view-cart" style={{ backgroundColor: "#e3003e" }} class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              View your cart
              <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </Link>
            <Link href="mailto:sales@flexfit.com" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Speak to Sales
            </Link>
          </div>
          <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="/assets/images/gym.gif" alt="mockup" />
          </div>
        </div>
      </section>
    </>


  );
};

export default Shop;

export async function getServerSideProps() {
  const productsPromise = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/all`, {
    headers: {
      "Content-Type": "application/json"
    }
  })

  const products = await productsPromise.json();
  console.log(products);
  return {
    props: {
      products: products
    }
  }
}
