import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const Banner = () => {
    const [sidenavWidth, setSidenavWidth] = useState(0);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const openNav = () => {
        setSidenavWidth(250);
    };

    const closeNav = () => {
        setSidenavWidth(0);
    };

    useEffect(() => {
        // Fetch all products initially
        fetchProducts();
    }, []);

    useEffect(() => {
        // Fetch products based on selected category
        if (selectedCategory) {
            fetchProductsByCategory(selectedCategory);
        } else {
            // If no category is selected, fetch all products
            fetchProducts();
        }
    }, [selectedCategory]);

    const fetchProducts = () => {
        axios
            .get('https://fakestoreapi.com/products')
            .then(response => {
                setProducts(response.data);
                console.log("Products", response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const fetchProductsByCategory = (category) => {

        if (category !== 'All Products') {
            axios
                .get(`https://fakestoreapi.com/products/category/${category}`)
                .then(response => {
                    setProducts(response.data);
                    console.log(`Products for category '${category}':`, response.data);
                })
                .catch(error => {
                    console.error(`Error fetching data for category '${category}':`, error);
                });
        }
        else {
            axios
                .get(`https://fakestoreapi.com/products`)
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error(`Error fetching data for category`, error);
                });
        }

    };

    useEffect(() => {
        // Fetch all categories and add "All Products" option
        axios
            .get('https://fakestoreapi.com/products/categories')
            .then(response => {
                const allProductsOption = 'All Products'; // The text for "All Products" option
                setCategories([allProductsOption, ...response.data]); // Add "All Products" to the beginning of the categories array
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const chunkArray = (arr, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const chunkedProducts = chunkArray(products, 3);

    // Function to handle the search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Function to handle the category dropdown change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // Filter the products based on the search query
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredChunkedProducts = chunkArray(filteredProducts, 3);

    const renderProducts = searchQuery ? filteredChunkedProducts : chunkedProducts;

    // Function to get the display text for "All Category" dropdown
    const getAllCategoryText = () => {
        if (selectedCategory) {
            return selectedCategory;
        }
        return "All Category";
    };

    // Function to get the display text for "Men & Woman Fashion" section
    const getFashionSectionText = () => {
        if (selectedCategory) {
            return `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Fashion`;
        }
        return "Man & Woman Fashion";
    };

    return (
        <>
            <div className="banner_bg_main">
                {/* header top section start */}
                <div className="container">
                    <div className="header_section_top">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="custom_menu">
                                    <ul>
                                        <li><a href='/'>Best Sellers</a></li>
                                        <li><a href='/'>Gift Ideas</a></li>
                                        <li><a href='/'>New Releases</a></li>
                                        <li><a href='/'>Today's Deals</a></li>
                                        <li><a href='/'>Customer Service</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* header top section start */}
                {/* logo section start */}
                <div className="logo_section">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="logo">
                                    <a href="/">
                                        <img src="images/logo.png" alt="Logo" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* logo section end */}
                {/* header section start */}
                <div className="header_section">
                    <div className="container">
                        <div className="containt_main">
                            <div id="mySidenav" className="sidenav">
                                <button className="closebtn" onClick={closeNav} style={{ width: sidenavWidth + 'px' }}>
                                    &times;
                                </button>
                                <a href="/">Home</a>
                                <a href="/">Fashion</a>
                                <a href="/">Electronic</a>
                                <a href="/">Jewellery</a>
                            </div>
                            <span className="toggle_icon" onClick={openNav}>
                                <img src="images/toggle-icon.png" alt="Toggle Menu" />
                            </span>
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    {getAllCategoryText()}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {categories.map((category, index) => (
                                        <button
                                            key={index}
                                            className="dropdown-item"
                                            onClick={() => setSelectedCategory(category)}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="main">
                                {/* Another variation with a button */}
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search this blog" value={searchQuery} onChange={handleSearchChange} />
                                    <div className="input-group-append">
                                        <button className="btn btn-secondary" type="button" style={{ backgroundColor: '#f26522', borderColor: '#f26522' }} > <i className="fa fa-search"></i> </button>
                                    </div>
                                </div>
                            </div>
                            <div className="header_box">
                                <div className="lang_box ">
                                    <a href='/' title="Language" className="nav-link" data-toggle="dropdown" aria-expanded="true">
                                        <img src="images/flag-uk.png" alt="flag" className="mr-2 " title="United Kingdom" /> English <i className="fa fa-angle-down ml-2" aria-hidden="true"></i>
                                    </a>
                                    <div className="dropdown-menu ">
                                        <a href='/' className="dropdown-item">
                                            <img src="images/flag-france.png" className="mr-2" alt="flag" />
                                            French
                                        </a>
                                    </div>
                                </div>
                                <div className="login_menu">
                                    <ul>
                                        <li><a href='/'>
                                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                            <span className="padding_10">Cart</span></a>
                                        </li>
                                        <li><a href='/'>
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                            <span className="padding_10">User</span></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* header section end */}
                {/* banner section start */}
                <div className="banner_section layout_padding">
                    <div className="container">
                        <Carousel id="my_slider" indicators={false}>
                            <Carousel.Item>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h1 className="banner_taital">Get Start <br />Your favorite shopping</h1>
                                        <div className="buynow_bt">
                                            <a href="/">Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h1 className="banner_taital">Get Start <br />Your favorite shopping</h1>
                                        <div className="buynow_bt">
                                            <a href="/">Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h1 className="banner_taital">Get Start <br />Your favorite shopping</h1>
                                        <div className="buynow_bt">
                                            <a href="/">Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
                {/* banner section end */}
            </div>
            <div className="fashion_section">
                <Carousel id="main_slider" indicators={false}>
                    {renderProducts.length === 0 ? ( // Check if filteredChunkedProducts is empty
                        <Carousel.Item>
                            <div className="container">
                                <h1 className="fashion_taital">No Products Found</h1>
                            </div>
                        </Carousel.Item>
                    ) : (
                        renderProducts.map((chunk, index) => (
                            <Carousel.Item key={index}>
                                <div className="container">
                                    <h1 className="fashion_taital">{getFashionSectionText()}</h1>
                                    <div className="fashion_section_2">
                                        <div className="row">
                                            {chunk.map((product) => (
                                                <div key={product.id} className="col-lg-4 col-sm-4">
                                                    <div className="box_main">
                                                        <h4 className="shirt_text">{product.title}</h4>
                                                        <p className="price_text">
                                                            Price <span style={{ color: '#262626' }}>${product.price}</span>
                                                        </p>
                                                        <div className="tshirt_img">
                                                            <img src={product.image} alt={product.title} />
                                                        </div>
                                                        <div className="btn_main">
                                                            <div className="buy_bt">
                                                                <a href="/">Buy Now</a>
                                                            </div>
                                                            <div className="seemore_bt">
                                                                <a href="/">See More</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Carousel.Item>
                        ))
                    )}
                </Carousel>
            </div>

        </>
    );
};

export default Banner;