# Artisan Home - Product Demo Website

A modern, responsive static website showcasing handcrafted home goods. Built with pure HTML, CSS, and JavaScript for easy deployment to GitHub Pages.

## Features

- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Modern UI** - Warm color palette with clean typography
- **Product Catalog** - Filterable product grid with sorting options
- **Product Detail Pages** - Image gallery, specifications, and related products
- **About Page** - Company story, team, and values
- **Contact Page** - Form with validation and FAQ section
- **Smooth Animations** - Scroll-triggered animations and hover effects

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, featured products, categories |
| Products | `products.html` | Full product listing with filters |
| Product Detail | `product-detail.html` | Single product view |
| About | `about.html` | Company story and team |
| Contact | `contact.html` | Contact form and FAQ |

## Project Structure

```
demo-site/
├── index.html
├── products.html
├── product-detail.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   └── products/
└── README.md
```

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid
- **JavaScript** - Vanilla ES6+
- **Fonts** - Google Fonts (Inter, Playfair Display)
- **Images** - Unsplash (placeholder images)

## Getting Started

### Local Development

1. Clone or download this project
2. Open `index.html` in your browser
3. No build step required!

For live reload during development, use a simple server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

### Deploy to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to Settings > Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/ (root)` folder
5. Your site will be live at `https://username.github.io/repo-name`

## Customization

### Colors

Edit CSS variables in `css/style.css`:

```css
:root {
  --color-primary: #D97756;      /* Main accent color */
  --color-secondary: #2C3E50;    /* Dark text/headings */
  --color-accent: #E8B86D;       /* Highlight color */
  --color-cream: #FDF8F3;        /* Background tint */
  --color-warm-white: #FFFAF5;   /* Main background */
}
```

### Fonts

Replace Google Fonts link in HTML `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR+FONTS&display=swap" rel="stylesheet">
```

Update CSS variables:

```css
:root {
  --font-heading: 'Your Heading Font', serif;
  --font-body: 'Your Body Font', sans-serif;
}
```

### Products

Edit product cards in `products.html`. Each card follows this structure:

```html
<a href="product-detail.html" class="product-card" 
   data-category="furniture" 
   data-price="899" 
   data-name="Product Name">
  <div class="product-card-image">
    <img src="image-url" alt="Product Name">
  </div>
  <div class="product-card-content">
    <span class="product-category">Category</span>
    <h3>Product Name</h3>
    <p>Short description</p>
    <span class="product-price">$899</span>
  </div>
</a>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes. Images from Unsplash are subject to their license terms.

---

Built with care for modern homes.
