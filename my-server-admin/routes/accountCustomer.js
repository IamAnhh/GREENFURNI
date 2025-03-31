const express = require('express');
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const AccountCustomer = require('../models/accountCustomer');

router.get('/', cors(), async(req, res) => {
    try {
        const accountCustomer = await AccountCustomer.find();
        res.status(200).json(accountCustomer);
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
});

// get account customer by id
router.get('/:id', cors(), async(req, res) => {
    try {
        const id = req.params.id;
        const accountCustomer = await AccountCustomer.findOne({ _id: id });
        res.status(200).json(accountCustomer)
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
});


// create 
router.post('/', cors(), async(req, res) => {
    try {
        const accountCustomer = new AccountCustomer({
            nickname: req.body.nickname,
            Name: req.body.Name,
            phonenumber: req.body.phonenumber,
            Mail: req.body.Mail,
            password: req.body.password,
            role: req.body.role,
            userid: req.body.userid,
            gender: req.body.gender,
            dob: req.body.dob,
            avatar: req.body.avatar,
            addresses: req.body.addresses, // Assuming `addresses` is passed as an array
        });
        const savedAccount = await accountCustomer.save();
        res.send(savedAccount);
    } catch (error) {
        res.status(500).send('The account was not created');
    }
});

// deltete the account

router.delete('/:id', cors(), async(req, res) => {
    try {
        const id = req.params.id;
        let deletedAccount = await AccountCustomer.deleteOne({ _id: id });
        res.status(200).json(deletedAccount);
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
});

// update the account password

router.put('/change-password/:id', cors(), async(req, res) => {
    try {
        const { id } = req.params; // ID người dùng
        const { currentPassword, newPassword } = req.body;

        // Lấy thông tin tài khoản
        const account = await AccountCustomer.findById(id);

        if (!account) {
            return res.status(404).json({ message: 'Tài khoản không tồn tại' });
        }

        if (account.role !== 'admin') {
            return res.status(403).json({ message: 'Bạn không có quyền thực hiện thao tác này' });
        }

        // Kiểm tra mật khẩu hiện tại
        if (account.password !== currentPassword) {
            return res.status(400).json({ message: 'Mật khẩu hiện tại không chính xác' });
        }

        // Cập nhật mật khẩu mới
        account.password = newPassword;
        await account.save();

        res.status(200).json({ message: 'Đổi mật khẩu thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra', error });
    }
});

// Route đăng nhập
// router.post('/login', cors(), async(req, res) => {
//     const { Mail, password } = req.body;

//     try {
//         // Tìm tài khoản khách hàng theo email
//         const accountCustomer = await AccountCustomer.findOne({ Mail });
//         if (!accountCustomer) {
//             return res.status(404).json({ message: 'Email không tồn tại!' });
//         }

//         // Kiểm tra mật khẩu
//         const isPasswordValid = await bcrypt.compare(password, accountCustomer.password);
//         console.log(password)
//         console.log(accountCustomer.password)
//         console.log(isPasswordValid)
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Mật khẩu không đúng!' });
//         }

//         // Kiểm tra vai trò (role)
//         if (accountCustomer.role !== 'user') {
//             return res.status(403).json({ message: 'Bạn không có quyền truy cập!' });
//         }

//         // Trả về thông tin tài khoản sau khi đăng nhập thành công
//         res.status(200).json({
//             message: 'Đăng nhập thành công!',
//             user: {
//                 id: accountCustomer._id,
//                 name: accountCustomer.Name,
//                 role: accountCustomer.role,
//             },
//         });
//     } catch (error) {
//         const accountCustomer = await AccountCustomer.findOne({ Mail });
//         console.log('Stored password (hashed):', accountCustomer.password);
//         console.log('User role:', accountCustomer.role);
//         console.log('Request body:', req.body);



//         console.log(Mail);
//         console.log(password);
//         console.log(error);
//         res.status(500).json({ message: error });
//     }
// });











router.post('/login', cors(), async(req, res) => {
    try {
        const { Mail, password } = req.body;

        // Tìm kiếm tài khoản với email tương ứng
        const user = await AccountCustomer.findOne({ Mail });

        if (!user) {
            return res.status(401).json({ message: 'Email không tồn tại' });
        }

        if (user.role == 'user') {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập!' });
        }
        // Kiểm tra mật khẩu
        const isPasswordMatch = password === user.password;
        if (isPasswordMatch) {

            res.status(200).json({
                message: 'Đăng nhập thành công!',
                user: {
                    id: user._id,
                    name: user.Name,
                    role: user.role,
                },
            });
        } else {
            // Mật khẩu không đúng
            res.status(401).json({ message: 'Mật khẩu không đúng' });
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router