import { useState, useEffect } from "react";


const Cart = (props) => {
    console.log(props);
    const [errors, setErrors] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [shoppingCart, setShoppingCart] = useState([]);
    let cartItems = [];

    const products = props.products;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            cartItems = localStorage.getItem('cart');
            if (cartItems) {
                setShoppingCart(JSON.parse(cartItems));
            }
        }
        setErrors({});
    }, []);

    const validate = () => {
        const errors = {};
        // validations
        if (!firstName) {
            errors.firstName = 'First Name is required';
        }
        if (!lastName) {
            errors.lastName = 'First Name is required';
        }
        if (!email) {
            errors.email = 'Email is required';
        }
        if (!phone) {
            errors.phone = 'Phone Number is required';
        }
        if (!zipCode) {
            errors.zipCode = 'Zip Code is required';
        }
        if (!address) {
            errors.address = 'Address is required';
        }
        if (!country) {
            errors.country = 'Country is required';
        }


        setErrors(errors);
        return errors;
    };

    const submitForm = async () => {
        console.log('test');
        const data = {
            email: email,
            cartItems: cartItems
        }
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/emailorder/`), {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(data)
        }
    };

    const validateForm = async (event) => {
        event.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            console.log("fdfd");
            submitForm();
        }
    };



    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <form>
                        <h1 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">Shipping Address</h1>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                                {errors.firstName && <label className="u-label" style={{ "color": "red" }}>{errors.firstName}</label>}
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                                {errors.lastName && <label className="u-label" style={{ "color": "red" }}>{errors.lastName}</label>}
                            </div>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                            {errors.email && <label className="u-label" style={{ "color": "red" }}>{errors.email}</label>}
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (+123 456-7890)</label>
                                {errors.phone && <label className="u-label" style={{ "color": "red" }}>{errors.phone}</label>}

                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input value={zipCode} onChange={(e) => setZipCode(e.target.value)} type="text" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Zip Code</label>
                                {errors.zipCode && <label className="u-label" style={{ "color": "red" }}>{errors.zipCode}</label>}
                            </div>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                            {errors.address && <label className="u-label" style={{ "color": "red" }}>{errors.address}</label>}
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input value={country} onChange={(e) => setCountry(e.target.value)} type="text" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country</label>
                            {errors.country && <label className="u-label" style={{ "color": "red" }}>{errors.country}</label>}
                        </div>
                        <button onClick={validateForm} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Confirm Purchase</button>
                        <br/>
                        {errors.cartItems && <label className="u-label" style={{ "color": "red" }}>{errors.cartItems}</label>}

                    </form>
                    <div className="mt-4 md:mt-0">
                        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Cart Items</h5>
                            </div>
                            <div className="flow-root">
                                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {products.map((product) => {
                                        const cartItem = shoppingCart.find((item) => item === product.id);

                                        if (!cartItem) {
                                            return null; // Skip rendering the product if it's not in the cart
                                        }

                                        return (
                                            <li key={product.id} className="py-3 sm:py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <img className="w-8 h-8 rounded-full" src={product.imageUrl} alt={product.price} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                            {product.title}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                            {product.description}
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                        Rs. {product.price}
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Cart;

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
  