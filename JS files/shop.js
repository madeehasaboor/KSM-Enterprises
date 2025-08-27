<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shop</title>

  <!-- Link external CSS -->
  <link rel="stylesheet" href="shop.css">

  <!-- Font Awesome (for cart icon) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
  <!-- Search / Filter -->
  <section class="search-filter-section">
    <div class="search-container">
      <input type="text" id="searchInput" class="search-input" placeholder="Search products..." oninput="searchProducts()">
      <select id="categoryFilter" onchange="filterProducts()">
        <option value="">All Categories</option>
        <option value="formula1">Formula 1</option>
        <option value="aim">AIM</option>
        <option value="wd40">WD-40</option>
        <option value="dtr">DTR</option>
        <option value="areon">Areon</option>
        <option value="bundles">Bundles</option>
      </select>
      <button class="filter-btn" onclick="filterProducts()">Filter</button>
    </div>
  </section>

  <!-- Products Section -->
  <div id="shopProducts"></div>

  <!-- Cart Count -->
  <div id="cartIcon">
    <i class="fas fa-shopping-cart"></i>
    <span id="cartCount">0</span>
  </div>

  <!-- Link JS -->
  <script src="shop.js"></script>
</body>
</html>
