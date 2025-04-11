const jwt = require("jsonwebtoken");
const axios = require('axios');
const User = require('../models/userModel');

exports.createUser = async (req, res) => {
    const ip = req.body.ip;
    try {
        if(ip){
            const IPData = await axios.get(`http://ip-api.com/json/${ip}`);
            const { lat, lon, city , regionName, country } = IPData.data;
        
            const result = await User.create(lat, lon, req.body, city , regionName, country);
            if(result.status == 'error'){
                res.status(400).json({ message: 'Email or mobile number already exists.' });
            }else{
                res.status(201).json({ message: 'User created', user: result });
            }
        }else{
            res.status(400).json({ error: 'Ip Required for Creating any Store User' });
        }
          
    } catch (err) {
        console.error('Error creating User:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllUser = async (req, res) => {
    try {
        const results = await User.getAll();
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching User:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllUserByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await User.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching User:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
    const ip = req.body.ip;
    const id = req.params.id;
    try {
        if(ip){
            const IPData = await axios.get(`http://ip-api.com/json/${ip}`);
            const { lat, lon } = IPData.data;
        
            const results = await User.update(lat, lon, id, req.body);
            res.status(200).json(results);
        }else{
            res.status(400).json({ error: 'Ip Required for Updating any Store User' });
        }
    } catch (err) {
        console.error('Error updating User:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.delete(id,req.userDetails);
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        console.error('Error deleting User:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.loginUser = async (req, res) => {
    const ip = req.body.ip;
    try {
        if(ip){
            const IPData = await axios.get(`http://ip-api.com/json/${ip}`);
            const { lat, lon, city , regionName, country } = IPData.data;
            
            const { email, password } = req.body;
    
            const UserData = await User.findByEmail(lat, lon ,email , ip, city , regionName, country); 
            if (!UserData || !UserData.data) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            if (password !== UserData.data.password) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            
            let token;
            if(UserData.data){
                token = jwt.sign({id : UserData.data.id, type : 'User'}, process.env.JWT_KEY);
                await User.updateUserToken(UserData.data.id, token);
            }
    
            res.status(200).json({
                message: 'Login successful',
                User: UserData.data,
                token: token
            });
        }else{
            res.status(400).json({ error: 'Ip Required for Login to Store User' });
        }

    } catch (err) {
        console.error('Error logging in User:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
