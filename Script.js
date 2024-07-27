// scripts.js
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('Registration successful!');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
// profileScripts.js
document.querySelector('input[name="gender"]').addEventListener('change', function() {
    if (this.value === 'female') {
        document.getElementById('femaleOptions').style.display = 'block';
    } else {
        document.getElementById('femaleOptions').style.display = 'none';
    }
});

document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('/api/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('Profile updated successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
// preferencesScripts.js
document.getElementById('educationButton').addEventListener('click', function() {
    document.getElementById('educationSection').style.display = 'block';
    document.getElementById('fashionSection').style.display = 'none';
    document.getElementById('beautySection').style.display = 'none';
    document.getElementById('entertainmentSection').style.display = 'none';
});

document.getElementById('fashionButton').addEventListener('click', function() {
    document.getElementById('educationSection').style.display = 'none';
    document.getElementById('fashionSection').style.display = 'block';
    document.getElementById('beautySection').style.display = 'none';
    document.getElementById('entertainmentSection').style.display = 'none';
});

// Similar code for other buttons
// cartScripts.js
document.getElementById('checkoutButton').addEventListener('click', function() {
    window.location.href = '/checkout';
});
// checkoutScripts.js
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('/api/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('Order confirmed!');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
// orderManagementScripts.js
// Implement order history and tracking functionality
// searchFilterScripts.js
// Implement search and filter functionality
// reviewScripts.js
document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('/api/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('Review submitted!');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
// wishlistScripts.js
// Implement wishlist functionality
// adminPanelScripts.js
// Implement admin panel functionality
// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/ecommerce-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define routes
app.use('/api', require('./routes/api'));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// routes/api.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// User registration
router.post('/register', async (req, res) => {
    // Registration logic here
});

// User profile
router.post('/profile', async (req, res) => {
    // Profile update logic here
});

// Checkout
router.post('/checkout', async (req, res) => {
    // Checkout logic here
});

// Additional routes as needed

module.exports = router;
// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Add other fields as necessary
});

module.exports = mongoose.model('User', UserSchema);

// models/Product.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    brand: String,
    // Add other fields as necessary
});

module.exports = mongoose.model('Product', ProductSchema);

// models/Order.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    total: Number,
    status: String,
    // Add other fields as necessary
});

module.exports = mongoose.model('Order', OrderSchema);
// routes/api.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email,
        password: hashedPassword
    });

    await newUser.save();
    res.json({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
});
// server.js
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
