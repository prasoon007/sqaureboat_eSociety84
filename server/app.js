const express = require('express'),
    app = express(),
    cors = require('cors'),
    connectMongoDb = require('./db'),
    Status = require('./models/Status'),
    User = require('./models/User'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    { body, validationResult } = require('express-validator'),
    mid_val = require('./middleware/validation');


connectMongoDb();
require('dotenv').config()

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cors());

const port = process.env.PORT || 5000;

app.post('/createUser', [
    body('name', 'name should of min 3 characters').not().isEmpty().isLength({ min: 3 }),
    body('email', 'enter a valid email').not().isEmpty().isEmail(),
    body('about', 'please tell something about yourself').not().isEmpty().isLength({ min: 10 }),
    body('username', 'enter a valid username').not().isEmpty().isLength({ min: 7 }),
    body('password', 'Minimum 5 characters required').not().isEmpty().isLength({ min: 5 })],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        try {
            let salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            let user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
                about: req.body.about,
                username: req.body.username
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET);
            success = true;
            res.json({ success: true, authToken });
        }
        catch (error) {
            res.status(500).send('some error occured,' + error.message);
        }
    })

app.get('/', (req, res) => {
    res.send("you have landed in e_society");
})

app.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password is empty').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email }).select('+password');
        if (!user) return res.status(400).send({ success: false, error: 'Invalid Credentials' });
        let passCheck = await bcrypt.compare(password, user.password);
        if (!passCheck) return res.status(400).json({ success: false, error: 'Invalid Credentials' });
        const data = {
            user: {
                id: user.id
            }
        }
        let authToken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ success: true, authToken });
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
})

app.get('/getUser', mid_val, async (req, res) => {
    try {
        let user_id = req.user.id;
        const user = await User.findById(user_id).select('-password');
        res.send(user);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.get('/fetchAllStatus', mid_val, async (req, res) => {
    try {
        // console.log(req.user.id);
        const foundUser = await User.findById(req.user.id).select('-name -about -email -__v -_id -joined_at');
        foundUser.following.push(foundUser.username);
        console.log(foundUser);
        const status = await Status.find({ 'author': { $in: foundUser.following } });
        if (!status) return res.status(404).send("NO STATUS FOUND");
        res.send(status);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
});

app.post('/addStatus', [
    body('title', 'title should be of min 5 char').isLength({ min: 5 }),
    body('desc', 'enter a valid email').not().isEmpty()],
    mid_val, async (req, res) => {
        try {
            const foundUser = await User.findById(req.user.id);
            const { title, desc } = req.body;
            const author = foundUser.username;
            const addedStatus = await Status.create({ title, desc, author });
            res.send(addedStatus);
        } catch (error) {
            res.status(500).json('Internal Server Error');
        }
    });

app.put('/update_status/:statusId', async (req, res) => {
    try {
        const { title, desc } = req.body;
        const updatedSchema = Status.findByIdAndUpdate(req.params.statusId, { title, desc }, { new: true });
        res.send(updatedSchema);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
});

app.delete('/deleteStatus/:statusId', async (req, res) => {
    try {
        const deletedStatus = Status.findByIdAndDelete(req.params.statusId);
        res.send(deletedStatus);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
});

app.get('/followAdder/:id', mid_val, async (req, res) => {
    const foundUser = await User.findById(req.user.id);
    foundUser.following.push(req.params.id);
    foundUser.following.__v += 1;
    foundUser.save();
})
app.get('/searchUser/:username', mid_val, async (req, res) => {
    const foundUser = await User.findOne({ username: req.params.username });
    res.status(200).send(foundUser);
});


app.listen(port, () => {
    console.log('Up and healthy ' + port);
})